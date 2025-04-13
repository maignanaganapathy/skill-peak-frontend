import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TeamsList from './components/TeamList';
import Graph from './components/Graph';
import TeamScores from './components/TeamScores';
import TeamMembers from './components/TeamMembers';
import OverallGraph from './components/OverallGraph';
import { Team } from './interfaces/Team';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'; // Import the Navbar component
import { api, setAuthToken } from '../../..../../utils/axiosConfig';// Import your axiosConfig

const TeamDashboardPage: React.FC = () => {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const { projectId } = useParams<{ projectId?: string }>();
    const projectIdNumber = projectId ? parseInt(projectId, 10) : undefined;
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleTeamSelect = (team: Team) => {
        setSelectedTeam(team);
    };

     useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);
            try {
                // Set the authentication token before making the request
                setAuthToken();
                // Use your custom Axios instance (api) for the request
                const response = await api.get(`/teams/project/${projectIdNumber}`);
                if (response.status !== 200) { //  Use response.status
                    throw new Error(`Failed to fetch teams: ${response.status}`);
                }
                const data: Team[] = response.data;
                setTeams(data);
                // Select the first team by default.
                if (data && data.length > 0) {
                    setSelectedTeam(data[0]);
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching teams');
            } finally {
                setLoading(false);
            }
        };

        if (projectIdNumber) {
            fetchTeams();
        }
    }, [projectIdNumber]);

    if (!projectIdNumber) {
        return <Typography>Invalid or missing project ID.</Typography>;
    }

     if (loading) {
        return <Typography>Loading...</Typography>; // Or a more sophisticated loader
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const teamName = selectedTeam ? selectedTeam.name : '';
    const tagline = selectedTeam ? selectedTeam.tagline : '';

    const handleScoreBoardClick = () => {
      navigate(`/project/${projectIdNumber}/scoreboard`); // Navigate to the ScoreBoard page
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {/* Include the Navbar at the top and pass projectId */}
            <Navbar title={teamName}  tagline={tagline} projectId={projectIdNumber}/>

            <Box sx={{ display: 'flex', width: '100%', height: '100%', padding: 2 }}>
                {/* Sidebar: Teams List */}
                <Box
                    sx={{
                        width: '200px',
                        maxHeight: '100vh',
                        overflowY: 'auto',
                        borderRight: '1px solid #ccc',
                        paddingRight: 2,
                        mr: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
                        TEAMS
                    </Typography>
                    <TeamsList projectId={projectIdNumber} onTeamSelect={handleTeamSelect} selectedTeamId={selectedTeam?.id || null} />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 3, mt: 2 }}
                        onClick={handleScoreBoardClick} // Handle click to navigate
                    >
                        Score Board
                    </Button>
                </Box>

                {/* Main Content Area */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Top Section: Overall Graph, Team Scores, and Team Members */}
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                        {/* Overall Graph */}
                        <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 1, mr: 2, padding: 2 }}>
                            <OverallGraph projectId={projectIdNumber}/>
                        </Box>
                        {/* Team Scores (Conditional) */}
                        <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 1, mr: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ backgroundColor: '#A5C8E5', borderRadius: 3, width: '50%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', width: '100%' }}>
                                    TEAM SCORES
                                </Typography>
                            </Box>
                            {selectedTeam ? (
                                <TeamScores teamId={selectedTeam.id} />
                            ) : (
                                <Typography textAlign="center">Select a team to view their scores.</Typography>
                            )}
                        </Box>

                        {/* Team Members (Conditional) */}
                        <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 1, padding: 1 }}>
                            <TeamMembers team={selectedTeam} />
                        </Box>
                    </Box>

                    {/* Graph Section */}
                    <Box sx={{ width: '50%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom style={{ width: '100%', textAlign: 'center' }}>Team Scores Over Rounds</Typography>
                        <Box sx={{ height: 300, width: '100%' }}>
                            <Graph />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TeamDashboardPage;

