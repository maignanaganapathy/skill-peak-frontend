// src/features/admin/ManagePermissions/services/api.ts
import { api } from '../../../../utils/axiosConfig';
import { BACKEND_URL } from '../../../../config';

interface UserData {
  mail: string;
  mobile: string;
  roleId: number | '';
}

export const addUserToProject = async (projectId: number, userData: UserData) => {
  try {
    const response = await api.post(`${BACKEND_URL}/projects/${projectId}/users`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error adding user to project:', error);
    throw error;
  }
};

export const fetchProjectRoles = async (projectId: number) => {
  try {
    const response = await api.get(`${BACKEND_URL}/projects/${projectId}/roles`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching project roles:', error);
    throw error;
  }
};

interface CreateRoleData {
  roleName: string;
  projectId: number;
}

export const createProjectRole = async (roleData: CreateRoleData) => {
  try {
    const { projectId, roleName } = roleData;
    const response = await api.post(`${BACKEND_URL}/projects/${projectId}/roles`, { roleName });
    return response.data;
  } catch (error: any) {
    console.error('Error creating project role:', error);
    throw error;
  }
};

interface UpdateRoleData {
  roleName: string;
  projectId: number;
  roleId: number;
}

export const updateProjectRole = async (roleData: UpdateRoleData) => {
  try {
    const { projectId, roleId, roleName } = roleData;
    const response = await api.put(`${BACKEND_URL}/projects/${projectId}/roles/${roleId}`, { roleName });
    return response.data;
  } catch (error: any) {
    console.error('Error updating project role:', error);
    throw error;
  }
};

export const deleteProjectRole = async (projectId: number, roleId: number) => {
  try {
    const response = await api.delete(`${BACKEND_URL}/projects/${projectId}/roles/${roleId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting project role:', error);
    throw error;
  }
};

interface AddRolePermissionData {
  roleId: number;
  permissionId: number;
}

export const addRolePermission = async (data: AddRolePermissionData) => {
  try {
    const response = await api.post(`${BACKEND_URL}/role-permissions`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error adding role permission:', error);
    throw error;
  }
};

export const removeRolePermission = async (rolePermissionId: number) => {
  try {
    const response = await api.delete(`${BACKEND_URL}/role-permissions/${rolePermissionId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error removing role permission:', error);
    throw error;
  }
};