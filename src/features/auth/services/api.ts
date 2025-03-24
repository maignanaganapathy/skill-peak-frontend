

import api from "../../../api/axiosInstance";

// Login API call
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // You can handle or transform response here if needed
};

// Signup API call
export const signup = async (email: string, mobile: string,password: string) => {
  const response = await api.post("/auth/signup", {
    email,
    mobile,
   password,
  });
  return response.data;
};
