"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { Header } from "./Header";
import { QuestionCard } from "./QuestionCard";
import { NavigationFooter } from "./NavigationFooter";
import { ScoreCard } from "./ScoreCard";
import { FormValues, Question, QuizResult } from "./types";
import { useParams } from "react-router-dom";

function AppContainer() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [answersArray, setAnswersArray] = useState<
    { questionId: number; selectedOptionId: number }[]
  >([]); // ✅ Store answers in an array

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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQyNjE3NzI2LCJleHAiOjE3NDI3MDQxMjZ9.1XSo6KYr-sk8pDI156Nv4w4QK0MUTzMKEVYaBLj0Ejs"; // Ideally from a secure state/store
const response = await fetch("http://localhost:5000/quiz/1", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
const data = await response.json();
        setQuestions(data.questions.map((q: any) => ({
          id: q.id,
          question: q.question,
          optionType: q.optionType,
          imageUrl: q.imageUrl,
          options: q.options,
          correctOptionId: q.correctOptions[0]?.optionId,
        })));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setIsLoading(false);
        setQuestions([]); // optionally clear existing questions
      }
      
    };

    loadQuestions();
  }, []);

  // ✅ Track answers in an array
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
      answers: submittedAnswers,
    });
  };

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

  const currentQuestion = questions[currentQuestionIndex];

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
