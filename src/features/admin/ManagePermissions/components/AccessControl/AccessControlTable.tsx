// src/features/admin/ManagePermissions/AccessControlTable.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { api } from "../../../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../../../config";
import { Role, PermissionInfo } from "../../AccessControlPage";
import AccessControlTableHeader from "./AccessControlTableHeader";
import AccessControlTableRow from "./AccessControlTableRow";

interface AccessControlTableProps {
  roles: Role[];
  availablePermissions: PermissionInfo[];
  projectId: string;
}

// Declare Permissions enum directly within the component
enum LocalPermissions {
  CREATE_SECTION = "create_section",
  EDIT_SECTION = "edit_section",
  DELETE_SECTION = "delete_section",
  CREATE_PROJECT = "create_project",
  EDIT_PROJECT = "edit_project",
  DELETE_PROJECT = "delete_project",
  MANAGE_ACCOUNT = "manage_account",
  MANAGE_QUIZ = "manage_quiz",
}

const AccessControlTable: React.FC<AccessControlTableProps> = ({
  roles: initialRoles,
  availablePermissions: initialAvailablePermissions,
  projectId,
}) => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [localAvailablePermissions, setLocalAvailablePermissions] = useState<PermissionInfo[]>(initialAvailablePermissions);
  const navigate = useNavigate();
  const [isSavingAll, setIsSavingAll] = useState(false);

  console.log("availablePermissions prop in AccessControlTable:", initialAvailablePermissions);
  console.log("Initial localAvailablePermissions:", localAvailablePermissions);

  useEffect(() => {
    setRoles(initialRoles);
    setLocalAvailablePermissions(initialAvailablePermissions);
    console.log("useEffect - localAvailablePermissions updated:", localAvailablePermissions);
  }, [initialRoles, initialAvailablePermissions]);

  const handleAddRole = () => {
    setRoles((prev) => [
      ...prev,
      {
        id: 0,
        roleName: "",
        projectRoleId: 0,
        name: "",
        isNew: true,
        permissions: Object.values(LocalPermissions).reduce((acc, perm) => ({ ...acc, [perm]: { checked: false, rpId: undefined } }), {}),
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

      if (!role.name?.trim()) {
        alert("Please enter a role name.");
        return;
      }

      setIsSavingAll(true);
      try {
        if (role.isNew) {
          if (projectId) {
            const response = await api.post(`${BACKEND_URL}/projects/${projectId}/roles`, { roleName: role.name });
            const newRoleId = response.data?.data?.id;
            const updatedRoles = [...roles];
            updatedRoles[index].projectRoleId = newRoleId;
            updatedRoles[index].isNew = false;
            updatedRoles[index].isNameChanged = false;
            setRoles(updatedRoles);
          } else {
            alert("Project ID is missing.");
          }
        } else if (role.isNameChanged && role.projectRoleId) {
          if (projectId) {
            await api.put(`${BACKEND_URL}/projects/${projectId}/roles/${role.projectRoleId}`, { roleName: role.name });
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
    [roles, navigate, projectId]
  );

  const handleRoleNameBlur = (index: number) => {
    if (roles[index]?.isNameChanged) {
      saveRoleName(index);
    }
  };

  const handleDeleteRole = async (index: number) => {
    const roleToDelete = roles[index];

    if (roleToDelete?.isNew || roleToDelete?.projectRoleId === 0) {
      setRoles((prev) => prev.filter((_role, i) => i !== index));
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the role "${roleToDelete?.name}"?`
    );
    if (!confirmDelete) {
      return;
    }

    try {
      if (projectId && roleToDelete?.projectRoleId) {
        await api.delete(`${BACKEND_URL}/projects/${projectId}/roles/${roleToDelete.projectRoleId}`);
        setRoles((prev) => prev.filter((_role, i) => i !== index));
        alert(`Role "${roleToDelete?.name}" deleted successfully.`);
      } else {
        alert("Project ID or Role ID is missing.");
      }
    } catch (error: any) {
      console.error("Error deleting role:", error);
      alert("Failed to delete role.");
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handlePermissionChange = async (roleIndex: number, permissionName: string, checked: boolean) => {
    const updatedRoles = [...roles];
    const role = updatedRoles[roleIndex];

    console.log("localAvailablePermissions in handlePermissionChange:", localAvailablePermissions);

    const permissionInfo = localAvailablePermissions.find((perm) => perm.name === permissionName);

    if (projectId && role?.projectRoleId && permissionInfo) {
      try {
        if (checked && !role.permissions[permissionName]?.rpId) {
          // Add permission
          const response = await api.post(`${BACKEND_URL}/role-permissions`, {
            roleId: role.projectRoleId, // Use roleId here, not projectRoleId
            permissionId: permissionInfo.id,
          });
          updatedRoles[roleIndex].permissions[permissionName] = { checked: true, rpId: response.data?.data?.id };
          setRoles(updatedRoles);
        } else if (!checked && role.permissions[permissionName]?.rpId) {
          // Remove permission
          const rpIdToDelete = role.permissions[permissionName].rpId;
          if (rpIdToDelete !== undefined) {
            await api.delete(`${BACKEND_URL}/role-permissions/${rpIdToDelete}`);
            updatedRoles[roleIndex].permissions[permissionName] = { checked: false, rpId: undefined };
            setRoles(updatedRoles);
          }
        } else {
          // Permission state is already as desired
          updatedRoles[roleIndex].permissions[permissionName].checked = checked;
          setRoles(updatedRoles);
        }
      } catch (error: any) {
        console.error('Error toggling permission:', error);
        alert('Failed to toggle permission.');
        // Revert the toggle on the UI if the API call fails
        updatedRoles[roleIndex].permissions[permissionName].checked = !checked;
        setRoles(updatedRoles);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    } else {
      console.warn('Could not toggle permission: Missing projectId, roleId, or permissionInfo.');
      // Update UI state even if API call is not made due to missing data
      updatedRoles[roleIndex].permissions[permissionName].checked = checked;
      setRoles(updatedRoles);
    }
  };

  const handleSaveAllRoles = async () => {
    setIsSavingAll(true);
    for (let i = 0; i < roles.length; i++) {
      const role = roles[i];
      if (!role?.name?.trim()) {
        alert(`Role name at position ${i + 1} is empty.`);
        setIsSavingAll(false);
        return;
      }
      try {
        await saveRoleName(i); // Ensure role name is saved/created

        if (projectId && role?.projectRoleId) {
          for (const permissionName of Object.keys(role.permissions)) {
            const permissionState = role.permissions[permissionName];
            const permissionInfo = localAvailablePermissions.find((perm) => perm.name === permissionName);

            if (permissionInfo) {
              if (permissionState.checked && permissionState.rpId === undefined) {
                // Add permission if checked and rpId is missing
                const response = await api.post(`${BACKEND_URL}/role-permissions`, {
                  roleId: role.projectRoleId, // Use roleId here
                  permissionId: permissionInfo.id,
                });
                const updatedRoles = [...roles];
                updatedRoles[i].permissions[permissionName].rpId = response.data?.data?.id;
                setRoles(updatedRoles);
              } else if (!permissionState.checked && permissionState.rpId !== undefined) {
                // Remove permission if unchecked and rpId exists
                await api.delete(`${BACKEND_URL}/role-permissions/${permissionState.rpId}`);
                const updatedRoles = [...roles];
                updatedRoles[i].permissions[permissionName].rpId = undefined;
                setRoles(updatedRoles);
              }
            }
          }
        } else {
          console.warn("Project ID or Role ID missing during save all permissions.");
        }
      } catch (err: any) {
        console.error(`Failed to save role/permissions at index ${i}:`, err);
        alert(`Failed to save role "${role?.name}" or its permissions.`);
        setIsSavingAll(false);
        return;
      }
    }
    alert("All roles and permissions saved successfully.");
    setIsSavingAll(false);
  };

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
        <AccessControlTableHeader permissions={Object.values(LocalPermissions)} />

        {roles.map((role, index) => (
          <AccessControlTableRow
            key={index}
            role={role}
            index={index}
            permissions={Object.values(LocalPermissions)} // Use the local enum values
            onRoleNameChange={handleRoleNameChange}
            onRoleNameBlur={handleRoleNameBlur}
            onDeleteRole={() => handleDeleteRole(index)}
            onPermissionChange={handlePermissionChange}
          />
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