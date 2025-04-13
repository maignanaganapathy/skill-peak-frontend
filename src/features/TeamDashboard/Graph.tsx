import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { fetchProjectRoundsData, fetchTeamData } from './Services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TeamScore {
    teamName: string;
    score: number;
}

interface TeamData {
    id: number;
    name: string;
    projectId: number;
    tagline?: string;
    metaData?: any;
}

interface RoundData {
    id: number;
    roundName: string;
    projectId: number;
    teamScores: { teamId: number; score: number }[];
}

const Graph: React.FC = () => {
    const { projectId: projectIdParam } = useParams<{ projectId?: string }>();
    const projectId = projectIdParam ? parseInt(projectIdParam, 10) : undefined;

    const [roundsData, setRoundsData] = useState<RoundData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [teamNameMap, setTeamNameMap] = useState<{ [teamId: number]: string }>({});

    useEffect(() => {
        if (projectId === undefined || isNaN(projectId)) {
            setError('Invalid or missing project ID in the URL.');
            setLoading(false);
            return;
        }

        const loadGraphData = async () => {
            setLoading(true);
            setError(null);
            try {
                const rounds: RoundData[] = await fetchProjectRoundsData(projectId);
                setRoundsData(rounds);

                const allTeamIds = rounds.reduce((acc: number[], round) => {
                    const teamIdsInRound = round.teamScores.map(ts => ts.teamId);
                    return [...acc, ...teamIdsInRound];
                }, []);
                const uniqueTeamIds = [...new Set(allTeamIds)];

                const teamsPromises = uniqueTeamIds.map(teamId => fetchTeamData(teamId));
                const teams: TeamData[] = await Promise.all(teamsPromises);

                const newTeamNameMap: { [teamId: number]: string } = {};
                teams.forEach(team => {
                    if (team && team.id && team.name) {
                        newTeamNameMap[team.id] = team.name;
                    }
                });
                setTeamNameMap(newTeamNameMap);

                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch data');
                setLoading(false);
            }
        };

        loadGraphData();
    }, [projectId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '20px' }}>
            {roundsData.map((round) => {
                let leadingScore = -Infinity;
                let leadingIndex = -1;

                const formattedTeamScores: TeamScore[] = round.teamScores.map((ts: any, index) => {
                    const teamName = teamNameMap[ts.teamId] || `Team ${ts.teamId}`;
                    if (ts.score > leadingScore) {
                        leadingScore = ts.score;
                        leadingIndex = index;
                    }
                    return { teamName, score: ts.score };
                });

                const chartData = {
                    labels: formattedTeamScores.map((team) => team.teamName),
                    datasets: [
                        {
                            label: `${round.roundName} Scores`,
                            data: formattedTeamScores.map((team) => team.score),
                            backgroundColor: formattedTeamScores.map((_, index) => (index === leadingIndex ? '#1E4D92' : '#A5C8E5')),
                            borderColor: formattedTeamScores.map((_, index) => (index === leadingIndex ? '#1E4D92' : '#A5C8E5')),
                            borderWidth: 1,
                            barThickness: 15,
                        },
                    ],
                };

                const chartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: `${round.roundName} Scores`,
                        },
                    },
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Score',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Team',
                            },
                        },
                    },
                };

                return (
                    <Paper key={round.id} style={{ width: '30%', height: '300px', padding: '16px' }}>
                        <Bar data={chartData} options={chartOptions} />
                    </Paper>
                );
            })}
        </div>
    );
};

export default Graph;