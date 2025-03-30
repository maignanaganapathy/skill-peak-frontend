import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { AddButton } from "./AddButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { api } from "../../../utils/axiosConfig"; // Import the configured api instance
import { BACKEND_URL } from "../../../config"; // Corrected import path

interface FormFieldProps {
  label: string;
  icon?: string;
  altText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  icon,
  altText,
  value,
  onChange,
  required,
  error,
  helperText,
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
      required={required}
      error={error}
      helperText={helperText}
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

interface InputDesignProps {
  onProjectCreated: () => void;
  onClose: () => void;
  project?: any;
}

const InputDesign: React.FC<InputDesignProps> = ({
  onClose,
  project,
  onProjectCreated,
}) => {
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [date, setDate] = useState<Date | null>(project?.date ? new Date(project.date) : null);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleSubmit = async () => {
    setNameError(!name);
    setDescriptionError(!description);
    setDateError(!date);

    if (!name || !description || !date) {
      return;
    }

    try {
      const payload = {
        name,
        description,
        date: date ? date.toISOString() : null, // Ensure date format is correct
      };

      if (project?.id) {
        // Edit Mode – PUT request
        await api.put(`${BACKEND_URL}/projects/${project.id}`, payload);
      } else {
        // Create Mode – POST request
        await api.post(`${BACKEND_URL}/projects`, payload);
      }

      onProjectCreated();
      onClose();
    } catch (err) {
      console.error("Error saving project", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form>
        <FormField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={nameError}
          helperText={nameError ? "Name is required" : ""}
        />
        <FormField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          error={descriptionError}
          helperText={descriptionError ? "Description is required" : ""}
        />
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ marginTop: 16 }}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: dateError,
                    helperText: dateError ? "Date is required" : "",
                  },
                }}
              />
            </div>
          </LocalizationProvider>

          <div style={{ marginTop: 24 }}> {/* Add top margin above AddButton */}
            <AddButton onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputDesign;