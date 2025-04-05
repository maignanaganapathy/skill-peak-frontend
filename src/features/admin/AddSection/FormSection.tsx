import {
  Paper,
  Stack,
  Button,
  Box,
  Collapse,
} from "@mui/material";
import React, { useState, forwardRef, Ref } from "react";
import { FloatingLabelInput } from "./FloatingLabelInput";
import FloatingLabelSelect from "./FloatingLabelSelect"; // Keep this import
import { Section } from "./section";
import { api } from "../../../utils/axiosConfig"; // Import the configured api instance
import { BACKEND_URL } from "../../../config"; // Import BACKEND_URL

export interface FormSectionProps {
  isExpanded: boolean;
  onSectionCreated: (section: Section) => void;
  projectId: number;
  sectionToEdit?: Section;
  quizzes: any[];

}

// Explicitly define the component type with forwardRef
export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>((
  { isExpanded, onSectionCreated, projectId, sectionToEdit, quizzes },
  ref
) => {
  const [sectionName, setSectionName] = useState(sectionToEdit?.sectionName || "");
  const [sectionType, setSectionType] = useState(sectionToEdit?.sectionType || "");
  const [quizId, setQuizId] = useState(sectionToEdit?.quizId ? String(sectionToEdit.quizId) : "");
  const [description, setDescription] = useState(sectionToEdit?.description || "");

  const handleSubmit = async () => {
    try {
      if (!sectionName.trim() || !sectionType.trim()) {
        console.error(
          "Validation failed: Section Name and Section Type are required."
        );
        return;
      }

      const payload: any = {
        sectionName: sectionName.trim(),
        description: description.trim() || undefined,
        projectId: projectId,
        sectionType: sectionType.trim(),
        linkUrl: "https://example.com",
        quizId: quizId ? Number(quizId) : null,
      };

      console.log("Payload being sent:", payload);

      let response;
      if (sectionToEdit) {
        response = await api.put(
          `${BACKEND_URL}/sections/${sectionToEdit.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await api.post(`${BACKEND_URL}/sections`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      console.log("API Response:", response.data);
      onSectionCreated(response.data); // This is where the callback happens

      setSectionName("");
      setSectionType("");
      setQuizId("");
      setDescription("");
    } catch (error: any) {
      console.error("Error creating/updating section:", error);
    }
  };

  return (
    <Collapse in={isExpanded} timeout="auto">
      <Paper
        elevation={0}
        sx={{
          border: "2px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "16px",
          p: 2.5,
          maxWidth: "730px",
          width: "100%",
          mx: "auto",
        }}
        ref={ref}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2.5} flexWrap="wrap">
            <Box flexGrow={1} minWidth="162px">
              <FloatingLabelInput
                label="Section Name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </Box>
            <Box flexGrow={1} minWidth="162px">
              <FloatingLabelSelect
                label="Section Type"
                placeholder="Section Type"
                value={sectionType}
                onChange={(e) => setSectionType(e.target.value)}
              />
            </Box>
            <Box flexGrow={1} minWidth="162px">
              <FloatingLabelSelect
                label="Select a Quiz"
                placeholder="Select a Quiz"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                options={quizzes.map((quiz: any) => ({
                  id: String(quiz.id),
                  title: quiz.title,
                }))}
              />
            </Box>
          </Stack>
          <Stack spacing={1.5}>
            <FloatingLabelInput
              label="Description"
              isTextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                "&:hover": { backgroundColor: "#0d1642" },
              }}
              onClick={handleSubmit}
            >
              {sectionToEdit ? "Update" : "Save"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Collapse>
  );
});

export default FormSection;