import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { DropdownArrow } from "./DropdownArrow";

interface FloatingLabelSelectProps {
  label: string;
  placeholder?: string; // Not used now
  value: string; // Add this line
  onChange: (event: SelectChangeEvent) => void; // Add this line
}

export const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  label,
  value,
  onChange, // Accept the onChange function as a prop
}) => {
  const getOptions = () => {
    if (label === "Section Type") {
      return [
        "Pre Assessment",
        "Mid Assessment",
        "Post Assessment",
        "Quiz",
        "Custom Quiz",
        "Custom Link",
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
        value={value} // Controlled input
        onChange={onChange} // Controlled onChange
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
