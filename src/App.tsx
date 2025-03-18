import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModalWrapper from "./features/Admin/CreateProject/ModalWrapper";
import InputDesign from "./features/Admin/AddSection/InputDesign";
import {NotificationManager} from "./features/Admin/Notification/NotificationManager"; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/modal" element={<ModalWrapper />} />
        <Route path="/input" element={<InputDesign />} />
        <Route path="/Notification" element={<NotificationManager />} />


      </Routes>
    </Router>
  );
};

export default App;
