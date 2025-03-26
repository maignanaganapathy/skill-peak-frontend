// In quiz.service.ts (or .js)
import axios from 'axios';

export const getQuizzes = async (page: number, rowsPerPage: number, search: string, selectedProject: string | null) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQyOTYyNjk1LCJleHAiOjE3NDMwNDkwOTV9.3z5JKUulVpeNRnnzrfo48D7qqs0Wuf3Mtk9Qh9tEA6A"; // Replace with your actual token
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