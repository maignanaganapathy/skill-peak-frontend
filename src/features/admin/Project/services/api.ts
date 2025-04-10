
import { api } from "../../../../utils/axiosConfig";
import { BACKEND_URL } from "../../../../config";

export const fetchProjects = async () => {
  return api.get(`${BACKEND_URL}/projects`);
};

export const fetchAllQuizzes = async () => {
  return api.post(`${BACKEND_URL}/quiz/list`, {});
};

export const deleteProject = async (projectId: string) => {
  return api.delete(`${BACKEND_URL}/projects/${projectId}`);
};

// You can add more API functions here as needed