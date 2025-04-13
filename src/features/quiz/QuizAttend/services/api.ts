import { BACKEND_URL } from "../../../../config";
import { api } from "../../../../utils/axiosConfig";
import { QuizAttempt } from "../interfaces/QuizData";

const getQuiztoAttend = async (quizId: number, sectionId: number) => {
  return api.post(`${BACKEND_URL}/quiz/${quizId}/attend`, { sectionId });
};

const submitQuiz = async (quizAttempt: QuizAttempt, quizId: number) => {
  console.log(quizAttempt, quizId);
  //   return api.post(`${BACKEND_URL}/quiz/${quizId}/submit`, quizAttempt);
};

export { getQuiztoAttend, submitQuiz };
