import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";
import QuizTableComponent from "./QuizTable";
import PaginationComponent from "./PaginationComponent";
import { QuizHeader } from "./Header";
import CreateQuizButton from "./CreateQuizButton";
import { Quiz } from "../types/quiz"; 
import { useLocation } from "react-router-dom"; 
import { getQuizzes } from "../services/quiz.service"; // Adjust relative path as needed


const QuizList: React.FC = () => {
  const location = useLocation(); // 
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Quiz | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  const allProjects = [
    ...new Set(quizzes.flatMap((quiz) => quiz.projectsUsed || [])),
  ];

 
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQyNzE5OTUxLCJleHAiOjE3NDI4MDYzNTF9.NeM0aPbZQioHi3ENiQlBSQUY2iORy0JCeTzEFIJv6vk"; // ← You may still need this if your backend requires it
        
        const data = await getQuizzes(); // 
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuizzes();
  }, [location]);
  
    
    

    

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

  const handleChangeEditField = (field: string, value: any) => {
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
    const matchesProject = selectedProject
      ? quiz.projectsUsed?.includes(selectedProject)
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
            <p>Loading quizzes...</p>
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
