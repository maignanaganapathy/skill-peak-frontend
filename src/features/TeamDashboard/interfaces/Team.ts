// In a file like src/interfaces/Team.ts or wherever you prefer to keep your interfaces

export interface Team {
    id: number;
    projectId: number;
    name: string;
    tagline?: string;
    metaData?: {
      techStack?: string[];
    };
    teamMembers?: {
      user?: {
        email?: string;
      };
    }[];
    teamScores?: {
      id?: number;
      teamId?: number;
      roundId?: number;
      score?: number;
      comment?: string;
      createdAt?: string;
      updatedAt?: string;
      createdById?: number;
      updatedById?: number;
      round?: {
        id?: number;
        projectId?: number;
        roundName?: string;
        metaData?: {
          weight?: number;
          description?: string;
        };
      };
    }[];
  }
  export interface Round {
    id: number;
    roundName: string;
    projectId: number;
    teamScores: { teamId: number; score: number }[];
   
  }