import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import pageNotFound from "./assets/pagenotfound.png";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: theme.spacing(4),
        textAlign: "center",
      }}
    >
      <img src={pageNotFound} alt="Page Not Found" style={{ width: "200px" }} />
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Oops! Page Not Found
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        We're sorry, but the page you requested could not be found.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Back to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
