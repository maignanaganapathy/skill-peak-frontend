import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Your custom MUI theme
import ComingSoon from './ComingSoon';

// 🔹 Admin Features
import { NotificationManager } from "./features/admin/Notification/NotificationManager";
import Program from "./features/admin/Project/Program";
import AccessControlPage from "./features/admin/ManagePermissions/AccessControlPage";

// 🔹 Auth & Dashboard Features
import { LandingPage } from "./features/landing/Landingpage"; // Ensure the correct file casing
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/Signup";

// 🔹 Quiz Features
import QuizList from "./features/quiz/QuizListing/QuizList";
import QuizCreation from "./features/quiz/QuizCreation/QuizForm"; // Assuming QuizForm is the correct component
import QuizPage from "./features/quiz/QuizAttending/AppContainer";

// 🔹 Contact Feature
import ContactForm from "./features/contact/ContactForm";

// 🔹 Contexts and Toasts
import { PermissionsProvider } from "./context/PermissionsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./routes/ProtectedRoutes"; // Import ProtectedRoutes

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
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/comingsoon" element={<ComingSoon />} />
              {/* 🔹 Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/notification" element={<NotificationManager />} />
                <Route path="/dashboard" element={<Program />} />
                <Route path="/access" element={<AccessControlPage />} />
                <Route path="/projects/:projectId/roles" element={<AccessControlPage />} />
                <Route path="/quizzes" element={<QuizList />} />
                <Route path="/quiz/create" element={<QuizCreation />} />
                <Route path="/quiz/edit/:id" element={<QuizCreation />} />
                <Route path="/quizzes/:id" element={<QuizPage />} />
                {/* Add other protected routes here */}
              </Route>
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