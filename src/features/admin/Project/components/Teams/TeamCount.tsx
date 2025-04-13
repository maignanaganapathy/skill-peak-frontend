import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material'; // Import Material UI components
import { api } from '../../../../../utils/axiosConfig';
import { Project } from '../../types/Project';
import TeamDashboardCard from '../TeamDashboardCard';

interface ProjectWithCount extends Project {
    _count: {
        teams: number;
    };
}

const ProjectListWithTeamCounts: React.FC = () => {
    const [projects, setProjects] = useState<ProjectWithCount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get<ProjectWithCount[]>('/projects');
                setProjects(response.data);
            } catch (error: any) {
                console.error("Error fetching projects:", error);
                setError("Failed to load projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Project Team Dashboards
            </Typography>
            {loading ? (
                <Typography>Loading projects...</Typography>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {projects.map((project) => (
                        <ListItem key={project.id} sx={{ padding: '8px 0' }}>
                            <TeamDashboardCard
                                projectId={project.id}
                                teamCount={project._count.teams}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default ProjectListWithTeamCounts;