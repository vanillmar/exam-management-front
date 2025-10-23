import { apiRequest } from "@/types/ApiResponse";
import { QuestionBank, QuestionBankResponse } from "@/types/questions";

export const fetchQuestions = async (
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
