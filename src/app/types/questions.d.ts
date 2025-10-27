import { Response } from "./response";

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

interface TotalQuestions {
  total: number;
}

export type QuestionBankResponse = Response<QuestionBank>;

export type QuestionsResponse = Response<Question[]>;
export type QuestionResponse = Response<Question>;

export type TotalQuestionsResponse = Response<TotalQuestions>;
