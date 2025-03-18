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
      size="small"
      multiline={isTextArea}
      minRows={isTextArea ? 3 : undefined}
      sx={{
        backgroundColor: "white",
        fontSize: "0.875rem",
        "& .MuiInputBase-input": {
          padding: "10px",
        },
      }}
    />
  );
};
