import axios from "axios";
import { BACKEND_URL } from "../config"; 

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, //  sends cookies (like tokens) with every request
});

export default api;
