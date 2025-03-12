"use client";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { AddSectionButton } from "./AddSectionButton";
import { FormSection } from "./FormSection";

function InputDesign() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box
      component="main"
      sx={{
        maxWidth: "830px",
        width: "100%",
        mx: "auto",
        p: 2.5,
      }}
    >
      <Stack spacing={2.5}>
        <AddSectionButton isExpanded={isExpanded} onToggle={handleToggle} />
        <FormSection isExpanded={isExpanded} />
      </Stack>
    </Box>
  );
}

export default InputDesign;
