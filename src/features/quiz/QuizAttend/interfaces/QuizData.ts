export enum QuestionType {
  LIKERT = "LIKERT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  MULTI_SELECT = "MULTI_SELECT",
  TEXT = "TEXT",
}
export interface QuizOptionData {
  id: number;
  optionText: string;
  isNone: boolean;
}
export interface QuestionData {
  id: number;
  imageUrl?: string;
  maxVal?: number;
  minVal?: number;
  question: string;
  questionType: QuestionType;
  options: QuizOptionData[];
}
export interface QuizData {
  quizSection: {
    questions: QuestionData[];
    title: string;
  }[];
  sections: {
    sectionName: string;
  }[];
}

export interface QuizAttempt {
  sectionId: number;
  responses: QuizResponse[];
}
export interface QuizResponse {
  questionId: number;
  selectionOptionIds?: number[];
  scaleValue?: number;
  inputText?: string;
}
