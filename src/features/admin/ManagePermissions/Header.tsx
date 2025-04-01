import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../utils/axiosConfig";
import { BACKEND_URL } from "../../../config";
import { useEffect, useState } from "react";

interface Project {
    id: number;
    name: string; // Changed 'title' to 'name' to match your data
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

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            setLoading(true);
            setError(null);
            setProject(null); // Reset project data when projectId changes
            try {
                if (projectId) {
                    const response = await api.get(`${BACKEND_URL}/projects/${projectId}`);
                    setProject(response.data);
                }
            } catch (err: any) {
                console.error("Error fetching project details:", err);
                setError(err.message || "Failed to fetch project details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]); // Add projectId to the dependency array

    const handleGoBack = () => {
        navigate("/dashboard");
    };

    if (loading) {
        return (
            <AppBar position="static" sx={{ backgroundColor: 'primary.main', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Toolbar sx={{ minHeight: '80px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={handleGoBack} color="inherit" aria-label="go back" sx={{ ml: 2 }}>
                        <ChevronLeftIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>
                        Loading Project...
                    </Typography>
                    <Box sx={{ width: 60 }} />
                </Toolbar>
            </AppBar>
        );
    }

    if (error) {
        return (
            <AppBar position="static" sx={{ backgroundColor: 'primary.main', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Toolbar sx={{ minHeight: '80px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={handleGoBack} color="inherit" aria-label="go back" sx={{ ml: 2 }}>
                        <ChevronLeftIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}>
                        Error: {error}
                    </Typography>
                    <Box sx={{ width: 60 }} />
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Toolbar sx={{ minHeight: '80px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Chevron Left IconButton on the left */}
                <IconButton
                    onClick={handleGoBack}
                    color="inherit"
                    aria-label="go back"
                    sx={{ ml: 2 }}
                >
                    <ChevronLeftIcon sx={{ fontSize: 35 }} />
                </IconButton>

                {/* Centered Title based on project data */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white' }}
                    >
                        {project?.name || "Project Details"} {/* Display project name */}
                    </Typography>
                    {project && (
                        <div className="flex gap-3 items-center text-sm text-white mt-1">
                            <time dateTime={project.date}>{new Date(project.date).toLocaleDateString()}</time>
                            <span>|</span>
                            <span>
                                {/* Replace with actual location data if available in the project object */}
                                {/* For example: project.location || 'Unknown Location' */}
                                Chennai {/* Hardcoded as per original, replace if project has location */}
                            </span>
                        </div>
                    )}
                </Box>

                {/* Empty Box on the right to balance */}
                <Box sx={{ width: 60 }} />
            </Toolbar>
        </AppBar>
    );
};