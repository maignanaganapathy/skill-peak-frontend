import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { fetchScoreBoardData } from '../Services/api';

interface ScoreData {
    round: string;
    teamName: string;
    reasoning: string;
    scores: number;
}

const ScoreBoardTable: React.FC = () => {
    const [scoreData, setScoreData] = useState<ScoreData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { projectId } = useParams<{ projectId?: string }>();
    const projectIdNumber = projectId ? parseInt(projectId, 10) : undefined;

    useEffect(() => {
        const fetchScores = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!projectIdNumber) {
                    setError("Project ID is required to fetch scores.");
                    setLoading(false);
                    return;
                }
                const data = await fetchScoreBoardData(projectIdNumber);
                setScoreData(data);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching scores');
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [projectIdNumber]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
            <Navbar title="SCORE BOARD" />
            <Box sx={{ padding: 2 }}>
                <TableContainer component={Paper} sx={{ mb: 4, width: '70%', margin: '0 auto' }}> {/* Changed width to 80% */}
                    <Table sx={{ minWidth: 200 }}>
                        <TableHead sx={{ backgroundColor: '#A5C8E5' }}>
                            <TableRow>
                                <TableCell sx={{ width: '20%' }}>Round</TableCell>
                                <TableCell sx={{ width: '20%' }}>Team</TableCell>
                                <TableCell sx={{ width: '40%' }}>Reasoning</TableCell>
                                <TableCell sx={{ width: '20%' }}>Scores</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scoreData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.round}</TableCell>
                                    <TableCell>{row.teamName}</TableCell>
                                    <TableCell>{row.reasoning}</TableCell>
                                    <TableCell>{row.scores}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={scoreData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ScoreBoardTable;
