import { api } from "../../../utils/axiosConfig"

export const sendContactForm = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const response = await api.post('/contact', data);
  return response.data;
};
