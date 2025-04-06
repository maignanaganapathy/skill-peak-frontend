import React from "react";
import Navbar from "../../Navbar"; // Adjust the path as needed
import AccessControlTable from "./AccessControlTable";
import UserRoleManager from "./UserRoleManager";

export const AccessControlPage: React.FC = () => {
    return (
        <main className="w-full bg-white min-h-[screen]">
            <Navbar title="PROJECT DETAILS" /> 
            <div className="p-6 mx-auto max-w-[1200px]">
                <AccessControlTable />
                <UserRoleManager />
            </div>
        </main>
    );
};

export default AccessControlPage;