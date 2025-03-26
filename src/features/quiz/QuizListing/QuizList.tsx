import React, { useState, useEffect } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";
import QuizTableComponent from "./QuizTable";
import PaginationComponent from "./PaginationComponent";
import { QuizHeader } from "./Header";
import CreateQuizButton from "./CreateQuizButton";
import { Quiz } from "../types/quiz";
import { useLocation } from "react-router-dom";
import { getQuizzes } from "../services/quiz.service";

const QuizList: React.FC = () => {
  const location = useLocation();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Quiz | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const [totalQuizzes, setTotalQuizzes] = useState(0);

  // Extract all unique project names from the sections of all quizzes
  const allProjects: string[] = [
    ...new Set(
      quizzes.flatMap((quiz) =>
        quiz.sections
          .map((section) => section.project?.name)
          .filter((name): name is string => typeof name === 'string')
      )
    ),
  ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await getQuizzes(page + 1, rowsPerPage, searchQuery, selectedProject);
        setQuizzes(data.quizzes);
        setTotalQuizzes(data.totalCount);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [page, rowsPerPage, searchQuery, selectedProject, location]);

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData({ ...quizzes[index] });
  };

  const handleSave = () => {
    if (editIndex === null) return;
    const updated = [...quizzes];
    updated[editIndex] = editData as Quiz;
    setQuizzes(updated);
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const updated = [...quizzes];
    updated.splice(index, 1);
    setQuizzes(updated);
  };

  const handleChangeEditField = (field: keyof Quiz, value: any) => {
    setEditData((prev) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    );
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if the quiz has a section belonging to the selected project
    const matchesProject = selectedProject
      ? quiz.sections.some(
          (section) => section.project?.name === selectedProject
        )
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

  useEffect(() => {
    setPage(0);
  }, [searchQuery, selectedProject]);

  return (
    <>
      <QuizHeader />

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
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
            <FilterComponent
              allProjects={allProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box sx={{ width: "300px" }}>
                <SearchComponent
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </Box>
              <CreateQuizButton />
            </Box>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : (
            <QuizTableComponent
              quizzes={paginatedQuizzes}
              editIndex={editIndex}
              editData={editData}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleChangeEditField={handleChangeEditField}
            />
          )}

          <PaginationComponent
            count={totalQuizzes} // Use totalQuizzes from the API response
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