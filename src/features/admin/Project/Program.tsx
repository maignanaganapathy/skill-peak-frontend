import React, { useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ModalWrapper from "../CreateProject/ModalWrapper";
import axios from "../../../api/axiosInstance";
import SectionList from "../AddSection/SectionList"; // Import SectionList

export const Program: React.FC = () => {
    const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null); // Track which project is expanded
    const [projects, setProjects] = useState<any[]>([]);
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggle = (projectId: number) => {
        setExpandedProjectId(prevId => prevId === projectId ? null : projectId);
    };

    const handleManagePermissions = () => {
        navigate("/access");
    };

    const fetchProjects = async () => {
        try {
            const token = Cookies.get("token");

            if (!token) {
                console.error("Token missing");
                return;
            }

            const response = await axios.get("http://localhost:5000/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    React.useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId: string) => {
        try {
            const token = Cookies.get("token");

            if (!token) {
                console.error("Token missing");
                return;
            }

            await axios.delete(`http://localhost:5000/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <Box
            component="main"
            sx={{
                maxWidth: "730px",
                width: "100%",
                mx: "auto",
                p: 2.5,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: "#000",
                    }}
                >
                    Program Creation
                </Typography>

                {/* ✅ Pass refresh callback to ModalWrapper */}
                <ModalWrapper
                    onProjectCreated={fetchProjects}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    project={selectedProject}
                />

                <Button
                    onClick={() => {
                        setSelectedProject(null); // Reset to null for new project
                        setIsModalOpen(true); // Open modal
                    }}
                    sx={{
                        backgroundColor: "#A5C8E5",
                        color: "#000",
                        borderRadius: "15px",
                        textTransform: "none",
                        width: "100px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                    }}
                >
                    New +
                </Button>
            </Box>

            {/* ✅ Render Projects */}
            {projects.map((project) => (
                <Card
                    key={project.id}
                    sx={{
                        border: "2px solid",
                        borderColor: "grey.300",
                        borderRadius: 4,
                        mb: 2,
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            gap: 3,
                            alignItems: "flex-start",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                width: 82,
                                height: 80,
                                borderRadius: "50%",
                                border: "1px solid #1E4D92",
                                backgroundColor: "#f0f0f0",
                            }}
                        />

                        <Stack spacing={1} sx={{ flexGrow: 1, minHeight: 80 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {project.name}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {project.description}
                            </Typography>
                            <Typography variant="body2" fontWeight="medium">
                                {new Date(project.date).toLocaleDateString()}
                            </Typography>
                        </Stack>

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                right: 16,
                                display: "flex",
                                gap: 2.5,
                                alignItems: "center",
                            }}
                        >
                            <IconButton size="small" onClick={() => {
                                setSelectedProject(project);
                                setIsModalOpen(true);
                            }}>
                                <EditIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>

                            <IconButton size="small" onClick={() => handleDeleteProject(project.id)}>
                                <DeleteIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>

                            <IconButton size="small" onClick={handleManagePermissions}>
                                <ManageAccountsIcon sx={{ fontSize: 20, color: "#000" }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => handleToggle(project.id)} // Pass project ID to handleToggle
                                sx={{
                                    width: 25,
                                    height: 25,
                                    bgcolor: "primary.main",
                                    borderRadius: "50%",
                                    "&:hover": { bgcolor: "primary.dark" },
                                }}
                            >
                                <KeyboardArrowDownIcon
                                    sx={{
                                        fontSize: 27,
                                        color: "#fff",
                                        transform: expandedProjectId === project.id ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            {/* ✅ Render SectionList when the project is expanded */}
            {projects.map(project => (
                expandedProjectId === project.id && (
                    <Box mt={2} key={`section-list-${project.id}`}>
                        <SectionList projectId={project.id} />
                    </Box>
                )
            ))}
        </Box>
    );
};

export default Program;