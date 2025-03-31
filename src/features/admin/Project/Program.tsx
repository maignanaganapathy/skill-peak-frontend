// Program.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Button,
  Skeleton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ModalWrapper from "../CreateProject/ModalWrapper";
import SectionList from "../AddSection/SectionList";
import { api } from "../../../utils/axiosConfig";
import { BACKEND_URL } from "../../../config";
import Navbar from "./Navbar";

export const Program: React.FC = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<any[]>([]); // State for all quizzes
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [quizFetchError, setQuizFetchError] = useState<string | null>(null);
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
      const response = await api.get(`${BACKEND_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchAllQuizzes = async () => {
    setLoadingQuizzes(true);
    setQuizFetchError(null);
    try {
      const response = await api.post(`${BACKEND_URL}/quiz/list`, {});
      const options = response.data.quizzes.map((quiz: any) => ({
        id: String(quiz.id),
        title: quiz.title,
      }));
      setAllQuizzes(options);
    } catch (error: any) {
      console.error("Error fetching quizzes:", error);
      setQuizFetchError(error.message || "Failed to fetch quizzes.");
      setAllQuizzes([]);
    } finally {
      setLoadingQuizzes(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchAllQuizzes(); // Fetch quizzes in Program
  }, []);

  const handleDeleteProject = async (projectId: string) => {
    try {
      await api.delete(`${BACKEND_URL}/projects/${projectId}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing cookies, local storage, etc.
    console.log('Logout clicked from Program');
    // After logout, you might want to redirect to the login page
    navigate('/login');
  };

  const getInitials = (name: string): string => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  };

  return (
    <Box>
      {/* Include the Navbar component */}
      <Navbar onLogout={handleLogout} />

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
            Programs
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

        {quizFetchError && (
          <Typography color="error" sx={{ mb: 2 }}>
            {quizFetchError}
          </Typography>
        )}

        {loadingQuizzes && (
          <Box sx={{ mb: 2 }}>
            <Skeleton />
          </Box>
        )}

        {/* Render Projects and their SectionLists */}
        {projects.map((project) => (
          <React.Fragment key={project.id}>
            <Card
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
                <Avatar
                  sx={{
                    width: 80, // Or 82, match the desired size
                    height: 80, // Or 82, match the desired size
                    borderRadius: "50%",
                    border: "1px solid #1E4D92",
                    backgroundColor: "#f0f0f0", // You can customize this
                    fontSize: "1.5rem", // Adjust font size as needed
                    fontWeight: 600,
                    color: "#333", // Adjust text color as needed
                  }}
                >
                  {getInitials(project.name)}
                </Avatar>

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
            {expandedProjectId === project.id && (
              <Box mt={2}>
                {/* ✅ Pass projects and allQuizzes as props */}
                <SectionList projectId={project.id} projects={projects} allQuizzes={allQuizzes} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Program;