export interface Quiz {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  createdBy?: {
    email?: string;
  };
  sections: SectionWithProject[];
}

export interface SectionWithProject {
  id: number;
  sectionName: string;
  sectionType: string;
  linkUrl: string;
  expiresAt: string | null;
  isEnabled: boolean;
  project?: Project;
}

export interface User {
  id: number;
  email: string;
  mobile?: string;
  password?: string;
}

export interface Question {
  id: string;
  questionText: string;
  type: QuestionTypeEnum;
  options: AnswerOption[];
}

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export enum QuestionTypeEnum {
  
  IMG = "Image",
  TEXT = "Text",
  YES_NO = "Yes/No",
  
}

export interface Section {
  id: number;
  sectionName: string;
  sectionType: string;
  linkUrl: string;
  expiresAt: string | null;
  isEnabled: boolean;
  project?: Project;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  date?: string;
}

export interface UpdateQuizInput {
  title: string;
  description: string;
  questions: {
    question: string;
    optionType: string;
    options: {
      option: string;
      isCorrect: boolean;
    }[];
  }[];
}