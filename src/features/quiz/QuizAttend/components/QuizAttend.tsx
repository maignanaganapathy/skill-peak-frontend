import { useEffect, useState } from "react";
import { calculateQuiz, getQuiztoAttend, submitQuiz } from "../services/api";
import { useParams } from "react-router-dom";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Navbar from "../../../Navbar";
import {
  QuizAttemptData,
  QuizData,
  QuizResponse,
} from "../interfaces/QuizData";
import Question from "./Question";
import QuizAttemptDisplay from "./QuizAttemptDisplay"; // Import your QuizAttemptDisplay component

const QuizAttend: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | QuizAttemptData>();
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const { sectionId, quizId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    try {
      setIsLoading(true);
      getQuiztoAttend(Number(quizId), Number(sectionId))
        .then((result) => {
          setQuizData(result.data);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onResponseChange = (response: QuizResponse) => {
    setResponses([
      ...responses.filter((r) => r.questionId != response.questionId),
      response,
    ]);
  };
  if (isLoading) {
    return (
      <Backdrop
        sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (
    quizData &&
    "message" in quizData &&
    quizData.message === "Quiz already attempted"
  ) {
    return <QuizAttemptDisplay data={quizData} />;
  }

  // If it's not QuizAttemptData, render the quiz questions
  if (quizData && "quizSection" in quizData) {
    return (
      <Box>
        <Navbar title={quizData.sections[0].sectionName || ""} />
        {quizData.quizSection.map((quizSection) => {
          return (
            <Box p={2} py={5} key={quizSection.title}>
              <Typography variant="h5" paddingLeft={2} py={2}>
                {quizSection.title}
              </Typography>
              {quizSection.questions.map((question) => {
                return (
                  <Question
                    key={question.id}
                    question={question}
                    onResponseChange={onResponseChange}
                  />
                );
              })}
            </Box>
          );
        })}
        <Box padding={2} display={"flex"} justifyContent={"center"}>
          <Button
            onClick={() => {
              setIsLoading(true);
              submitQuiz(
                { responses, sectionId: Number(sectionId) },
                Number(quizId)
              ).then((result) => {
                calculateQuiz(result.data.id).then(() => {
                  window.location.reload();
                });
              });
            }}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    );
  }

  // Handle loading or other cases where quizData is not yet available
  return <Typography>Loading...</Typography>;
};

export default QuizAttend;
