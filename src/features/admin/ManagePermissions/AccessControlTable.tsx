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

export interface Role {
  id: number;
  roleName: string;
  projectRoleId: number;
  name: string;
  isNew?: boolean;
  permissions: PermissionState;
  isNameChanged?: boolean;
}

export interface PermissionInfo {
  id: number;
  name: string;
}

interface AccessControlTableProps {
  roles: Role[];
  availablePermissions: PermissionInfo[];
}

const AccessControlTable: React.FC<AccessControlTableProps> = ({ roles: initialRoles, availablePermissions }) => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const navigate = useNavigate();
  const [isSavingAll, setIsSavingAll] = useState(false);

  const projectIdFromURL = "3";

  useEffect(() => {
    setRoles(initialRoles);
  }, [initialRoles]);

  const handleAddRole = () => {
    setRoles((prev) => [
      ...prev,
      {
        id: 0,
        roleName: "",
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
    [roles, navigate, projectIdFromURL]
  );

  const handleRoleNameBlur = (index: number) => {
    if (roles[index].isNameChanged) {
      saveRoleName(index);
    }
  };

  const handleDeleteRole = async (index: number) => {
    const roleToDelete = roles[index];

    if (roleToDelete.isNew || roleToDelete.projectRoleId === 0) {
      setRoles((prev) => prev.filter((_role, i) => i !== index));
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the role "${roleToDelete.name}"?`
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`${BACKEND_URL}/role-permissions/${roleToDelete.projectRoleId}`);
      setRoles((prev) => prev.filter((_role, i) => i !== index));
      alert(`Role "${roleToDelete.name}" deleted successfully.`);
    } catch (error: any) {
      console.error("Error deleting role:", error);
      alert("Failed to delete role.");
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handlePermissionToggle = async (roleIndex: number, permissionName: string) => {
    const updatedRoles = [...roles];
    const role = updatedRoles[roleIndex];

    if (role.isNew || role.projectRoleId === 0) {
      alert("Please save the role name first.");
      return;
    }

    const currentPermission = role.permissions[permissionName];
    const isChecked = currentPermission?.checked;

    try {
      const permissionInfo = availablePermissions.find((perm) => perm.name === permissionName);
      if (permissionInfo) {
        if (!isChecked) {
          const response = await api.post(
            `${BACKEND_URL}/role-permissions`,
            { roleId: role.projectRoleId, permissionId: permissionInfo.id }
          );
          const rpId = response.data?.data?.id;
          role.permissions[permissionName] = { checked: true, rpId };
        } else {
          await api.delete(`${BACKEND_URL}/role-permissions/${currentPermission.rpId}`);
          role.permissions[permissionName] = { checked: false };
        }
        setRoles(updatedRoles);
      } else {
        console.error("Permission ID not found.");
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
    alert("All roles saved successfully.");
  };

  const cellStyle = (isHeader: boolean = false) => ({
    border: "1px solid #cbd5e1",
    p: 1.5,
    textAlign: "center",
    bgcolor: isHeader ? "#A5C8E5" : "#fff",
  });

  return (
    <Box mb={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="700" color="text.primary">
          Access Control Table
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddRole}
          sx={{ textTransform: "none", backgroundColor: "#1E3A8A" }}
        >
          + Add Role
        </Button>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Grid container>
          <Grid item xs={2} sx={cellStyle(true)}>
            <Typography fontWeight="bold">Role Name</Typography>
          </Grid>
          {Object.values(Permissions).map((perm) => (
            <Grid item xs={1} key={perm} sx={cellStyle(true)}>
              <Typography fontWeight="bold">{perm.replace(/_/g, " ")}</Typography>
            </Grid>
          ))}
          <Grid item xs={1} sx={cellStyle(true)}>
            <Typography fontWeight="bold">Actions</Typography>
          </Grid>
        </Grid>

        {roles.map((role, index) => (
          <Grid container key={index}>
            <Grid item xs={2} sx={cellStyle()}>
              <TextField
                fullWidth
                value={role.name}
                onChange={(e) => handleRoleNameChange(index, e.target.value)}
                onBlur={() => handleRoleNameBlur(index)}
                variant="standard"
                InputProps={{ disableUnderline: true }}
              />
            </Grid>
            {Object.values(Permissions).map((perm) => (
              <Grid item xs={1} key={perm} sx={cellStyle()}>
                <Switch
                  checked={role.permissions[perm]?.checked || false}
                  onChange={() => handlePermissionToggle(index, perm)}
                  color="primary"
                />
              </Grid>
            ))}
            <Grid item xs={1} sx={cellStyle()}>
              <Box display="flex" justifyContent="center">
                <IconButton onClick={() => handleDeleteRole(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Paper>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleSaveAllRoles}
          disabled={isSavingAll}
          sx={{ textTransform: "none", backgroundColor: "#0A7E07" }}
        >
          {isSavingAll ? "Saving..." : "Save All Roles"}
        </Button>
      </Box>
    </Box>
  );
};

export default AccessControlTable;