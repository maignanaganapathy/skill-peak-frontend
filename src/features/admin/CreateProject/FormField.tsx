import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface FormFieldProps {
  label: string;
  icon?: string;
  altText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  icon,
  altText,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end">
            <img src={icon} alt={altText || ""} width={20} height={20} />
          </InputAdornment>
        ) : null,
      }}
    />
  );
};
