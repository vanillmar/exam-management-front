import { ApiResponse } from "./ApiResponse";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface QuestionBank {
  subject: string;
  questionCount: number;
  questions: Question[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface QuestionsResponse extends ApiResponse<QuestionBank>{}