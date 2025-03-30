import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Section } from "./section";
import { api } from "../../../utils/axiosConfig"; // Import the configured api instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { BACKEND_URL } from "../../../config"; // Import BACKEND_URL

interface SectionCardProps {
    section: Section;
    onDelete: () => void;
    onEdit: (section: Section) => void;
    onAddProgram: (sectionId: number) => void; // Renamed prop
}

const SectionCard: React.FC<SectionCardProps> = ({ section, onDelete, onEdit, onAddProgram }) => {
    const isQuizSection = ["Pre Assessment", "Post Assessment", "Mid Assessment", "Quiz"].includes(section.sectionType);
    const isCustomOrLinkSection = ["Custom Quiz", "Custom Link"].includes(section.sectionType);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCheckLink = async () => {
        if (isQuizSection && section.quizId) {
            try {
                const response = await api.post(
                    `${BACKEND_URL}/quiz/${section.quizId}/attend`,
                    { sectionId: section.id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                // Handle the response if needed (e.g., show a success message)
                console.log("Quiz Attend Response:", response.data);
                navigate(`/quiz/${section.quizId}/attend`);
            } catch (error: any) {
                console.error("Error attending quiz:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Authorization failed.");
                    // Handle unauthorized access (the api instance should already be handling token refresh/redirection)
                } else {
                    // Handle other errors
                }
            }
        } else if (isCustomOrLinkSection) {
            navigate('/empty-page');
        } else {
            window.open(section.linkUrl, '_blank');
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: "#dbe9f5",
                borderRadius: 2,
                maxWidth: "730px",
                width: "100%",
            }}
        >
            {/* Left Section: Icon and Text */}
            <Box display="flex" alignItems="center" gap={2}>
                <Box
                    sx={{
                        backgroundColor: "#A9C6EC",
                        padding: 1.2,
                        borderRadius: 2,
                        display: "flex",
                    }}
                >
                    <DescriptionIcon fontSize="large" />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        {section.sectionName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {section.description}
                    </Typography>
                </Box>
            </Box>

            {/* Right Section: Button and Actions (Stacked) */}
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<OpenInNewIcon />}
                    sx={{ width: "130px", fontSize: "11px" }}
                    onClick={handleCheckLink} // Use the dynamic handler
                    disabled={(isQuizSection && !section.quizId) || isCustomOrLinkSection} // Disable if it's a quiz or custom/link section
                >
                    Check link
                </Button>

                {/* Second row: Icons */}
                <Box display="flex" gap={2}>
                    <IconButton color="default" onClick={() => onEdit(section)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="default" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default SectionCard;