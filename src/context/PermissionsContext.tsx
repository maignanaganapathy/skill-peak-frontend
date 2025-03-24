import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Permissions } from "../constants/Permissions";
import { BACKEND_URL } from "../config";

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
        const res = await axios.get(`${BACKEND_URL}/auth/permissions`, {
          withCredentials: true,
        });
        

        setModulePermissions(res.data.modulePermissions || []);
        setProjectPermissionsFormatted(res.data.projectPermissionsFormatted || {});
      } catch (err) {
        console.error("Failed to fetch permissions", err);
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
