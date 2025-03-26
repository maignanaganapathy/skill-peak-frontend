// Represents an option for a question
export interface Option {
  id: number;
  option: string;
}

// Represents a single quiz question
export interface Question {
  id: number;
  question: string;
  optionType: 'single' | 'multiple'; // Enforces allowed types
  imageUrl: string | null;
  options: Option[]; // Reusing the Option interface
  correctOptionId: number | null; // Use null if not answered or not applicable
}

// Stores the answers submitted by the user
export interface FormValues {
  answers: {
    [questionId: string]: number; // key is question ID, value is selected option ID
  };
}

// Stores the final result of a completed quiz
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

// Props for the quiz header component
export interface HeaderProps {
  isComplete: boolean;
  onSubmit: () => void;
}
