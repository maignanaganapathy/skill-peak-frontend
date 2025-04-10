
import { api } from "../../../../utils/axiosConfig";
import { BACKEND_URL } from "../../../../config";

export const fetchProjects = async () => {
  try {
    const response = await api.get(`${BACKEND_URL}/projects`);
    return response;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchAllQuizzes = async () => {
  try {
    const response = await api.post(`${BACKEND_URL}/quiz/list`, {});
    return response;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const response = await api.delete(`${BACKEND_URL}/projects/${projectId}`);
    return response;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const createProject = async (payload: {
  name: string;
  description: string;
  date: string | null;
}) => {
  try {
    const response = await api.post(`${BACKEND_URL}/projects`, payload);
    return response;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (
  projectId: string | number,
  payload: {
    name: string;
    description: string;
    date: string | null;
  }
) => {
  try {
    const response = await api.put(`${BACKEND_URL}/projects/${projectId}`, payload);
    return response;
  } catch (error) {
    console.error(`Error updating project with ID ${projectId}:`, error);
    throw error;
  }
};

export const createSection = async (payload: any) => {
  try {
    const response = await api.post(`${BACKEND_URL}/sections`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating section:", error);
    throw error;
  }
};

export const updateSection = async (sectionId: number, payload: any) => {
  try {
    const response = await api.put(`${BACKEND_URL}/sections/${sectionId}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error updating section with ID ${sectionId}:`, error);
    throw error;
  }
};

export const deleteSection = async (sectionId: number) => {
  try {
    const response = await api.delete(`${BACKEND_URL}/sections/${sectionId}`);
    return response;
  } catch (error) {
    console.error("Error deleting section:", error);
    throw error;
  }
};

