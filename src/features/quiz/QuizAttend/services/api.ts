import { BACKEND_URL } from "../../../../config";
import { api } from "../../../../utils/axiosConfig";
import { QuizAttempt } from "../interfaces/QuizData";

const getQuiztoAttend = async (quizId: number, sectionId: number) => {
  return api.post(`${BACKEND_URL}/quiz/${quizId}/attend`, { sectionId });
};

const submitQuiz = async (quizAttempt: QuizAttempt, quizId: number) => {
  console.log(quizAttempt, quizId);
  return api.post(`${BACKEND_URL}/quiz/${quizId}/submit`, quizAttempt);
};
const calculateQuiz = async (quizAttemptId: number) => {
  return api.get(`${BACKEND_URL}/quiz/calculate/${quizAttemptId}`);
};

export { getQuiztoAttend, submitQuiz, calculateQuiz };
