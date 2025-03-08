"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "./Header";
import { QuestionCard } from "./QuestionCard";
import { NavigationFooter } from "./NavigationFooter";
import { ScoreCard } from "./ScoreCard";
import { FormValues, Question, QuizResult } from "./types";

function AppContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      answers: {},
    },
  });

  const answers = watch("answers");

  // Check if all questions are answered
  const isAllQuestionsAnswered =
    questions.length > 0 && questions.every((question) => answers[question.id]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        setQuestions(data.questions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

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

    const answersArray = questions.map((question) => ({
      questionId: question.id,
      selectedAnswer: Number(answers[question.id]) || 0,
      correctAnswer: question.correctOptionId,
      isCorrect: Number(answers[question.id]) === question.correctOptionId,
    }));

    const correctAnswers = answersArray.filter((a) => a.isCorrect).length;
    const score = correctAnswers / questions.length;

    setQuizResult({
      totalQuestions: questions.length,
      correctAnswers,
      score,
      answers: answersArray,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No questions available
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="relative w-full min-h-screen bg-white">
      <Header
        showSubmit={!quizResult}
        isComplete={isAllQuestionsAnswered}
        onSubmit={handleSubmit}
        isScoreView={!!quizResult}
      />
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
    </div>
  );
}

export default AppContainer;
