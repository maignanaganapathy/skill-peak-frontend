import React, { useState, useEffect } from "react";
import { Box, Typography, styled, BoxProps } from "@mui/material";
import { Team } from "../interfaces/Team";
import { api } from '../../../utils/axiosConfig'; // Import your API configuration

interface TeamsListProps {
    projectId: number;
    onTeamSelect: (selectedTeam: Team) => void;
    selectedTeamId: number | null; // Prop to track the currently selected team ID
}

// Define the props for the TeamItemBox component
interface TeamItemBoxProps extends BoxProps {
    isSelected?: boolean;
}

// Styled Box for each team
const TeamItemBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSelected', // Don't pass isSelected to the DOM
})<TeamItemBoxProps>(({ theme, isSelected }) => ({
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5, 0), // Adjust margin for vertical spacing
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ...(isSelected && {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    }),
    '&:hover': {
        backgroundColor: isSelected ? theme.palette.secondary.dark : theme.palette.grey[400],
    },
}));

const TeamsList: React.FC<TeamsListProps> = ({ projectId, onTeamSelect, selectedTeamId }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/teams/project/${projectId}`);
                setTeams(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Failed to fetch teams");
                setLoading(false);
            }
        };

        fetchTeams();
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box display="flex" flexDirection="column" gap={1} width="100%"> {/* Changed to column */}
            {teams.length > 0 ? (
                teams.map((team) => (
                    <TeamItemBox
                        key={team.id}
                        onClick={() => onTeamSelect(team)}
                        isSelected={team.id === selectedTeamId}
                        width="100%" // Make each box take full width
                    >
                        <Typography>{team.name}</Typography>
                    </TeamItemBox>
                ))
            ) : (
                <Typography>No teams found for this project.</Typography>
            )}
        </Box>
    );
};

export default TeamsList;