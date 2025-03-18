import React from "react";
import { Button } from "@mui/material";

interface AddButtonProps {
  onClick?: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      sx={{
        backgroundColor: "#1E3A8A", // blue-900
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bold",
        width: 76,
        height: 33,
        fontSize: "0.75rem",
        borderRadius: "6px",
        "&:hover": {
          backgroundColor: "#1e40af", // hover effect
        },
      }}
    >
      Add
    </Button>
  );
};
