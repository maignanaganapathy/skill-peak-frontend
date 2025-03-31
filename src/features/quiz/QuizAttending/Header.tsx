import React from "react";
import { Box, Typography, Button } from "@mui/material";
import logo from "./assets/logo.svg";
import { useTheme } from '@mui/material/styles'; // Import useTheme

interface HeaderProps {
  showSubmit?: boolean;
  isComplete?: boolean;
  onSubmit?: () => void;
  isScoreView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showSubmit = true,
  isComplete = false,
  onSubmit,
  isScoreView = false,
}) => {
  const theme = useTheme(); // Get access to the Material UI theme

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2.5, md: 10 },
        py: 0,
        width: "100%",
        height: { xs: 80, sm: 80 }, // Match previous Navbar height
        backgroundColor: theme.palette.primary.main, // Match previous Navbar background color
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          height: { xs: 50, sm: 64 },
          width: { xs: 70, sm: 89 },
          objectFit: "contain",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1rem", sm: "1.25rem" },
          color: "white", // Assuming you want white text on the primary background
          position: isScoreView ? "absolute" : "static",
          left: isScoreView ? "50%" : undefined,
          transform: isScoreView ? "translateX(-50%)" : undefined,
        }}
      >
        PRE TRAINING ASSESSMENT
      </Typography>

      {showSubmit && (
        <Button
          onClick={onSubmit}
          disabled={!isComplete}
          variant="contained"
          sx={{
            height: { xs: 32, sm: 36 },
            width: { xs: 90, sm: 106 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            fontWeight: 800,
            borderRadius: "12px",
            bgcolor: isComplete ? theme.palette.secondary.main : "grey.400", // Use secondary for submit
            "&:hover": {
              bgcolor: isComplete ? theme.palette.secondary.dark : "grey.400",
            },
          }}
          title={
            !isComplete
              ? "Please answer all questions before submitting"
              : "Submit assessment"
          }
        >
          SUBMIT
        </Button>
      )}
    </Box>
  );
};