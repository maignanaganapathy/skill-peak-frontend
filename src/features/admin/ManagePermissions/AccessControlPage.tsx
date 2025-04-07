
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../utils/axiosConfig';
import { BACKEND_URL } from '../../../config';
import Navbar from '../../Navbar';
import AccessControlTable, { Role, PermissionInfo } from './AccessControlTable';
import UserRoleManager from './UserRoleManager';

const AccessControlPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [availablePermissions, setAvailablePermissions] = useState<PermissionInfo[]>([]);

  const [loading, setLoading] = useState(true); // Add loading state.
  const [error, setError] = useState<string | null>(null); // Add error state.

  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const [rolesResponse, permissionsResponse] = await Promise.all([
          api.get(`${BACKEND_URL}/projects/3/roles`),
          api.get(`${BACKEND_URL}/auth/permissions`),
        ]);
        setRoles(rolesResponse.data);
        setAvailablePermissions(permissionsResponse.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRolesAndPermissions();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator.
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error message.
  }

  return (
    <main>
      <Navbar title="PROJECT DETAILS" />
      <div className="p-6 mx-auto max-w-[1200px]">
        <AccessControlTable roles={roles} availablePermissions={availablePermissions} />
        <UserRoleManager roles={roles} />
      </div>
    </main>
  );
};

export default AccessControlPage;