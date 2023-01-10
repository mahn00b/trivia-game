declare type DifficultyLevel = 'easy' | 'medium' | 'hard';

declare interface QuestionSetStats {
  correct: number;
  incorrect: number;
  unanswered: number;
  total: number;
}

declare interface QuizReport {
  sessionId: string;
  totalQuestions: number;
  answeredQuestions: number;
  answers: {
    easy: QuestionSetStats,
    medium: QuestionSetStats,
    hard: QuestionSetStats
  },
  createdAt: number;
  updatedAt: number;
}

declare interface AttributeMap {
  [key: string | symbol]: boolean | string | number | undefined;
}

declare interface Question {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: DifficultyLevel;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
}
