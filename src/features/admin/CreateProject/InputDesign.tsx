import React from "react";
import { FormField } from "./FormField";

import { AddButton } from "./AddButton";

interface InputDesignProps {
  onClose: () => void;
}

const InputDesign: React.FC<InputDesignProps> = ({ onClose }) => {
  const handleAdd = () => {
    console.log("Add clicked");
  };

  return (
    <div style={{ position: "relative" }}>
      
      <form>
        <FormField label="Name" />
        <FormField
          label="Date"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b844fc4ac1f3ee9f716a95276ba1a691399c30e7"
          altText="Calendar"
        />
        <FormField label="Location" />
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <AddButton onClick={handleAdd} />
        </div>
      </form>
    </div>
  );
};

export default InputDesign;
