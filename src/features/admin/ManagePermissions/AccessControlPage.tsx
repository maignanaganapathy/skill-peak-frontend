// src/features/admin/ManagePermissions/AccessControlPage.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import UserRoleManager from './components/UserRole/UserRoleManager';
import { fetchProjectRoles } from './services/api';
import { api } from '../../../utils/axiosConfig';
import { BACKEND_URL } from '../../../config';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccessControlTable from './components/AccessControl/AccessControlTable'; // Ensure this file exists and is correctly implemented

export interface Role {
  id: number;
  roleName: string;
  projectRoleId: number;
  name: string;
  isNew?: boolean;
  permissions: { [perm: string]: { checked: boolean; rpId?: number } };
  isNameChanged?: boolean;
}

export interface PermissionInfo {
  id: number;
  name: string;
  description: string;
}

const Container = styled.div`
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`;

const AccessControlPage: React.FC = () => {
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const projectId = routeProjectId ? parseInt(routeProjectId, 10) : undefined;

  const [roles, setRoles] = useState<Role[]>([]);
  const [availablePermissions, setAvailablePermissions] = useState<PermissionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!projectId) {
        setError('Project ID is missing in the URL.');
        setLoading(false);
        return;
      }
      try {
        const [rolesData, permissionsResponse] = await Promise.all([
          fetchProjectRoles(projectId),
          api.get(`${BACKEND_URL}/auth/permissions`),
        ]);
        setRoles(rolesData as Role[]);
        setAvailablePermissions(permissionsResponse.data as PermissionInfo[]);
      } catch (err: any) {
        console.error('Error fetching roles and permissions:', err);
        setError('Failed to load roles and permissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <Navbar title="PROJECT DETAILS" />
      <Container>
        {projectId !== undefined ? (
          <AccessControlTable
            roles={roles}
            availablePermissions={availablePermissions}
            projectId={String(projectId)}
          />
        ) : (
          <div>Error: Project ID is missing.</div>
        )}
        <UserRoleManager roles={roles} />
      </Container>
    </main>
  );
};

export default AccessControlPage;