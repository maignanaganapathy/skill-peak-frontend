"use client";
import { TextField } from "@mui/material";

interface FloatingLabelInputProps {
  label: string;
  isTextArea?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  isTextArea = false,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      multiline={isTextArea}
      rows={isTextArea ? 2 : 1}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: isTextArea ? "45px" : "36px",
          backgroundColor: "white",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.75rem",
          opacity: 0.6,
        },
      }}
    />
  );
};
