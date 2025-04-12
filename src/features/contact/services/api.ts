import { api } from "../../../utils/axiosConfig"

export const sendContactForm = async (data: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) => {
  const response = await api.post('/api/contact', data);
  return response.data;
};
