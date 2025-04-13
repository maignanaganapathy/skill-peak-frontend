import React from "react";
import { Box, Paper, Typography, Button, IconButton, Avatar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Section } from "./section";
import { api } from "../../../../../utils/axiosConfig";
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from "../../../../../config";
import { usePermissions } from "../../../../../context/PermissionsContext"; // Import usePermissions
import { Permissions } from "../../../../../constants/Permissions"; // Import Permissions enum

import PreAssessmentPng from './assets/pre.png';
import PostAssessmentPng from './assets/post.png';
import MidAssessmentPng from './assets/mid.png';

interface SectionCardProps {
    section: Section;
    onDelete: () => void;
    onEdit: (section: Section) => void;
    onAddProgram: (sectionId: number) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, onDelete, onEdit, onAddProgram }) => {
    const isQuizSection = ["Pre Assessment", "Post Assessment", "Mid Assessment"].includes(section.sectionType);
    const isCustomOrLinkSection = ["Custom Quiz", "Custom Link"].includes(section.sectionType);
    const navigate = useNavigate();
    const { checkHasPermission } = usePermissions(); // Access checkHasPermission

    const handleCheckLink = async () => {
        if (isQuizSection && section.quizId) {
                navigate(`/quizzes/${section.quizId}`);
        } else if (isCustomOrLinkSection) {
            // navigate('/empty-page');
            window.open(section.linkUrl, '_blank');
        } else {
            window.open(section.linkUrl, '_blank');
        }
    };

    let sectionIcon;
    const iconStyle = {
        width: '32px',
        height: '34px',
    };

    if (section.sectionType === "Pre Assessment") {
        sectionIcon = <Avatar src={PreAssessmentPng} style={iconStyle} variant="rounded" />;
    } else if (section.sectionType === "Post Assessment") {
        sectionIcon = <Avatar src={PostAssessmentPng} style={iconStyle} variant="rounded" />;
    } else if (section.sectionType === "Mid Assessment") {
        sectionIcon = <Avatar src={MidAssessmentPng} style={iconStyle} variant="rounded" />;
    } else {
        sectionIcon = <DescriptionIcon fontSize="large" />;
    }

          
    return (<Button fullWidth onClick={handleCheckLink} >
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
            <Box display="flex" alignItems="center" gap={2}>
                <Box
                    sx={{
                        backgroundColor: "#A9C6EC",
                        padding: 1.2,
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {sectionIcon}
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

            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>

                <Box display="flex" gap={2}>
                    {checkHasPermission(Permissions.EDIT_SECTION) && (
                        <IconButton color="default" onClick={() => onEdit(section)}>
                            <EditIcon />
                        </IconButton>
                    )}
                    {checkHasPermission(Permissions.DELETE_SECTION) && (
                        <IconButton color="default" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Paper>
        </Button>  
    );
};

export default SectionCard;