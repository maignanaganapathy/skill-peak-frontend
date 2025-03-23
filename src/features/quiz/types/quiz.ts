export interface Quiz {
  title: string;
  description: string;
  projectsUsed?: string[];
  createdBy?: {
    email?: string;
  };
  createdDate?: string | Date;
}



export interface User {
  id: number;
  email: string;
  mobile?: string;
  password?: string; // Optional: avoid exposing this on frontend if not needed
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
  SINGLE_CHOICE = "single",
  MULTIPLE_CHOICE = "multiple",
  TEXT = "text",
  YES_NO = "yes_no",
  CHECKBOXES = "checkboxes",
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
