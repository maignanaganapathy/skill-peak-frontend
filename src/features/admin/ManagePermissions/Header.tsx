import React from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/program"); // Navigates to Project.tsx route
  };

  return (
    <header
      className="relative flex flex-col justify-center items-center px-6 w-full h-[88px] text-center"
      style={{ backgroundColor: "#1E4D92" }}
    >
      {/* Chevron Left IconButton */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 35 }} />
      </IconButton>

      <h1 className="text-3xl font-bold text-white max-md:text-3xl max-sm:text-2xl">
        SIEMENS SCHOLARSHIP PROGRAM
      </h1>

      <div className="flex gap-3 items-center text-sm text-white mt-1">
        <time dateTime="2025-05-15">15/05/2025</time>
        <span>|</span>
        <span>Chennai</span>
      </div>
    </header>
  );
};
