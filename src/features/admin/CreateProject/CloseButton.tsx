import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps {
  onClick?: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 17,
        right: 9,
      }}
      aria-label="close"
    >
      <CloseIcon sx={{ color: "#3E7CB1" }} />
    </IconButton>
  );
};