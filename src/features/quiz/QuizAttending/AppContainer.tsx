import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { Header } from "./Header";
import { QuestionCard } from "./QuestionCard";
import { NavigationFooter } from "./NavigationFooter";
import { ScoreCard } from "./ScoreCard";
import { FormValues, Question, QuizResult } from "./types";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { BACKEND_URL } from "../../../config";
import Cookies from 'js-cookie'; // Import js-cookie
import axios from 'axios'; // Import axios

function AppContainer() {
    console.log("AppContainer rendered");
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const [answersArray, setAnswersArray] = useState<
        { questionId: number; selectedOptionId: number }[]
    >([]); //

    const { register, watch } = useForm<FormValues>({
        defaultValues: {
            answers: {},
        },
    });

    const answers = watch("answers");

    const isAllQuestionsAnswered =
        questions.length > 0 && questions.every((question) => answers[question.id]);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const token = Cookies.get('authToken'); // Retrieve token from cookie
                if (!token) {
                    console.error("Authentication token not found.");
                    navigate('/login'); // Redirect to login page
                    return;
                }
                const response = await axios.get(`${BACKEND_URL}/quiz/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data;

                console.log("Fetched quiz data:", data);

                if (data && data.questions && Array.isArray(data.questions)) {
                    const mappedQuestions = data.questions.map((q: any) => ({
                        id: q.id,
                        question: q.question,
                        optionType: q.optionType,
                        imageUrl: q.imageUrl,
                        options: Array.isArray(q.options)
                            ? q.options.map((opt: any) => ({
                                id: opt.id,
                                option: opt.option,
                            }))
                            : [], // Ensure options is an array
                        correctOptionId: q.correctOptions?.[0]?.option?.id || null,
                    }));
                    setQuestions(mappedQuestions);
                    console.log("AppContainer - Questions state after fetch:", mappedQuestions);
                } else {
                    console.error("Error: Invalid quiz data format received from backend.");
                    setQuestions([]);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error loading questions:", error);
                setIsLoading(false);
                setQuestions([]); // optionally clear existing questions
            }

        };

        loadQuestions();
    }, [id, navigate]); // Add navigate to the dependency array

    // Track answers in an array
    useEffect(() => {
        if (questions.length === 0) return;

        const updatedArray = questions.map((q) => ({
            questionId: q.id,
            selectedOptionId: Number(answers[q.id]) || 0,
        }));

        setAnswersArray(updatedArray);
    }, [answers, questions]);

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleSubmit = () => {
        if (!isAllQuestionsAnswered) {
            return;
        }

        const submittedAnswers = questions.map((question) => {
            const selected = Number(answers[question.id]) || 0;
            return {
                questionId: question.id,
                selectedAnswer: selected,
                correctAnswer: question.correctOptionId,
                isCorrect: selected === question.correctOptionId,
            };
        });

        const correctAnswers = submittedAnswers.filter((a) => a.isCorrect).length;
        const score = correctAnswers / questions.length;

        setQuizResult({
            totalQuestions: questions.length,
            correctAnswers,
            score,
            answers: submittedAnswers
                .filter((a): a is {
                    questionId: number;
                    selectedAnswer: number;
                    correctAnswer: number;
                    isCorrect: boolean;
                } => a.correctAnswer !== null)
        });
    };

    const currentQuestion = questions[currentQuestionIndex];
    console.log("AppContainer - questions.length:", questions.length);
    console.log("AppContainer - currentQuestion:", currentQuestion);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (questions.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography>No questions available</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#fff" }}>
            <Header
                showSubmit={!quizResult}
                isComplete={isAllQuestionsAnswered}
                onSubmit={handleSubmit}
                isScoreView={!!quizResult}
            />
            <Container maxWidth="md">
                {quizResult ? (
                    <ScoreCard result={quizResult} />
                ) : (
                    <>
                        <QuestionCard
                            question={currentQuestion}
                            currentQuestion={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            register={register}
                            selectedOptionId={Number(answers[currentQuestion.id])}
                        />
                        <NavigationFooter onPrevious={handlePrevious} onNext={handleNext} />
                    </>
                )}
            </Container>
        </Box>
    );
}

export default AppContainer;