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
import { api } from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../../../config";

export enum Permissions {
  CREATE_SECTION = "create_section",
  EDIT_SECTION = "edit_section",
  DELETE_SECTION = "delete_section",
  CREATE_PROJECT = "create_project",
  EDIT_PROJECT = "edit_project",
  DELETE_PROJECT = "delete_project",
  MANAGE_ACCOUNT = "manage_account",
  MANAGE_QUIZ = "manage_quiz",
}

interface PermissionState {
  [perm: string]: { checked: boolean; rpId?: number };
}

interface Role {
  projectRoleId: number;
  name: string;
  isNew?: boolean;
  permissions: PermissionState;
  isNameChanged?: boolean;
}

const AccessControlTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isSavingAll, setIsSavingAll] = useState(false);

  const projectIdFromURL = "3";

  const fetchPermissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (projectIdFromURL) {
        const res = await api.get(
          `${BACKEND_URL}/projects/${projectIdFromURL}/roles`
        );

        const roleList: Role[] = res.data.map((roleData: any) => {
          const permissionsMap: PermissionState = {};

          Object.values(Permissions).forEach((perm) => {
            permissionsMap[perm] = { checked: false };
          });

          if (roleData.rolePermissions) {
            roleData.rolePermissions.forEach((perm: any) => {
              permissionsMap[perm.permission.name] = {
                checked: true,
                rpId: perm.id,
              };
            });
          }

          return {
            projectRoleId: roleData.id,
            name: roleData.roleName,
            permissions: permissionsMap,
            isNameChanged: false,
          };
        });

        setRoles(roleList);
      } else {
        setError("Project ID is missing.");
      }
    } catch (err: any) {
      console.error("Error fetching permissions:", err);
      setError("Failed to load initial permissions.");
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, projectIdFromURL]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const handleAddRole = () => {
    setRoles((prev) => [
      ...prev,
      {
        projectRoleId: 0,
        name: "",
        isNew: true,
        permissions: {},
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

  const saveRoleName = useCallback(
    async (index: number) => {
      const role = roles[index];

      if (!role.name.trim()) {
        alert("Please enter a role name.");
        return;
      }

      setIsSavingAll(true);
      try {
        if (role.isNew) {
          if (projectIdFromURL) {
            const res = await api.post(
              `${BACKEND_URL}/projects/${projectIdFromURL}/roles`,
              { roleName: role.name }
            );
            const newRoleId = res.data?.data?.id;
            const updatedRoles = [...roles];
            updatedRoles[index].projectRoleId = newRoleId;
            updatedRoles[index].isNew = false;
            updatedRoles[index].isNameChanged = false;
            setRoles(updatedRoles);
            fetchPermissions();
          } else {
            alert("Project ID is missing.");
          }
        } else if (role.isNameChanged) {
          if (projectIdFromURL) {
            await api.put(
              `${BACKEND_URL}/projects/${projectIdFromURL}/roles/${role.projectRoleId}`,
              { roleName: role.name }
            );
            const updatedRoles = [...roles];
            updatedRoles[index].isNameChanged = false;
            setRoles(updatedRoles);
            fetchPermissions();
          } else {
            alert("Project ID is missing.");
          }
        }
      } catch (error: any) {
        console.error("Error saving role name:", error);
        alert("Failed to save role name.");
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsSavingAll(false);
      }
    },
    [roles, navigate, projectIdFromURL, fetchPermissions]
  );

  const handleRoleNameBlur = (index: number) => {
    if (roles[index].isNameChanged) {
      saveRoleName(index);
    }
  };

  const handleDeleteRole = async (index: number) => {
    const roleToDelete = roles[index];

    if (roleToDelete.isNew || roleToDelete.projectRoleId === 0) {
      setRoles((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the role "${roleToDelete.name}"?`
    );
    if (!confirmDelete) {
      return;
    }

    try {
      if (projectIdFromURL) {
        await api.delete(
          `${BACKEND_URL}/projects/${projectIdFromURL}/roles/${roleToDelete.projectRoleId}`
        );
        setRoles((prev) => prev.filter((_, i) => i !== index));
        fetchPermissions();
        alert(`Role "${roleToDelete.name}" deleted successfully.`);
      } else {
        alert("Project ID is missing.");
      }
    } catch (error: any) {
      console.error("Error deleting role:", error);
      alert("Failed to delete role.");
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handlePermissionToggle = async (roleIndex: number, permission: string) => {
    const updatedRoles = [...roles];
    const role = updatedRoles[roleIndex];

    if (role.isNew || role.projectRoleId === 0) {
      alert("Please save the role name first.");
      return;
    }

    const currentPermission = role.permissions[permission];
    const isChecked = currentPermission?.checked;

    try {
      if (projectIdFromURL) {
        if (!isChecked) {
          const response = await api.post(
            `${BACKEND_URL}/projects/${projectIdFromURL}/roles/${role.projectRoleId}/permissions`,
            { permissionName: permission }
          );
          const rpId = response.data?.data?.id;
          role.permissions[permission] = { checked: true, rpId };
        } else {
          const rpId = currentPermission.rpId;
          if (rpId) {
            await api.delete(
              `${BACKEND_URL}/projects/${projectIdFromURL}/roles/${role.projectRoleId}/permissions/${rpId}`
            );
            role.permissions[permission] = { checked: false };
          } else {
            console.error("Permission ID not found for deletion.");
            alert("Permission ID not found. Try refreshing.");
            return;
          }
        }
        setRoles(updatedRoles);
      } else {
        alert("Project ID is missing.");
      }
    } catch (error: any) {
      console.error("Error toggling permission:", error);
      alert("Something went wrong while updating permissions.");
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleSaveAllRoles = async () => {
    setIsSavingAll(true);
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (!role.name.trim()) {
        alert(`Role name at position ${i + 1} is empty.`);
        setIsSavingAll(false);
        return;
      }
      try {
        await saveRoleName(i);
      } catch (err) {
        console.error(`Failed to save role name for role at index ${i}:`, err);
      }
    }
    fetchPermissions();
    setIsSavingAll(false);
    alert("All roles saved successfully.");
  };

  const cellStyle = (isHeader: boolean = false) => ({
    border: "1px solid #cbd5e1",
    p: 1.5,
    textAlign: "center",
    bgcolor: isHeader ? "#A5C8E5" : "#fff",
  });

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box mb={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={700}>
          Access Control
        </Typography>
        <Box display="flex" gap={1}>
          {roles.some((role) => role.isNameChanged) && (
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
          <Grid item xs={2} sx={cellStyle(true)}>
            <Typography fontWeight="bold">Roles</Typography>
          </Grid>
          {Object.values(Permissions).map((perm) => (
            <Grid key={perm} item xs={1.25} sx={cellStyle(true)}>
              <Typography fontWeight="bold">{perm}</Typography>
            </Grid>
          ))}
        </Grid>

        {roles.map((role, index) => (
          <Grid container key={index}>
            <Grid item xs={2} sx={cellStyle()}>
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
            {Object.values(Permissions).map((perm) => (
              <Grid item xs={1.25} key={perm} sx={cellStyle()}>
                <Switch
                  color="primary"
                  checked={role.permissions[perm]?.checked || false}
                  onChange={() => handlePermissionToggle(index, perm)}
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