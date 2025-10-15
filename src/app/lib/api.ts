import { SubjectsResponse } from "@/types/subject";
import axiosInstance from "./axios";
import { QuestionBank, QuestionBankResponse } from "@/types/questions";

export const fetchQuestions = async (
  subject: string,
): Promise<QuestionBank> => {
  const response = await axiosInstance<QuestionBankResponse>(
    `/questions/subject/${subject}`,
  );
  if (!response.data.success) {
    throw new Error(`Failed to fetch questions. ${response.data.message}`);
  }
  return response.data.data;
};

export const fetchSubjects = async () => {
  const response = await axiosInstance.get<SubjectsResponse>('/subjects', );
   if (!response.data.success) {
    throw new Error(`Failed to fetch questions. ${response.data.message}`);
  }
  return response.data.data;
};