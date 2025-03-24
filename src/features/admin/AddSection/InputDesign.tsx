
import { useState } from "react";
import { Stack } from "@mui/material";
import { AddSectionButton } from "./AddSectionButton";
import { FormSection } from "./FormSection";

function InputDesign() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Stack spacing={2.5}>
      <AddSectionButton isExpanded={isExpanded} onToggle={handleToggle} />
      <FormSection isExpanded={isExpanded} />
    </Stack>
  );
}

export default InputDesign;
