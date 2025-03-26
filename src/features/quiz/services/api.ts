// src/features/quiz/services/api.ts
import axios from "axios";
import { BACKEND_URL } from "../../../config";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/quizzes`,
});

export default api;
