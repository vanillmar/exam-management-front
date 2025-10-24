import { apiRequest } from "@/lib/axios";

import { ExamResponse, ExamsResponse } from "@/types/exam";

export const getAllExams = async () => {
  const response = await apiRequest<ExamsResponse>(`/exams`);
  if (!response.success) {
    throw new Error(`Failed to fetch exams. ${response.message}`);
  }
  return response.data;
};

export const getExamById = async (id: number) => {
  const response = await apiRequest<ExamResponse>(`/exams/${id}`);
  if (!response.success) {
    throw new Error(`Failed to fetch exam. ${response.message}`);
  }
  return response.data;
};

export const createExam = async (examData: {
  subjectId: number;
  title: string;
  timeLimit: number;
  passMark: number;
}) => {
  const response = await apiRequest<ExamResponse>(`/exams`, {
    method: "POST",
    data: examData,
  });
  if (!response.success) {
    throw new Error(`Failed to create exam. ${response.message}`);
  }
  return response.data;
};

export const updateExam = async (
  id: number,
  examData: {
    subjectId?: number;
    title?: string;
    timeLimit?: number;
    passMark?: number;
  },
) => {
  const response = await apiRequest<ExamResponse>(`/exams/${id}`, {
    method: "PUT",
    data: examData,
  });
  if (!response.success) {
    throw new Error(`Failed to update exam. ${response.message}`);
  }
  return response.data;
};

export const deleteExam = async (id: number) => {
  const response = await apiRequest<ExamResponse>(`/exams/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete exam. ${response.message}`);
  }
  return response.data;
};
