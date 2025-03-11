// QuizListPage.js
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const quizData = [
  {
    name: "JavaScript Basics",
    description: "Covers fundamental JS concepts",
    projectsUsed: ["React", "Firebase", "Node.js"],
    createdDate: "2025-03-11",
  },
  {
    name: "Frontend UI",
    description: "Test on UI/UX practices",
    projectsUsed: ["Figma", "Material-UI"],
    createdDate: "2025-02-20",
  },
  {
    name: "Backend Logic",
    description: "Test on APIs and auth",
    projectsUsed: ["Node.js", "Express", "MongoDB"],
    createdDate: "2025-01-15",
  },
  {
    name: "Cloud Security",
    description: "Covers cloud service risks",
    projectsUsed: ["AWS", "Docker"],
    createdDate: "2025-01-10",
  },
  {
    name: "React Routing",
    description: "SPA Routing in React",
    projectsUsed: ["React Router", "React"],
    createdDate: "2025-03-01",
  },
];

const allProjects = [...new Set(quizData.flatMap((quiz) => quiz.projectsUsed))];

const QuizListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3); // Default to 3 per page

  // Filtering logic
  const filteredQuizzes = quizData.filter((quiz) => {
    const matchesSearch =
      quiz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProject = selectedProject
      ? quiz.projectsUsed.includes(selectedProject)
      : true;

    return matchesSearch && matchesProject;
  });

  // Paginated data
  const paginatedQuizzes = filteredQuizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">Quiz Listings</Typography>
          <Button variant="contained" color="primary">
            Create New Quiz
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Autocomplete
            options={allProjects}
            value={selectedProject}
            onChange={(event, newValue) => setSelectedProject(newValue)}
            renderInput={(params) => <TextField {...params} label="Filter by Project Used" variant="outlined" />}
            sx={{ width: 300 }}
          />

          <TextField
            variant="outlined"
            placeholder="Search by name or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Project Used</strong></TableCell>
                <TableCell><strong>Created Date</strong></TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQuizzes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No matching quizzes found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedQuizzes.map((quiz, index) => (
                  <TableRow key={index}>
                    <TableCell>{quiz.name}</TableCell>
                    <TableCell>{quiz.description}</TableCell>
                    <TableCell>
                      {quiz.projectsUsed.map((project, idx) => (
                        <Chip key={idx} label={project} sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell>{quiz.createdDate}</TableCell>
                    <TableCell>
                      <IconButton color="primary" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredQuizzes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[3, 5, 10]}
          />
        </TableContainer>
      </Box>
    </Container>
  );
};

export default QuizListPage;
