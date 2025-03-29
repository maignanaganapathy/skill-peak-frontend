// In quiz.service.ts (or .js)
import axios from 'axios';
import { BACKEND_URL } from '../../../config'; // Adjust the path as needed


const getToken = () => {
  return localStorage.getItem('authToken'); // Example using localStorage
};

export const getQuizzes = async (page: number, rowsPerPage: number, search: string, selectedProject: string | null) => {
  const token = getToken();
  try {
    const response = await axios.post(`${BACKEND_URL}/quiz/list`, {
      page: page,
      rowsPerPage: rowsPerPage,
      search: search,
      projectIds: selectedProject ? [selectedProject] : undefined, // Adjust based on your backend
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId: number, quizData: any) => {
  const token = getToken();
  try {
    const response = await axios.put(`${BACKEND_URL}/quiz/${quizId}`, quizData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (quizId: number) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${BACKEND_URL}/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};