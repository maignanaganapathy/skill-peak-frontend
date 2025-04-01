import React from "react";
import logo from "../../../assets/logo.svg"; // adjust the path if needed
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import the chevron left icon

export const QuizHeader = () => {
  const theme = useTheme(); // Get access to the Material UI theme
  const navigate = useNavigate(); // Initialize navigate

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home route
  };

  const handleBackClick = () => {
    navigate('/dashboard'); // Navigate to the /project route
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, height: { xs: 64, md: 80, lg: 96 } }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        paddingX: { xs: 2, md: 4, lg: 6 },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleBackClick}
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 1 }} // Add some margin to the right of the back button
          >
            <ChevronLeftIcon sx={{ fontSize: 40 }} /> {/* Increased size using fontSize */}
          </IconButton>
          <IconButton
            onClick={handleLogoClick}
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: { xs: 1.5, md: 2, lg: 2.5 } }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: { xs: 50, md: 64, lg: 76 },
                width: 'auto',
              }}
            />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', md: '1.875rem' },
            color: 'white',
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