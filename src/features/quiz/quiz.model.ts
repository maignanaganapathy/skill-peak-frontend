export interface Quiz {
    id: string;
    title: string;
    description: string;
    projectsUsed?: string[];
    createdAt?: string;
    updatedAt?: string;
    createdBy: { email: string };
    createdDate: string;
  }
  