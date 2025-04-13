import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from 'react-router-dom';

interface TeamDashboardCardProps {
    projectId: number;
    teamCount: number;
}

const TeamDashboardCard: React.FC<TeamDashboardCardProps> = ({ projectId, teamCount }) => {
    const navigate = useNavigate();
    const theme = useTheme();

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
                <Typography variant="body2" color="inherit">
                    {teamCount > 0 ? `Manage ${teamCount} teams and view scores` : 'No teams found'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TeamDashboardCard;