import React from "react";
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}


const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  fullWidth = true,
  variant = "contained",
  disabled = false,
}) => {
  return (
    <MuiButton
      type={type}
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{
        mt: 2,
        textTransform: "none",
        fontWeight: 600,
        backgroundColor: "primary.main",
        color: "#fff",
        '&:hover': {
          backgroundColor: "secondary.main",
        },
        borderRadius: "8px",
        py: 1.5,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
