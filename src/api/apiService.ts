import { api } from '../utils/axiosConfig'; // Import the configured axios instance
import { BACKEND_URL } from '../config'; // You might still need this for specific URLs

const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

// Example of another API call that will automatically use the Authorization header
const fetchData = async () => {
  try {
    const response = await api.get('/some-protected-route');
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export { login, fetchData };