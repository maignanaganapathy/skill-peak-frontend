import React from "react";
import logo from "../../../../assets/logo.svg";
import { Button, Typography, Box } from "@mui/material"; // Import Box

interface Props {
  onSubmit: () => void;
}

export const QuizHeader: React.FC<Props> = ({ onSubmit }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-0 bg-[#3E7CB1] h-[91px] max-sm:h-[70px]">
      <Box display="flex" alignItems="center">
        <img
          src={logo}
          className="h-[76px] w-[116px] max-sm:w-20 max-sm:h-auto"
          alt="Logo"
        />
      </Box>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.875rem',
          '@media (max-width: 600px)': {
            fontSize: '1.5rem',
          },
        }}
      >
        QUIZ BUILDER
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        sx={{ mr: 3, fontWeight: 'bold' }}
      >
        Submit 
      </Button>
    </header>
  );
};