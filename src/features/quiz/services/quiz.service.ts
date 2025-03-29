// In quiz.service.ts (or .js)
import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJFbWFpbCI6Im1uYnZAZ21haWwuY29tIiwiaWF0IjoxNzQzMTUxMzE3LCJleHAiOjE3NDMyMzc3MTd9.5LzGHU1crAbCCvrHFwY8bpRjxb_-KQNw_dOXzuh5hUc"; // Replace with your actual token

export const getQuizzes = async (page: number, rowsPerPage: number, search: string, selectedProject: string | null) => {
  try {
    const response = await axios.post("http://localhost:5000/quiz/list", {
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
  try {
    const response = await axios.put(`http://localhost:5000/quiz/${quizId}`, quizData, {
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
  try {
    const response = await axios.delete(`http://localhost:5000/quiz/${quizId}`, {
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