"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Switch,
    TextField,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { BACKEND_URL } from "../../../config";

const permissions = [
    { id: 1, name: "Read" },
    { id: 2, name: "Create" },
    { id: 3, name: "Update" },
    { id: 4, name: "Delete" },
];

interface PermissionState {
    [permId: number]: { checked: boolean; rpId?: number };
}

interface Role {
    projectRoleId: number;
    name: string;
    isNew?: boolean;
    permissions: PermissionState;
    isNameChanged?: boolean;
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
    const navigate = useNavigate();
    const [isSavingAll, setIsSavingAll] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            setLoading(true);
            setError(null);
            const token = Cookies.get('authToken');

            if (!token) {
                console.warn("Authentication token not found when fetching permissions.");
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get(`${BACKEND_URL}/auth/permissions`, {
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
                        isNameChanged: false,
                    });
                }

                setRoles(roleList);
            } catch (err: any) {
                console.error("Error fetching permissions:", err);
                setError("Failed to load initial permissions.");
                if (err.response && err.response.status === 401) {
                    console.error("Unauthorized access. Redirecting to login.");
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, [navigate]);

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
                isNameChanged: true,
            },
        ]);
    };

    const handleRoleNameChange = (index: number, value: string) => {
        const updatedRoles = [...roles];
        updatedRoles[index].name = value;
        updatedRoles[index].isNameChanged = true;
        setRoles(updatedRoles);
    };

    const saveRoleName = useCallback(async (index: number) => {
        const role = roles[index];
        const token = Cookies.get('authToken');

        if (!token) {
            console.error("Authentication token not found in cookie. Cannot save role name.");
            alert("Authentication error. Please log in again.");
            return;
        }

        if (!role.name.trim()) {
            alert("Please enter a role name.");
            return;
        }

        setIsSavingAll(true);
        try {
            if (role.isNew) {
                const res = await axios.post(
                    `${BACKEND_URL}/projects/3/roles`,
                    { roleName: role.name },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const newRoleId = res.data?.data?.id;
                const updatedRoles = [...roles];
                updatedRoles[index].projectRoleId = newRoleId;
                updatedRoles[index].isNew = false;
                updatedRoles[index].isNameChanged = false;
                setRoles(updatedRoles);
            } else if (role.isNameChanged) {
                await axios.put(
                    `${BACKEND_URL}/projects/3/roles/${role.projectRoleId}`,
                    { roleName: role.name },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const updatedRoles = [...roles];
                updatedRoles[index].isNameChanged = false;
                setRoles(updatedRoles);
            }
        } catch (error: any) {
            console.error("Error saving role name:", error);
            let errorMessage = "Failed to save role name.";
            if (error.response) {
                errorMessage = `Failed to save role name. Server responded with: ${error.response.data?.message || error.response.status}`;
                if (error.response.status === 401) {
                    console.error("Unauthorized access during role name save. Redirecting to login.");
                    navigate('/login');
                    return;
                }
            } else if (error.request) {
                errorMessage = "Failed to save role name. No response from server.";
            } else {
                errorMessage = "Failed to save role name. Error setting up the request.";
            }
            alert(errorMessage);
        } finally {
            setIsSavingAll(false);
        }
    }, [roles, navigate]);

    const handleRoleNameBlur = (index: number) => {
        if (roles[index].isNameChanged) {
            saveRoleName(index);
        }
    };

    const handleDeleteRole = async (index: number) => {
        const roleToDelete = roles[index];
        const token = Cookies.get('authToken');

        if (!token) {
            console.error("Authentication token not found in cookie. Cannot delete role.");
            alert("Authentication error. Please log in again.");
            return;
        }

        if (roleToDelete.isNew || roleToDelete.projectRoleId === 0) {
            const updatedRoles = roles.filter((_, i) => i !== index);
            setRoles(updatedRoles);
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete the role "${roleToDelete.name}" and its associated permissions?`);
        if (!confirmDelete) {
            return;
        }

        try {
            const deletePermissionsUrl = `${BACKEND_URL}/role-permissions/role/${roleToDelete.projectRoleId}`;
            await axios.delete(
                deletePermissionsUrl,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(`Role permissions for role ID ${roleToDelete.projectRoleId} deleted successfully.`);

            const deleteRoleUrl = `${BACKEND_URL}/projects/3/roles/${roleToDelete.projectRoleId}`;
            await axios.delete(
                deleteRoleUrl,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(`Role "${roleToDelete.name}" deleted successfully.`);

            const updatedRoles = roles.filter((_, i) => i !== index);
            setRoles(updatedRoles);
            alert(`Role "${roleToDelete.name}" and its associated permissions deleted successfully.`);

        } catch (error: any) {
            console.error("Error deleting role and/or permissions:", error);
            let errorMessage = "Failed to delete role and/or permissions.";
            if (error.response) {
                errorMessage = `Failed to delete role and/or permissions. Server responded with: ${error.response.data?.message || error.response.status}`;
                if (error.response.status === 401) {
                    console.error("Unauthorized access during deletion. Redirecting to login.");
                    navigate('/login');
                    return;
                } else if (error.response.status === 404) {
                    console.error("Error: Role permissions endpoint not found.", error.response);
                    errorMessage = "Error: Could not delete role permissions. Please contact an administrator.";
                }
            } else if (error.request) {
                errorMessage = "Failed to delete role and/or permissions. No response from server.";
            } else {
                errorMessage = "Failed to delete role and/or permissions. Error setting up the request.";
            }
            alert(errorMessage);
        }
    };

    const handlePermissionToggle = async (roleIndex: number, permissionId: number) => {
        const updatedRoles = [...roles];
        const role = updatedRoles[roleIndex];
        const token = Cookies.get('authToken');

        if (!token) {
            console.error("Authentication token not found in cookie. Cannot toggle permission.");
            alert("Authentication error. Please log in again.");
            return;
        }

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
                    `${BACKEND_URL}/role-permissions`,
                    {
                        roleId: role.projectRoleId,
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
                        `${BACKEND_URL}/role-permissions/${rpId}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
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
                if (error.response.status === 401) {
                    console.error("Unauthorized access during permission toggle. Redirecting to login.");
                    navigate('/login');
                    return;
                }
            } else if (error.request) {
                errorMessage = "Failed to update permissions. No response from server.";
            } else {
                errorMessage = "Failed to update permissions. Error setting up the request.";
            }
            alert(errorMessage);
        }
    };

    const handleSaveAllRoles = () => {
        roles.forEach((_, index) => {
            if (roles[index].isNameChanged) {
                saveRoleName(index);
            }
        });
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

    const hasUnsavedChanges = roles.some(role => role.isNameChanged);

    return (
        <Box mb={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight={700}>
                    Access Control
                </Typography>
                <Box display="flex" gap={1}>
                    {hasUnsavedChanges && (
                        <Button
                            variant="contained"
                            onClick={handleSaveAllRoles}
                            startIcon={<SaveIcon />}
                            disabled={isSavingAll}
                            sx={{
                                px: 2,
                                py: 1.2,
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                backgroundColor: isSavingAll ? "#ccc" : "#4CAF50",
                                borderRadius: 1,
                                textTransform: "none",
                            }}
                        >
                            {isSavingAll ? "Saving..." : "Save All"}
                        </Button>
                    )}
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
                                <TextField
                                    fullWidth
                                    value={role.name}
                                    onChange={(e) => handleRoleNameChange(index, e.target.value)}
                                    onBlur={() => handleRoleNameBlur(index)}
                                    size="small"
                                    variant="standard"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { fontSize: "0.9rem" },
                                    }}
                                />
                                <IconButton
                                    onClick={() => handleDeleteRole(index)}
                                    size="small"
                                    color="error"
                                    disabled={role.isNew}
                                >
                                    <DeleteIcon />
                                </IconButton>
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