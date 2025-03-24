import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModalWrapper from "./features/admin/CreateProject/ModalWrapper";
import InputDesign from "./features/admin/AddSection/InputDesign";
import { NotificationManager } from "./features/admin/Notification/NotificationManager";
import Program from "./features/admin/Project/Program";
import AccessControlPage from "./features/admin/ManagePermissions/AccessControlPage";
import { PermissionsProvider } from "./context/PermissionsContext";

const App: React.FC = () => {
  return (
    <Router>
      <PermissionsProvider>
        <Routes>
          <Route path="/Notification" element={<NotificationManager />} />
          <Route path="/program" element={<Program />} />
          <Route path="/access" element={<AccessControlPage />} />
        </Routes>
      </PermissionsProvider>
    </Router>
  );
};

export default App;
