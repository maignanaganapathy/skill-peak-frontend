import React, { useState } from "react";
import { FormField } from "./FormField";
import { AddButton } from "./AddButton";

import Cookies from "js-cookie";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { api } from "../../../utils/axiosConfig"; // Import the configured api instance
import { BACKEND_URL } from "../../../config"; // Corrected import path

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

  const handleSubmit = async () => {
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
        <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <FormField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
                  },
                }}
              />
            </div>
          </LocalizationProvider>

          <AddButton onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default InputDesign;