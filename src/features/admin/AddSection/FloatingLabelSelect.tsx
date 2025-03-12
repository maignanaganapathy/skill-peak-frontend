"use client";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { DropdownArrow } from "./DropdownArrow";

interface FloatingLabelSelectProps {
  label: string;
  placeholder: string;
}

export const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  label,
  placeholder,
}) => {
  // Sample options based on the label type
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
    <FormControl fullWidth sx={{ minWidth: "162px" }}>
      <InputLabel sx={{ fontSize: "0.85rem", opacity: 0.9 }}>
        {label}
      </InputLabel>
      <Select
        label={label}
        displayEmpty
        IconComponent={DropdownArrow}
        sx={{
          height: "36px",
          backgroundColor: "white",
          "& .MuiSelect-select": {
            fontSize: "0.85rem",
            color: "Black",
            textAlign: "center",
            paddingLeft: "3px",
          },
          "& .MuiSelect-icon": {
            right: "8px",
          },
        }}
      >
        <MenuItem
          disabled
          value=""
          sx={{
            justifyContent: "left",
            color: "#000000",
          }}
        >
          {placeholder}
        </MenuItem>
        {getOptions().map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              fontSize: "0.85rem",
              color: "#000000",
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
