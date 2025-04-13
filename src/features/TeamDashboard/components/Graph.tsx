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
import { fetchProjectRoundsData, fetchProjectTeamsData } from '../Services/api'; // Assuming you create this API call
import { Team, Round } from '../interfaces/Team';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TeamScore {
    teamName: string;
    score: number;
}

const Graph: React.FC = () => {
    const { projectId: projectIdParam } = useParams<{ projectId?: string }>();
    const projectId = projectIdParam ? parseInt(projectIdParam, 10) : undefined;

    const [roundsData, setRoundsData] = useState<Round[]>([]);
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
                const rounds: Round[] = await fetchProjectRoundsData(projectId);
                setRoundsData(rounds);

                const teams: Team[] = await fetchProjectTeamsData(projectId); // Fetch all teams for the project
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {roundsData.map((round, index) => {
                let leadingScore = -Infinity;
                let leadingIndex = -1;

                const formattedTeamScores: TeamScore[] = round.teamScores.map((ts: any, mapIndex) => {
                    const teamName = teamNameMap[ts.teamId] || `Team ${ts.teamId}`;
                    if (ts.score > leadingScore) {
                        leadingScore = ts.score;
                        leadingIndex = mapIndex;
                    }
                    return { teamName, score: ts.score };
                });

                const chartData = {
                    labels: formattedTeamScores.map((team) => team.teamName),
                    datasets: [
                        {
                            data: formattedTeamScores.map((team) => team.score),
                            backgroundColor: formattedTeamScores.map((_, barIndex) => (barIndex === leadingIndex ? '#1E4D92' : '#A5C8E5')),
                            borderColor: formattedTeamScores.map((_, barIndex) => (barIndex === leadingIndex ? '#1E4D92' : '#A5C8E5')),
                            borderWidth: 1,
                            barThickness: 15,
                        },
                    ],
                };

                const chartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
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
                    <Paper
                        key={round.id}
                        style={{
                            width: '100%',
                            height: '300px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                        }}
                    >
                        <div style={{ textAlign: 'left', width: '100%', paddingTop: '30px', marginBottom: '10px' }}>
                            ROUND-{index + 1}
                            <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{round.roundName}</div>
                        </div>
                        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Left Spacer */}
                            <div style={{ flex: 1 }} />
                            {/* Graph Container */}
                            <div style={{ flex: 3, height: '100%' }}>
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                            {/* Right Spacer */}
                            <div style={{ flex: 1 }} />
                        </div>
                    </Paper>
                );
            })}
        </div>
    );
};

export default Graph;