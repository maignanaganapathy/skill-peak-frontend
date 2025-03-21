export interface Quiz {
  title: string;
  description: string;
  projectsUsed: string[];
  createdAt: string;
  updatedAt: string;
  questions: Question[];
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


// ✅ Add this interface for your form
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
