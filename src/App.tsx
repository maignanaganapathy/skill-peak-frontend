import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Admin Features
import ModalWrapper from "./features/admin/CreateProject/ModalWrapper";
import SectionList from "./features/admin/AddSection/SectionList";

import { NotificationManager } from "./features/admin/Notification/NotificationManager";
import Program from "./features/admin/Project/Program";
import AccessControlPage from "./features/admin/ManagePermissions/AccessControlPage";

// 🔹 Auth & Dashboard Features
import Landingpage from "./features/landing/Landingpage";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/Signup";
import Dashboard from "./features/dashboard/Dashboard";

// 🔹 Contexts and Theme
import { PermissionsProvider } from "./context/PermissionsContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

// 🔹 Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Your custom MUI theme

// Importing pages/components
import QuizList from './features/quiz/QuizListing/QuizList';
import QuizCreation from './features/quiz/QuizCreation/QuizForm';
import QuizPage from './features/quiz/QuizAttending/AppContainer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <PermissionsProvider>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Landingpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Admin Routes */}
              <Route path="/notification" element={<NotificationManager />} />
              <Route path="/program" element={<Program />} />
              <Route path="/access" element={<AccessControlPage />} />
             

              
              {/* Optional Admin Components */}
            </Routes>

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
        <Routes>
          <Route path="/list" element={<QuizList />} />
          <Route path="/create" element={<QuizCreation />} />
          <Route path="/quizattend/:id" element={<QuizPage />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
