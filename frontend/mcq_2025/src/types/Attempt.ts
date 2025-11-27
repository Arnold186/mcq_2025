export interface Answer {
  questionId: string;
  selected: number | null;
}

export interface Attempt {
  learnerId: string;
  answers: Answer[];
  score?: number;
  submittedAt?: string;
}
