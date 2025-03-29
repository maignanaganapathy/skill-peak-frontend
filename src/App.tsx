import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Your custom MUI theme

// 🔹 Admin Features
import ModalWrapper from "./features/admin/CreateProject/ModalWrapper";
import SectionList from "./features/admin/AddSection/SectionList";
import { NotificationManager } from "./features/admin/Notification/NotificationManager";
import Program from "./features/admin/Project/Program";
import AccessControlPage from "./features/admin/ManagePermissions/AccessControlPage";

// 🔹 Auth & Dashboard Features
import {LandingPage} from "./features/landing/Landingpage"; // Ensure the correct file casing
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/Signup";
import Dashboard from "./features/dashboard/Dashboard";

// 🔹 Quiz Features
import QuizList from "./features/quiz/QuizListing/QuizList";
import QuizCreation from "./features/quiz/QuizCreation/QuizForm";
import QuizPage from "./features/quiz/QuizAttending/AppContainer";

// 🔹 Contexts and Toasts
import { PermissionsProvider } from "./context/PermissionsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <PermissionsProvider>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* 🔹 Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* 🔹 Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* 🔹 Admin Routes */}
              <Route path="/notification" element={<NotificationManager />} />
              <Route path="/program" element={<Program />} />
              <Route path="/access" element={<AccessControlPage />} />

              {/* 🔹 Quiz Routes */}
              <Route path="/quiz/list" element={<QuizList />} />
              <Route path="/quiz/create" element={<QuizCreation />} />
              <Route path="/quiz/:id/attend" element={<QuizPage />} />
            </Routes>

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </PermissionsProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
