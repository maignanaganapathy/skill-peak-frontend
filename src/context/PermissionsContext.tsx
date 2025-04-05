import React, { createContext, useContext, useEffect, useState } from "react";
import { Permissions } from "../constants/Permissions";
import { api } from "../utils/axiosConfig"; 

type PermissionsContextType = {
  modulePermissions: Permissions[];
  projectPermissionsFormatted: Record<string, Permissions[]>;
  checkHasPermission: (permission: Permissions, projectId?: string) => boolean;
};

const PermissionsContext = createContext<PermissionsContextType>({
  modulePermissions: [],
  projectPermissionsFormatted: {},
  checkHasPermission: () => false,
});

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modulePermissions, setModulePermissions] = useState<Permissions[]>([]);
  const [projectPermissionsFormatted, setProjectPermissionsFormatted] = useState<Record<string, Permissions[]>>({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await api.get("/auth/permissions"); // Use the configured Axios instance
        setModulePermissions(res.data.modulePermissions || []);
        setProjectPermissionsFormatted(res.data.projectPermissionsFormatted || {});
      } catch (err) {
        console.error("Failed to fetch permissions", err);
        // Consider handling unauthorized errors (e.g., redirect to login) here as well
      }
    };

    fetchPermissions();
  }, []);

  const checkHasPermission = (permission: Permissions, projectId?: string): boolean => {
    if (modulePermissions.includes(permission)) return true;

    if (
      projectId &&
      projectPermissionsFormatted[projectId] &&
      projectPermissionsFormatted[projectId].includes(permission)
    ) {
      return true;
    }

    return false;
  };

  return (
    <PermissionsContext.Provider
      value={{ modulePermissions, projectPermissionsFormatted, checkHasPermission }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);