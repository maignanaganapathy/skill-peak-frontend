import React, { useState } from "react";
import { FormField } from "./FormField";
import { AddButton } from "./AddButton";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface InputDesignProps {
  onClose: () => void;
}

const InputDesign: React.FC<InputDesignProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAdd = () => {
    console.log("Add clicked");
    console.log("Selected Date:", selectedDate);
  };

  return (
    <div style={{ position: "relative" }}>
      <form>
        <FormField label="Name" />
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div style={{ marginTop: 16 }}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </div>
        </LocalizationProvider>
        
        <FormField label="Location" />

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <AddButton onClick={handleAdd} />
        </div>
      </form>
    </div>
  );
};

export default InputDesign;
