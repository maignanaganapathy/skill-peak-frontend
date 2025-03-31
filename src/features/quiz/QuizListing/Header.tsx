import React from "react";
import logo from "../../../assets/logo.svg"; // adjust the path if needed
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles'; // Import useTheme

export const QuizHeader = () => {
  const theme = useTheme(); // Get access to the Material UI theme

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, height: { xs: 64, md: 80, lg: 96 } }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        paddingX: { xs: 2, md: 4, lg: 6 },
      }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: { xs: 50, md: 64, lg: 76 },
            width: 'auto',
            marginRight: { xs: 1.5, md: 2, lg: 2.5 },
          }}
        />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', md: '1.875rem' },
            color: 'white', // Assuming white text on your primary color
            textAlign: 'center',
            flexGrow: 1,
          }}
        >
          QUIZ MANAGEMENT
        </Typography>
        <Box sx={{ width: 'auto' }} />
      </Toolbar>
    </AppBar>
  );
};