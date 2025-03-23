import axios from "axios";


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJFbWFpbCI6Imdva3VsQGdtYWlsLmNvbSIsImlhdCI6MTc0MjY0MDU1MCwiZXhwIjoxNzQyNzI2OTUwfQ.-43AQONBZeV9-Iyfd0K_TWGVsML0WbOTMklLOqhQBn0";

export const getQuizzes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/quiz/list", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};
