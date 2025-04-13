import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ComingSoon from "./ComingSoon";
import AnimatedCheckCircles from "./features/landing/Animation";
import ResetPassword from "./features/auth/pages/ResetPassword";

// Admin Features
import { NotificationManager } from "./features/admin/Notification/NotificationManager";
import Program from "./features/admin/Project/Program";
import AccessControlPage from "./features/admin/ManagePermissions/AccessControlPage";

// Auth & Dashboard Features
import { LandingPage } from "./features/landing/Landingpage";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/Signup";
import TeamDashboardPage from "./features/TeamDashboard/TeamDashboard";
import NotFoundPage from "./NotFoundPage"; // Import your NotFoundPage component

// Quiz Features
import QuizList from "./features/quiz/QuizListing/QuizList";
import QuizCreation from "./features/quiz/QuizCreation/QuizForm";
import QuizPage from "./features/quiz/QuizAttending/AppContainer";

// Contact Feature
import ContactForm from "./features/contact/ContactForm";

// Contexts and Toasts
import { PermissionsProvider } from "./context/PermissionsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ScoreBoard from "./features/TeamDashboard/components/ScoreBoardTable";
import QuizAttend from "./features/quiz/QuizAttend/components/QuizAttend";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <PermissionsProvider>
          <div className="flex flex-col min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contact" element={<ContactForm />} />
              {/* <Route path="/comingsoon" element={<ComingSoon />} /> */}
              {/* <Route path="/animation" element={<AnimatedCheckCircles />} /> */}

              {/* Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                {/* <Route path="/notification" element={<NotificationManager />} /> */}
                <Route path="/dashboard" element={<Program />} />
                {/* <Route path="/access" element={<AccessControlPage />} /> */}
                {/* <Route path="/projects/:projectId/roles" element={<AccessControlPage />} /> */}
                <Route path="/quizzes" element={<QuizList />} />
                <Route
                  path="/quiz/:sectionId/:quizId"
                  element={<QuizAttend />}
                />
                {/* <Route path="/quiz/create" element={<QuizCreation />} /> */}
                {/* <Route path="/quiz/edit/:id" element={<QuizCreation />} /> */}
                <Route path="/quizzes/:id" element={<QuizPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/project/:projectId/teams"
                  element={<TeamDashboardPage />}
                />
                {/* Add other protected routes here */}
                <Route
                  path="/project/:projectId/scoreboard"
                  element={<ScoreBoard />}
                />
              </Route>

              {/* Catch-all route for Page Not Found */}
              <Route path="*" element={<NotFoundPage />} />
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
