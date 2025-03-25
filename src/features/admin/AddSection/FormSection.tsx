import { Paper, Stack, Button, Box, Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import { FloatingLabelInput } from "./FloatingLabelInput";
import FloatingLabelSelect from "./FloatingLabelSelect";
import axios from "axios";
import Cookies from "js-cookie";
import { Section } from "./section";
interface FormSectionProps {
  isExpanded: boolean;
  onSectionCreated: (section: Section) => void;
  projectId: number;
  sectionToEdit?: Section; // Optional prop for the section being edited
  quizzes: any[]; // ADD THIS LINE - This is the crucial step!
}

export const FormSection = ({ isExpanded, onSectionCreated, projectId, sectionToEdit }: FormSectionProps) => {
    const [sectionName, setSectionName] = useState("");
    const [sectionType, setSectionType] = useState("");
    const [quizId, setQuizId] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (sectionToEdit) {
            setSectionName(sectionToEdit.sectionName);
            setSectionType(sectionToEdit.sectionType);
            setQuizId(sectionToEdit.quizId ? String(sectionToEdit.quizId) : "");
            setDescription(sectionToEdit.description || "");
        } else {
            setSectionName("");
            setSectionType("");
            setQuizId("");
            setDescription("");
        }
    }, [sectionToEdit]);

    const handleSubmit = async () => {
        try {
            const token = Cookies.get("token");

            if (!token) {
                console.error("No authentication token found.");
                alert("No authentication token found.");
                return;
            }

            if (!sectionName.trim() || !sectionType.trim()) {
                console.error("Validation failed: Section Name and Section Type are required.");
                alert("Section Name and Section Type are required.");
                return;
            }

            const payload: any = {
                sectionName: sectionName.trim(),
                description: description.trim() || undefined,
                projectId: projectId,
                sectionType: sectionType.trim(),
                linkUrl: "https://example.com",
                quizId:1 // You might want to allow editing this
            };

            

            console.log("Payload being sent:", payload);

            let response;
            if (sectionToEdit) {
                // Editing existing section - use PUT request
                response = await axios.put(`http://localhost:5000/sections/${sectionToEdit.id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
            } else {
                // Creating new section - use POST request
                response = await axios.post("http://localhost:5000/sections", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
            }

            console.log("API Response:", response.data);
            alert(`Section ${sectionToEdit ? 'updated' : 'created'} successfully!`);

            onSectionCreated(response.data); // Notify parent component

            setSectionName("");
            setSectionType("");
            setQuizId("");
            setDescription("");

        } catch (error: any) {
            if (error.response) {
                console.error("Server responded with:", error.response.status, error.response.data);
                alert(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error("Error creating/updating section:", error.message);
                alert("An unexpected error occurred.");
            }
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
                            {sectionToEdit ? 'Update' : 'Save'} {/* Change button text */}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Collapse>
    );
};