import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../config'; // Import your BACKEND_URL

// Create a custom Axios instance with base URL and credentials
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

const setAuthToken = () => {
  const token = Cookies.get('authToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Call setAuthToken initially to set the token if it exists on page load
setAuthToken();

// Export the configured Axios instance and the setAuthToken function
export { api, setAuthToken };