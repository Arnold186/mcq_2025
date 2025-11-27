export interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer?: number; // backend only
  marks?: number;
}
