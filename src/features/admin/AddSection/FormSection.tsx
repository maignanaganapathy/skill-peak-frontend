"use client";
import { Paper, Stack, Button, Box, Collapse } from "@mui/material";
import { FloatingLabelInput } from "./FloatingLabelInput";
import  FloatingLabelSelect  from "./FloatingLabelSelect";

interface FormSectionProps {
  isExpanded: boolean;
}

export const FormSection = ({ isExpanded }: FormSectionProps) => {
  return (
    <Collapse in={isExpanded} timeout="auto">
      <Paper
        elevation={0}
        sx={{
          border: "2px solid",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          p: 2.5,
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2.5} flexWrap="wrap">
            <Box flexGrow={1} minWidth="162px">
              <FloatingLabelInput label="Section Name" />
            </Box>
            <Box flexGrow={1} minWidth="162px">
              <FloatingLabelSelect
                label="Section Type"
                placeholder="Section Type"
              />
            </Box>
            <Box flexGrow={1} minWidth="162px">
              <FloatingLabelSelect
                label="Select a Quiz"
                placeholder="Select a Quiz"
              />
            </Box>
          </Stack>
          <Stack spacing={1.5} >
  <FloatingLabelInput label="Description" isTextArea />
  
  <Button
    variant="contained"
    sx={{
      alignSelf: "center",
      height: "28px",
      width: "69px",
      fontSize: "0.75rem",
      fontWeight: "bold",
      backgroundColor: "#1a237e",
      borderRadius: "6px",
      "&:hover": {
        backgroundColor: "#0d1642",
      },
    }}
  >
    Save
  </Button>
</Stack>

        </Stack>
      </Paper>
    </Collapse>
  );
};
