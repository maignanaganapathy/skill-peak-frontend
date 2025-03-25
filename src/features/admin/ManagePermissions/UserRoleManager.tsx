import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    TextField,
    Select,
    MenuItem,
    Checkbox,
    IconButton,
    SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface Role {
    id: number;
    roleName: string;
}

interface RowData {
    mail: string;
    mobile: string;
    role: number | "";
    isSelected: boolean;
    isNew?: boolean;
}

const UserRoleManager: React.FC = () => {
    const [rows, setRows] = useState<RowData[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [bulkRole, setBulkRole] = useState<number | ''>('');
    const [selectAll, setSelectAll] = useState(false);
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            const token = Cookies.get('authToken');
            if (!token) {
                console.warn("Authentication token not found when fetching roles.");
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/projects/3/roles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const uniqueRoles = Array.from(
                    new Map<number, Role>(
                        response.data.map((r: { id: number; roleName: string }) => [
                            r.id,
                            { id: r.id, roleName: r.roleName },
                        ])
                    ).values()
                );

                setRoles(uniqueRoles);
            } catch (err: any) {
                console.error("Failed to fetch roles:", err);
                if (err.response && err.response.status === 401) {
                    console.error("Unauthorized access. Redirecting to login.");
                    navigate('/login');
                }
            }
        };

        fetchRoles();
    }, [navigate]);

    useEffect(() => {
        setSelectAll(rows.length > 0 && selectedRows.length === rows.length);
    }, [selectedRows, rows]);

    const handleAddUser = () => {
        setRows([...rows, { mail: "", mobile: "", role: "", isSelected: false, isNew: true }]);
    };

    const handleChange = (
        index: number,
        field: keyof Omit<RowData, 'isSelected' | 'isNew'>,
        value: string | number
    ) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        setRows(newRows);
    };

    const handleSelectRow = (index: number) => {
        const newRows = [...rows];
        newRows[index].isSelected = !newRows[index].isSelected;
        setRows(newRows);

        const isCurrentlySelected = selectedRows.includes(index);
        if (isCurrentlySelected) {
            setSelectedRows(selectedRows.filter(i => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            setSelectedRows(rows.map((_, index) => index));
        } else {
            setSelectedRows([]);
        }
    };

    const handleBulkRoleChange = (event: SelectChangeEvent<number>) => {
        setBulkRole(event.target.value as number);
    };

    const applyBulkRole = () => {
        const newRows = rows.map((row, index) =>
            selectedRows.includes(index) ? { ...row, role: bulkRole } : row
        );
        setRows(newRows);
        setBulkRole('');
        setSelectedRows([]);
    };

    const saveUser = async (index: number) => {
        const token = Cookies.get('authToken');
        if (!token) {
            console.error("Authentication token not found when saving user.");
            navigate('/login');
            return;
        }

        const row = rows[index];
        if (!row.mail || !row.mobile || !row.role) {
            alert("Please fill in all fields for the user.");
            return;
        }

        setIsSaving(true);
        try {
            const res = await axios.post(
                "http://localhost:5000/projects/3/users",
                {
                    mail: row.mail,
                    mobile: row.mobile,
                    roleId: row.role,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("User added:", res.data);
            const newRows = [...rows];
            delete newRows[index].isNew; // Remove isNew flag after successful save
            setRows(newRows);
            alert("User saved successfully!");
        } catch (err: any) {
            console.error("Error while saving user:", err);
            if (err.response && err.response.status === 401) {
                console.error("Unauthorized access. Redirecting to login.");
                navigate('/login');
            } else {
                alert("Something went wrong while saving user.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    const deleteUserRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    const handleSaveAllUsers = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            console.error("Authentication token not found when submitting users.");
            navigate('/login');
            return;
        }

        setIsSaving(true);
        try {
            for (const row of rows) {
                if (!row.mail || !row.mobile || !row.role) {
                    console.warn("Missing field in row:", row);
                    continue;
                }

                await axios.post(
                    "http://localhost:5000/projects/3/users",
                    {
                        mail: row.mail,
                        mobile: row.mobile,
                        roleId: row.role,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("User added:", row.mail);
            }
            alert("All users saved successfully!");
            setRows(prevRows => prevRows.map(row => ({ ...row, isNew: false }))); // Clear isNew flags
        } catch (err: any) {
            console.error("Error while submitting users:", err);
            if (err.response && err.response.status === 401) {
                console.error("Unauthorized access. Redirecting to login.");
                navigate('/login');
            } else {
                alert("Something went wrong during submission.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box component="section">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="700" color="text.primary">
                    User Role Manager
                </Typography>
                <Box display="flex" gap={2}>
                    {rows.length > 0 && (
                        <Button
                            variant="contained"
                            onClick={handleSaveAllUsers}
                            startIcon={<SaveIcon />}
                            disabled={isSaving}
                            sx={{
                                px: 2,
                                py: 1.2,
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                backgroundColor: isSaving ? "#ccc" : "#0A7E07",
                                borderRadius: 1,
                                textTransform: "none",
                                minWidth: "140px",
                            }}
                        >
                            {isSaving ? "Saving..." : "Save All"}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleAddUser}
                        sx={{
                            px: 2,
                            py: 1.2,
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            backgroundColor: "#1E3A8A",
                            borderRadius: 1,
                            textTransform: "none",
                            minWidth: "140px",
                        }}
                    >
                        + ADD USERS
                    </Button>
                </Box>
            </Box>

            {selectedRows.length > 0 && (
                <Box mb={2} display="flex" alignItems="center" gap={2}>
                    <Typography fontWeight="bold">Bulk Actions:</Typography>
                    <Select
                        value={bulkRole}
                        onChange={handleBulkRoleChange}
                        displayEmpty
                        sx={{ minWidth: 120, fontSize: '0.875rem' }}
                    >
                        <MenuItem value="" disabled>
                            Select Role
                        </MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.roleName}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="contained"
                        onClick={applyBulkRole}
                        disabled={!bulkRole}
                        sx={{
                            backgroundColor: "#FFA500",
                            textTransform: "none",
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Apply Role
                    </Button>
                </Box>
            )}

            <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Grid container>
                    <Grid item xs={1} sx={cellStyle(true)}>
                        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={3.5} sx={cellStyle(true)}>
                        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
                            Mail Id
                        </Typography>
                    </Grid>
                    <Grid item xs={2.5} sx={cellStyle(true)}>
                        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
                            Mobile
                        </Typography>
                    </Grid>
                    <Grid item xs={3.5} sx={cellStyle(true)}>
                        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
                            Roles
                        </Typography>
                    </Grid>
                    <Grid item xs={1.5} sx={cellStyle(true)}>
                        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
                            Actions
                        </Typography>
                    </Grid>
                </Grid>

                {rows.map((row, index) => (
                    <Grid container key={index}>
                        <Grid item xs={1} sx={cellStyle()}>
                            <Checkbox
                                checked={row.isSelected}
                                onChange={() => handleSelectRow(index)}
                            />
                        </Grid>
                        <Grid item xs={3.5} sx={cellStyle()}>
                            <TextField
                                fullWidth
                                variant="standard"
                                value={row.mail}
                                onChange={(e) => handleChange(index, "mail", e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: "0.75rem", fontWeight: "bold" },
                                }}
                                inputProps={{
                                    style: {
                                        textAlign: "center",
                                        fontSize: "0.75rem",
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={2.5} sx={cellStyle()}>
                            <TextField
                                fullWidth
                                variant="standard"
                                value={row.mobile}
                                onChange={(e) => handleChange(index, "mobile", e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: "0.75rem", fontWeight: "bold" },
                                }}
                                inputProps={{
                                    style: {
                                        textAlign: "center",
                                        fontSize: "0.75rem",
                                        fontWeight: "bold",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={3.5} sx={cellStyle()}>
                            <Select
                                fullWidth
                                variant="standard"
                                value={row.role}
                                onChange={(e) => handleChange(index, "role", Number(e.target.value))}
                                displayEmpty
                                disableUnderline
                                sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                                inputProps={{
                                    style: {
                                        textAlign: "center",
                                        fontSize: "0.75rem",
                                        fontWeight: "bold",
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Select Role
                                </MenuItem>
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.roleName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={1.5} sx={cellStyle()}>
                            <Box display="flex" justifyContent="center" gap={1}>
                                <IconButton
                                    onClick={() => saveUser(index)}
                                    color="primary"
                                    size="small"
                                    disabled={isSaving}
                                >
                                    <SaveIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => deleteUserRow(index)}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        </Box>
    );
};

const cellStyle = (isHeader = false) => ({
    px: 2,
    py: 2,
    border: "1px solid #cbd5e1",
    backgroundColor: isHeader ? "#A5C8E5" : "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

export default UserRoleManager;