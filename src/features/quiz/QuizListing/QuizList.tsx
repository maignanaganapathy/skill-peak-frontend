import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
} from "@mui/material";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";
import QuizTableComponent from "./QuizTable";
import PaginationComponent from "./PaginationComponent";
import initialQuizData from "./data";
import { QuizHeader } from "./Header"; // Import your custom header component

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState(initialQuizData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState(quizzes[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const allProjects = [
    ...new Set(quizzes.flatMap((quiz) => quiz.projectsUsed)),
  ];

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData({ ...quizzes[index] });
  };

  const handleSave = () => {
    const updated = [...quizzes];
    if (editIndex !== null) updated[editIndex] = editData;
    setQuizzes(updated);
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const updated = [...quizzes];
    updated.splice(index, 1);
    setQuizzes(updated);
  };

  const handleChangeEditField = (field: string, value: any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject
      ? quiz.projectsUsed.includes(selectedProject)
      : true;
    return matchesSearch && matchesProject;
  });

  const paginatedQuizzes = filteredQuizzes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateQuiz = () => {
    alert("Create quiz clicked!");
  };

  return (
    <>
      <QuizHeader />

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>

          {/* Toolbar Row: Filter | Spacer | Search + Create */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {/* Left side: Filter dropdown */}
            <FilterComponent
              allProjects={allProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />

            {/* Right side: Search bar and create button */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box sx={{ width: "300px" }}>
                <SearchComponent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </Box>
              <Button variant="contained" color="primary" onClick={handleCreateQuiz}>
                Create New Quiz
              </Button>
            </Box>
          </Box>

          <QuizTableComponent
            quizzes={paginatedQuizzes}
            editIndex={editIndex}
            editData={editData}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleChangeEditField={handleChangeEditField}
          />

          <PaginationComponent
            count={filteredQuizzes.length}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Container>
    </>
  );
};

export default QuizList;
