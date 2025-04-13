import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../utils/axiosConfig';
import { Project } from '../types/Project'; // Import the shared Project interface

interface TeamDashboardCardProps {
    projectId: number;
}

const TeamDashboardCard: React.FC<TeamDashboardCardProps> = ({ projectId }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [teamCount, setTeamCount] = useState<number>(0);

    const fetchProjectData = async () => {
        try {
            const response = await api.get<Project[]>('/projects');
            const currentProject = response.data.find(project => project.id === projectId);
            if (currentProject) {
                setTeamCount(currentProject._count.teams);
            } else {
                console.warn(`Project with ID ${projectId} not found in API response.`);
                setTeamCount(0);
            }
        } catch (error) {
            console.error("Error fetching project data:", error);
            setTeamCount(0);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, [projectId]);

    const handleNavigateToTeamDashboard = () => {
        if (teamCount > 0) {
            navigate(`/project/${projectId}/teams`);
        } else {
            navigate('/page-not-found');
        }
    };

    return (
        <Card
            onClick={handleNavigateToTeamDashboard}
            sx={{
                width: '100%',
                maxWidth: '730px',
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: theme.shadows[2],
                    backgroundColor: theme.palette.primary.main,
                },
            }}
        >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <Diversity3Icon />
                    <Typography variant="subtitle1" fontWeight="bold" color="inherit">
                        Team Dashboard
                    </Typography>
                </Box>
                
            </CardContent>
        </Card>
    );
};

export default TeamDashboardCard;