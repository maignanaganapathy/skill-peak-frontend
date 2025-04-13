
import { api } from '../../../utils/axiosConfig'; 

export const fetchProjectRoundsData = async (projectId: number): Promise<any> => {
    try {
        const response = await api.get(`/rounds/project/${projectId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching project rounds:', error);
        throw error;
    }
};

export const fetchTeamData = async (teamId: number): Promise<any> => {
    try {
        const response = await api.get(`/teams/${teamId}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error fetching team data for ID ${teamId}:`, error);
        throw error;
    }
};