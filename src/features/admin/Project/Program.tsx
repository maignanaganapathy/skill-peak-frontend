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
import { usePermissions } from "../../../context/PermissionsContext"; // Import usePermissions
import { Permissions } from "../../../constants/Permissions"; // Import Permissions enum

interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  createdAt: string;
  createdById: number;
  updatedAt: string;
  updatedById: number;
  sections: any[];
  createdBy: { id: number; email: string };
  updatedBy: { id: number; email: string };
}

export const Program: React.FC = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<any[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [quizFetchError, setQuizFetchError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { checkHasPermission } = usePermissions(); // Access checkHasPermission

  const handleToggle = (projectId: number) => {
    setExpandedProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleManagePermissions = (projectId: number) => {
    navigate(`/projects/${projectId}/roles`);
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get(`${BACKEND_URL}/projects`);
      setProjects(response.data);
      console.log("Projects fetched after potential section delete:", response.data);
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
    fetchAllQuizzes();
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
    console.log('Logout clicked from Program');
    navigate('/login');
  };

  const getInitials = (name: string): string => {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join('');
    return initials;
  };

  return (
    <Box>
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

          <ModalWrapper
            onProjectCreated={fetchProjects}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            project={selectedProject}
          />

          <Button
            onClick={() => {
              setSelectedProject(null);
              setIsModalOpen(true);
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
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "1px solid #1E4D92",
                    backgroundColor: "#f0f0f0",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#333",
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
                  {checkHasPermission(Permissions.EDIT_PROJECT) && (
                    <IconButton size="small" onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}>
                      <EditIcon sx={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                  )}

                  {checkHasPermission(Permissions.DELETE_PROJECT) && (
                    <IconButton size="small" onClick={() => handleDeleteProject(String(project.id))}>
                      <DeleteIcon sx={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                  )}

                  <IconButton size="small" component="button" onClick={() => handleManagePermissions(project.id)}>
                    <ManageAccountsIcon sx={{ fontSize: 20, color: "#000" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleToggle(project.id)}
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
                <SectionList
                  projectId={project.id}
                  projects={projects}
                  allQuizzes={allQuizzes}
                  onProjectsUpdated={setProjects}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default Program;