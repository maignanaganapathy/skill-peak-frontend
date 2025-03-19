import { BACKEND_URL } from "../../../config";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const signup = async (email: string, password: string, mobile: string) => {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, mobile }), 
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
  
    return data;
  };