"use client";

import React from "react";
import { Header } from "./Header";
import AccessControlTable from "./AccessControlTable";
import UserRoleManager from "./UserRoleManager";

export const AccessControlPage: React.FC = () => {
  return (
    <main className="w-full bg-white min-h-[screen]">
      <Header />
      <div className="p-6 mx-auto max-w-[1200px]">
        <AccessControlTable />
        <UserRoleManager />
      </div>
    </main>
  );
};

export default AccessControlPage;
