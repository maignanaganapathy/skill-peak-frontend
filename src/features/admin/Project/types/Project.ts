
export interface Project {
    id: number;
    name: string;
    description: string;
    date: string;
    createdAt: string;
    createdById: number;
    updatedAt: string;
    updatedById: number;
    sections: any[]; // Adjust the type for 'sections' if you have a specific interface for it
    createdBy: { id: number; email: string };
    updatedBy: { id: number; email: string };
    _count: { teams: number };
}