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
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options?: { id: string; title: string }[]; // Add the optional options prop
}

export const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  label,
  value,
  onChange,
  options, // Destructure the options prop
}) => {
  const getStaticOptions = () => {
      if (label === "Section Type") {
          return [
              "Pre Assessment",
              "Mid Assessment",
              "Post Assessment",
              "CertificateLink",
              "Custom Quiz",
              "Custom Link",
          ];
      }
      return [];
  };

  // Determine which options to use
  const selectOptions = label === "Select a Quiz" && options ? options : getStaticOptions();

  return (
      <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>{label}</InputLabel>
          <Select
              value={value}
              onChange={onChange}
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
              {selectOptions.map((option) => (
                  <MenuItem key={typeof option === 'object' ? option.id : option} value={typeof option === 'object' ? option.id : option}>
                      {typeof option === 'object' ? option.title : option}
                  </MenuItem>
              ))}
          </Select>
      </FormControl>
  );
};
export default FloatingLabelSelect;