export interface Option {
    id: number;
    text: string;
  }
  
  export interface Question {
    id: number;
    question: string;
    options: Option[];
    correctOptionId: number;
  }
  
  export interface FormValues {
    answers: {
      [key: string]: string;
    };
  }
  
  export interface QuizResult {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    answers: {
      questionId: number;
      isCorrect: boolean;
      selectedAnswer: number;
      correctAnswer: number;
    }[];
  }
  
  export interface HeaderProps {
    isComplete: boolean;
    onSubmit: () => void;
  }
  