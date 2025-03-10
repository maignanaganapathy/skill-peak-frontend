export enum QuestionTypeEnum {
  YesNo = "Yes/No",
  MultipleChoice = "Multiple Choice",
  TextField = "Text Field",
  Checkboxes = "Checkboxes",
}

export interface AnswerOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface QuestionType {
  id: number;
  type: QuestionTypeEnum;
  text: string;
  required: boolean;
  imageUrl?: string;
  options: AnswerOption[];
}
