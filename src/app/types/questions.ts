import { ApiResponse } from "./ApiResponse";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  subjectId: number;
  subjectName: string;
}

export interface QuestionBank {
  subject: string;
  questionCount: number;
  questions: Question[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface QuestionBankResponse extends ApiResponse<QuestionBank> {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface QuestionResponse extends ApiResponse<Question> {}
