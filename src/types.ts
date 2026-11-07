export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  subject: 'biology' | 'chemistry';
  number: number;
  text: string;
  image?: string;
  options: Option[];
  correctAnswers: string[];
}

export type GameMode = 'biology' | 'chemistry' | 'combined' | null;

export interface QuizState {
  mode: GameMode;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, string[]>;
  isFinished: boolean;
  endTime?: number;
}
