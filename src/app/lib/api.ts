import axiosInstance from "./axios";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer_index: number;
}

export interface QuestionBank {
  subject: string;
  question_count: number;
  questions: Question[];
}

export interface QuestionsResponse {
  timestamp: string; // ISO date string
  status: number;
  message: string;
  success: boolean;
  data: QuestionBank;
}

export const fetchQuestions = async (
  subject: string,
): Promise<QuestionBank> => {
  const response = await axiosInstance<QuestionsResponse>(
    `/questions/subject/${subject}`,
  );
  if (!response.data.success) {
    throw new Error(`Failed to fetch questions. ${response.data.message}`);
  }
  return response.data.data;
};
