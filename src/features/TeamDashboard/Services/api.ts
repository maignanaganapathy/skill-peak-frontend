import { api } from '../../../utils/axiosConfig'; // Adjust path as needed
import { Team } from '../interfaces/Team'; // Import the Team interface

interface ScoreData {
    round: string;
    teamName: string;
    reasoning: string;
    scores: number;
}

// Existing API functions
export const fetchProjectRoundsData = async (projectId: number): Promise<any> => {
    try {
        const response = await api.get(`/rounds/project/${projectId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching project rounds:', error);
        throw error;
    }
};

export const fetchProjectTeamsData = async (projectId: number): Promise<Team[]> => {
    try {
        const response = await api.get(`/teams/project/${projectId}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error fetching teams for project ID ${projectId}:`, error);
        throw error;
    }
};

// New API function for OverallGraph
interface TeamScoreData {
    teamId: number;
    teamName: string;
    totalScore: number;
}
export const fetchOverallTeamScores = async (projectId: number): Promise<TeamScoreData[]> => {
    try {
        const response = await api.get(`/team-scores/project/${projectId}/summary`);
        return response.data;
    } catch (error: any) {
        console.error(`Error fetching overall team scores for project ID ${projectId}`, error);
        throw error;
    }
};

// New API function for ScoreBoard
export const fetchScoreBoardData = async (projectId: number): Promise<ScoreData[]> => {
    try {
        const response = await api.get(`/team-scores/project/${projectId}`);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch scores: ${response.status}`);
        }
        const data: any[] = response.data;
        const transformedData: ScoreData[] = data.map(item => ({
            round: item.round?.roundName || 'N/A',
            teamName: item.team?.name || 'N/A',
            reasoning: item.comment || 'N/A',
            scores: item.score || 0,
        }));
        return transformedData;
    } catch (error: any) {
        console.error('Error fetching scoreboard data:', error);
        throw error;
    }
};
