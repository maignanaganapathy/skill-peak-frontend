import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { fetchOverallTeamScores } from '../Services/api';

interface TeamScoreData {
    teamId: number;
    teamName: string;
    totalScore: number;
}

interface OverallGraphProps {
    projectId: number; // Add projectId prop
}

const OverallGraph: React.FC<OverallGraphProps> = ({ projectId }) => { // Destructure projectId
    const [data, setData] = useState<TeamScoreData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [leadingIndex, setLeadingIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchTeamScores = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedData = await fetchOverallTeamScores(projectId); // Use projectId
                setData(fetchedData);

                if (fetchedData && fetchedData.length > 0) {
                    let maxScore = -Infinity;
                    let maxIndex = 0;
                    fetchedData.forEach((team, index) => {
                        if (team.totalScore > maxScore) {
                            maxScore = team.totalScore;
                            maxIndex = index;
                        }
                    });
                    setLeadingIndex(maxIndex);
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamScores();
    }, [projectId]); // Add projectId to dependency array

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box height={300} display="flex" alignItems="center" justifyContent="center">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box height={300} display="flex" alignItems="center" justifyContent="center">
                <Typography>No team scores available for this project.</Typography>
            </Box>
        );
    }
    const leadingColor = leadingIndex !== null ? '#1E4D92' : '#A5C8E5';


    return (
        <Box sx={{ width: '100%', height: 300 }}>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="teamName" />
                    <YAxis />
                    <Tooltip />
                    {/* Removed Legend */}
                    <Bar
                        dataKey="totalScore"
                        fill={leadingColor}
                        stroke={leadingColor}
                        barSize={30}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default OverallGraph;
