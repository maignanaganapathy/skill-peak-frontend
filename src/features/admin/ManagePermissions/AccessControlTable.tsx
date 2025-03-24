"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Switch,
    TextField,
} from "@mui/material";
import axios from "axios";

const permissions = [
    { id: 1, name: "Read" },
    { id: 2, name: "Create" },
    { id: 3, name: "Update" },
    { id: 4, name: "Delete" },
];

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQyODA2NTIzLCJleHAiOjE3NDI4OTI5MjN9.2Ykw6owUT3l3t_vOgMqtmSFh2yjub6I1kAjF5KYB2MM";

interface PermissionState {
    [permId: number]: { checked: boolean; rpId?: number };
}

interface Role {
    projectRoleId: number;
    name: string;
    isNew?: boolean;
    permissions: PermissionState;
}

interface PermissionResponse {
    permissionId: number;
    id: number;
    roleName: string;
}

const AccessControlTable: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPermissions = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get("http://localhost:5000/auth/permissions", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const formatted: Record<string, PermissionResponse[]> =
                    res.data.projectPermissionsFormatted || {};

                const roleList: Role[] = [];

                for (const [roleIdStr, perms] of Object.entries(formatted)) {
                    const roleId = parseInt(roleIdStr, 10);
                    const roleName = perms[0]?.roleName || "Unnamed Role";
                    const permissionsMap: PermissionState = {};

                    perms.forEach((perm) => {
                        permissionsMap[perm.permissionId] = {
                            checked: true,
                            rpId: perm.id,
                        };
                    });

                    permissions.forEach((perm) => {
                        if (!permissionsMap[perm.id]) {
                            permissionsMap[perm.id] = { checked: false };
                        }
                    });

                    roleList.push({
                        projectRoleId: roleId,
                        name: roleName,
                        permissions: permissionsMap,
                    });
                }

                setRoles(roleList);
            } catch (err: any) {
                console.error("Error fetching permissions:", err);
                setError("Failed to load initial permissions.");
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, []);

    const handleAddRole = () => {
        const initialPermissions: PermissionState = {};
        permissions.forEach((perm) => {
            initialPermissions[perm.id] = { checked: false };
        });

        setRoles((prev) => [
            ...prev,
            {
                projectRoleId: 0,
                name: "",
                isNew: true,
                permissions: initialPermissions,
            },
        ]);
    };

    const handleRoleNameChange = (index: number, value: string) => {
        const updatedRoles = [...roles];
        updatedRoles[index].name = value;
        setRoles(updatedRoles);
    };

    const handleRoleNameSubmit = async (index: number) => {
        const role = roles[index];

        if (!role.name.trim()) {
            alert("Please enter a role name.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/projects/3/roles",
                { roleName: role.name },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const newRoleId = res.data?.data?.id;

            const updatedRoles = [...roles];
            updatedRoles[index].projectRoleId = newRoleId;
            updatedRoles[index].isNew = false;
            setRoles(updatedRoles);
        } catch (error: any) {
            console.error("Error creating role:", error);
            let errorMessage = "Failed to create role.";
            if (error.response) {
                errorMessage = `Failed to create role. Server responded with: ${error.response.data?.message || error.response.status}`;
            } else if (error.request) {
                errorMessage = "Failed to create role. No response from server.";
            } else {
                errorMessage = "Failed to create role. Error setting up the request.";
            }
            alert(errorMessage);
        }
    };


    const handlePermissionToggle = async (
        roleIndex: number,
        permissionId: number
    ) => {
        const updatedRoles = [...roles];
        const role = updatedRoles[roleIndex];

        if (role.isNew || role.projectRoleId === 0) {
            alert("Please save the role name first.");
            return;
        }

        const currentPermission = role.permissions[permissionId];
        const isChecked = currentPermission?.checked;

        try {
            let response;
            if (!isChecked) {
                response = await axios.post(
                    "http://localhost:5000/role-permissions",
                    {
                        roleId: role.projectRoleId, // <-- Changed field name to roleId
                        permissionId: permissionId,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const rpId = response.data?.data?.id;
                role.permissions[permissionId] = { checked: true, rpId };
            } else {
                const rpId = currentPermission.rpId;
                if (rpId) {
                    await axios.delete(
                        `http://localhost:5000/role-permissions/${rpId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            // data: { roleId: role.projectRoleId },
                        }
                    );
                    role.permissions[permissionId] = { checked: false };
                } else {
                    console.error("Permission ID not found for deletion.");
                    alert("Permission ID not found. Try refreshing.");
                    return;
                }
            }

            setRoles(updatedRoles);
        } catch (error: any) {
            console.error("Error toggling permission:", error);
            let errorMessage = "Something went wrong while updating permissions.";
            if (error.response) {
                errorMessage = `Failed to update permissions. Server responded with: ${error.response.data?.message || error.response.status}`;
            } else if (error.request) {
                errorMessage = "Failed to update permissions. No response from server.";
            } else {
                errorMessage = "Failed to update permissions. Error setting up the request.";
            }
            alert(errorMessage);
        }
    };

    const cellStyle = (isHeader: boolean = false) => ({
        border: "1px solid #cbd5e1",
        p: 1.5,
        textAlign: "center",
        bgcolor: isHeader ? "#A5C8E5" : "#fff",
    });

    if (loading) {
        return <Typography>Loading access control data...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box mb={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight={700}>
                    Access Control
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleAddRole}
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
                    + ADD ROLE
                </Button>
            </Box>

            <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Grid container>
                    <Grid item xs={2.4} sx={cellStyle(true)}>
                        <Typography fontWeight="bold">Roles</Typography>
                    </Grid>
                    {permissions.map((perm) => (
                        <Grid key={perm.id} item xs={2.4} sx={cellStyle(true)}>
                            <Typography fontWeight="bold">{perm.name}</Typography>
                        </Grid>
                    ))}
                </Grid>

                {roles.map((role, index) => (
                    <Grid container key={index}>
                        <Grid item xs={2.4} sx={cellStyle()}>
                            <Box display="flex" alignItems="center" gap={1}>
                                {role.isNew ? (
                                    <>
                                        <TextField
                                            fullWidth
                                            value={role.name}
                                            onChange={(e) => handleRoleNameChange(index, e.target.value)}
                                            size="small"
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                                sx: { fontSize: "0.9rem" },
                                            }}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleRoleNameSubmit(index)}
                                            sx={{
                                                fontSize: "0.75rem",
                                                textTransform: "none",
                                                minWidth: 60,
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </>
                                ) : (
                                    <Typography sx={{ flexGrow: 1 }}>{role.name}</Typography>
                                    // Removed Delete Icon and related logic
                                )}
                            </Box>
                        </Grid>

                        {permissions.map((perm) => (
                            <Grid item xs={2.4} key={perm.id} sx={cellStyle()}>
                                <Switch
                                    color="primary"
                                    checked={role.permissions[perm.id]?.checked || false}
                                    onChange={() => handlePermissionToggle(index, perm.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Paper>
        </Box>
    );
};

export default AccessControlTable;