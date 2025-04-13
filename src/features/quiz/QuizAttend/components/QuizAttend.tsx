import { useEffect, useState } from "react";
import { getQuiztoAttend, submitQuiz } from "../services/api";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../../../Navbar";
import { QuizData, QuizResponse } from "../interfaces/QuizData";
import Question from "./Question";

const QuizAttend: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData>();
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const { sectionId, quizId } = useParams();

  useEffect(() => {
    try {
      getQuiztoAttend(Number(quizId), Number(sectionId)).then((result) => {
        setQuizData(result.data);
      });
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
  return (
    <Box>
      <Navbar title={quizData?.sections[0].sectionName || ""}></Navbar>
      {quizData?.quizSection.map((quizSection) => {
        return (
          <Box p={2} py={5}>
            <Typography variant="h5" paddingLeft={2} py={2}>
              {quizSection.title}
            </Typography>
            {quizSection.questions.map((question) => {
              return (
                <Question
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
            submitQuiz(
              { responses, sectionId: Number(sectionId) },
              Number(quizId)
            );
          }}
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default QuizAttend;
