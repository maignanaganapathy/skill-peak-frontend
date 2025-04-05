// src/services/quiz.service.ts
import { api } from '../../../utils/axiosConfig'; 
import { BACKEND_URL } from '../../../config'; 
export const getQuizzes = async (page: number, rowsPerPage: number, search: string, selectedProject: string | null) => {
  try {
    const response = await api.post(`${BACKEND_URL}/quiz/list`, {
      page: page,
      rowsPerPage: rowsPerPage,
      search: search,
      projectIds: selectedProject ? [selectedProject] : undefined, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId: number, quizData: any) => {
  try {
    const response = await api.put(`${BACKEND_URL}/quiz/${quizId}`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const deleteQuiz = async (quizId: number) => {
  try {
    const response = await api.delete(`${BACKEND_URL}/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

export const createQuiz = async (quizData: any) => {
  try {
    const response = await api.post(`${BACKEND_URL}/quiz`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const getQuizDetails = async (quizId: string) => { // Changed quizId to string to match useParams
  try {
    const response = await api.get(`${BACKEND_URL}/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz details for ID ${quizId}:`, error);
    throw error;
  }
};

