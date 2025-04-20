
export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: Option[];
  points: number;
  timeLimit?: number; // In seconds, optional
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // In seconds
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number; // In seconds
  answeredQuestions: {
    questionId: string;
    selectedOptionId?: string;
    isCorrect: boolean;
    points: number;
  }[];
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId -> selectedOptionId
  timeRemaining: number;
  isFinished: boolean;
  startTime: number;
  endTime?: number;
}
