import { api } from "../../../utils/axiosConfig"; // Import the configured api instance

// Login API call
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // You can handle or transform response here if needed
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

// Signup API call
export const signup = async (email: string, mobile: string, password: string) => {
  try {
    const response = await api.post("/auth/signup", {
      email,
      mobile,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};