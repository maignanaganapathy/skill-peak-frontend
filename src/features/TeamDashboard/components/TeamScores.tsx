import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    styled,
} from '@mui/material';
import { fetchProjectRoundsData } from '../Services/api'; // Assuming this path is correct
import { Round } from '../interfaces/Team'; // Assuming your Team interface file also exports Round

interface TeamScoresProps {
    teamId: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.grey[300],
    '&:not(:last-child)': { // Add border to all cells except the last one
        borderRight: `1px solid ${theme.palette.common.black}`,
    },
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.grey[300],
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:not(:last-child)': { // Add border to all header cells except the last one
        borderRight: `1px solid ${theme.palette.common.black}`,
    },
}));

const TeamScores: React.FC<TeamScoresProps> = ({ teamId }) => {
    const { projectId: projectIdParam } = useParams<{ projectId?: string }>();
    const projectId = projectIdParam ? parseInt(projectIdParam, 10) : undefined;
    const [roundsData, setRoundsData] = useState<Round[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!projectId) {
            setError('Invalid or missing project ID.');
            setLoading(false);
            return;
        }

        const fetchScoresForProject = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchProjectRoundsData(projectId);
                setRoundsData(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch round scores.');
                setLoading(false);
            }
        };

        fetchScoresForProject();
    }, [projectId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    // Filter rounds to get the score for the specific team
    const teamRoundScores = roundsData.map(round => {
        const teamScoreEntry = round.teamScores.find(ts => ts.teamId === teamId);
        return {
            roundName: round.roundName,
            score: teamScoreEntry ? teamScoreEntry.score : '-',
        };
    });

    return (
        <Paper sx={{ mt: 2, width: '50%', overflow: 'auto' }}>
            <TableContainer>
                <Table aria-label="team scores table">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeaderCell>ROUND</StyledTableHeaderCell>
                            <StyledTableHeaderCell align="right">SCORE</StyledTableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamRoundScores.map((item, index) => (
                            <TableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {item.roundName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.score}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TeamScores;