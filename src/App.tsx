import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import global theme
import Landingpage from "./features/landing/Landingpage"; 



const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Landingpage />} />
            
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
