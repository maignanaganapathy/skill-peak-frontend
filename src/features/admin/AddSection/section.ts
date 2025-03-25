export interface Section {
    id: number;
    sectionName: string; // Or name, depending on what your backend uses
    projectId: number;
    description?: string;
    sectionType: string;
    quizId:number;
    linkUrl: string;
  }