import axios from "axios";

// Define the Quiz interface
export interface Quiz {
  _id?: string; // assuming MongoDB-style ID
  title: string;
  description: string;
  createdBy: {
    email: string;
  };
  createdDate: string;
  projectsUsed?: string[];
}

// Backend base URL
const API_BASE_URL = "http://localhost:5000/api/quizzes";

// Fetch all quizzes
export const getQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// Create a new quiz
export const createQuiz = async (quizData: Quiz): Promise<Quiz> => {
  try {
    const response = await axios.post(API_BASE_URL, quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

// Update a quiz by ID
export const updateQuiz = async (id: string, updatedData: Partial<Quiz>): Promise<Quiz> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating quiz with id ${id}:`, error);
    throw error;
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz with id ${id}:`, error);
    throw error;
  }
};
