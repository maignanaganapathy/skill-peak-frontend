// SectionCard.tsx
import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddIcon from "@mui/icons-material/Add";
import { Section } from "./section";

interface SectionCardProps {
    section: Section;
    onDelete: () => void;
    onEdit: (section: Section) => void;
    onAddProgram: (sectionId: number) => void; // Renamed prop
}

const SectionCard: React.FC<SectionCardProps> = ({ section, onDelete, onEdit, onAddProgram }) => {
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
                    <IconButton color="default" onClick={() => onAddProgram(section.id)}> {/* Updated prop name */}
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default SectionCard;