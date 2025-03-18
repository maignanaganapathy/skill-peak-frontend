import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { DropdownArrow } from "./DropdownArrow";
import { useState } from "react";

interface FloatingLabelSelectProps {
  label: string;
  placeholder: string; // not used now
}

export const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  label,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  const getOptions = () => {
    if (label === "Section Type") {
      return [
        "Introduction",
        "Theory",
        "Practice",
        "Assessment",
        "Summary",
        "Case Study",
        "Exercise",
        "Review",
      ];
    }
    if (label === "Select a Quiz") {
      return [
        "Basic JavaScript Quiz",
        "React Fundamentals",
        "CSS Layout Quiz",
        "HTML Basics",
        "TypeScript Introduction",
        "Web Security Quiz",
        "Database Concepts",
        "API Design Quiz",
      ];
    }
    return [];
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label={label}
        input={<OutlinedInput label={label} />}
        IconComponent={DropdownArrow}
        sx={{
          backgroundColor: "white",
          fontSize: "0.875rem",
          "& .MuiSelect-select": {
            padding: "10px",
          },
        }}
      >
        {getOptions().map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default FloatingLabelSelect;

