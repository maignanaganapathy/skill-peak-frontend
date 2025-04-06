import React, { useState, useEffect } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";
import QuizTableComponent from "./QuizTable";
import PaginationComponent from "./PaginationComponent";
import Navbar from "../../Navbar"; // Import Navbar
import CreateQuizButton from "./CreateQuizButton";
import { Quiz } from "../types/quiz";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuizzes, updateQuiz, deleteQuiz } from "../services/quiz.service";

const QuizList: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [totalQuizzes, setTotalQuizzes] = useState(0);

    const allProjects: string[] = [
        ...new Set(
            quizzes.flatMap((quiz) =>
                quiz.sections
                    .map((section) => section.project?.name)
                    .filter((name): name is string => typeof name === 'string')
            )
        ),
    ];

    const fetchQuizzesData = async () => {
        try {
            setLoading(true);
            console.log("Frontend - Fetching page:", page + 1);
            const data = await getQuizzes(page + 1, rowsPerPage, searchQuery, selectedProject);
            setQuizzes(data.quizzes);
            setTotalQuizzes(data.totalCount);
        } catch (error) {
            console.error("Failed to fetch quizzes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Location changed, fetching data...");
        fetchQuizzesData();
    }, [location]);

    const handleEdit = (id: number) => {
        navigate(`/quiz/edit/${id}`);
    };

    const handleSave = async () => {
        console.warn("handleSave called in QuizList, but editing is now in QuizCreation.");
        fetchQuizzesData();
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteQuiz(id);
        } catch (error) {
            console.error("Error deleting quiz:", error);
        } finally {
            fetchQuizzesData();
        }
    };

    const handleChangeEditField = (field: keyof Quiz, value: any) => {
        console.warn("handleChangeEditField called in QuizList, but editing is now in QuizCreation.");
    };

    const filteredQuizzes = quizzes.filter((quiz) => {
        const matchesSearch =
            quiz.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.description?.toLowerCase().includes(searchQuery.toLowerCase());

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
            <Navbar title="QUIZ MANAGEMENT" /> {/* Use Navbar with title "Quiz Management" */}

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
                            editIndex={null}
                            editData={null}
                            handleEdit={(index) => handleEdit(quizzes[index].id)}
                            handleSave={handleSave}
                            handleDelete={(index) => handleDelete(quizzes[index].id)}
                            handleChangeEditField={handleChangeEditField}
                        />
                    )}

                    <PaginationComponent
                        count={totalQuizzes}
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