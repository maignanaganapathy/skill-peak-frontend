import React from "react";
import logo from "../../../../assets/logo.svg";
import { Button } from "@mui/material";

interface Props {
  onSubmit: () => void;
}

export const QuizHeader: React.FC<Props> = ({ onSubmit }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-0 bg-[#3E7CB1] h-[91px] max-sm:h-[70px]">
      <div className="flex items-center">
        <img
          src={logo}
          className="h-[76px] w-[116px] max-sm:w-20 max-sm:h-auto"
          alt="Logo"
        />
        <h1 className="ml-8 text-3xl font-bold text-white max-sm:text-2xl">
          QUIZ CREATION
        </h1>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={onSubmit}
        sx={{ mr: 2 }}
      >
        Submit Quiz
      </Button>
    </header>
  );
};
