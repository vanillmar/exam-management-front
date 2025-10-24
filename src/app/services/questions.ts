import { apiRequest } from "@/lib/axios";
import {
  QuestionBank,
  QuestionBankResponse,
  QuestionsResponse,
  TotalQuestionsResponse,
} from "@/types/questions";

export const getTotalQuestions = async () => {
  const response = await apiRequest<TotalQuestionsResponse>(
    "/questions/stats/total",
  );
  if (!response.success) {
    throw new Error(`Failed to fetch total questions. ${response.message}`);
  }
  return response.data;
};

export const getQuestionsBySubjectName = async (
  subject: string,
): Promise<QuestionBank> => {
  const response = await apiRequest<QuestionBankResponse>(
    `/questions/subject/${subject}`,
  );
  if (!response.success) {
    throw new Error(`Failed to fetch questions. ${response.message}`);
  }
  return response.data;
};

export const getAllQuestions = async (
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = "id",
  sortOrder: string = "asc",
  search: string = "",
): Promise<QuestionsResponse> => {
  const response = await apiRequest<QuestionsResponse>(`/questions`, {
    params: {
      page,
      pageSize,
      sortBy,
      sortOrder,
      search,
    },
  });
  if (!response.success) {
    throw new Error(`Failed to fetch questions. ${response.message}`);
  }
  return response;
};

export const getQuestionById = async (id: number) => {
  const response = await apiRequest<QuestionsResponse>(`/questions/${id}`);
  if (!response.success) {
    throw new Error(`Failed to fetch question. ${response.message}`);
  }
  return response.data;
};

export const createQuestion = async (questionData: {
  question: string;
  options: string[];
  answerIndex: number;
  subjectId: number;
}) => {
  const response = await apiRequest<QuestionsResponse>(`/questions`, {
    method: "POST",
    data: questionData,
  });
  if (!response.success) {
    throw new Error(`Failed to create question. ${response.message}`);
  }
  return response.data;
};

export const updateQuestion = async (
  id: number,
  questionData: {
    question?: string;
    options?: string[];
    answerIndex?: number;
    subjectId?: number;
  },
) => {
  const response = await apiRequest<QuestionsResponse>(`/questions/${id}`, {
    method: "PUT",
    data: questionData,
  });
  if (!response.success) {
    throw new Error(`Failed to update question. ${response.message}`);
  }
  return response.data;
};

export const deleteQuestion = async (id: number) => {
  const response = await apiRequest<QuestionsResponse>(`/questions/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete question. ${response.message}`);
  }
  return response.data;
};
