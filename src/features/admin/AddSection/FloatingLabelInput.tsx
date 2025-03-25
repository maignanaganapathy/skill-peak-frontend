import { TextField } from "@mui/material";

interface FloatingLabelInputProps {
  label: string;
  isTextArea?: boolean;
  value: string; // Add this line
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  isTextArea = false,
  value,
  onChange, // Accept the onChange function as a prop
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      size="small"
      multiline={isTextArea}
      minRows={isTextArea ? 3 : undefined}
      value={value} // Controlled input
      onChange={onChange} // Controlled onChange
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
export default FloatingLabelInput;
