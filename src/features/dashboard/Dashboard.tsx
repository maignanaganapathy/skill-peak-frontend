import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600}>
        Welcome to your User Dashboard!
      </Typography>
      <Typography mt={2}>
        You’ve successfully logged in. This is your dashboard page.
      </Typography>
    </Box>
  );
};

export default Dashboard;
