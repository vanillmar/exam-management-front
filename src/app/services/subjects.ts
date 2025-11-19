import { apiRequest } from "@/lib/api";
import { SubjectsResponse, TotalSubjectsResponse } from "@/types/subject";

export const getTotalSubjects = async () => {
  const response = await apiRequest<TotalSubjectsResponse>(
    "/subjects/stats/total",
  );
  if (!response.success) {
    throw new Error(`Failed to fetch total subjects. ${response.message}`);
  }
  return response.data;
};

export const getSubjects = async () => {
  const response = await apiRequest<SubjectsResponse>("/subjects");
  if (!response.success) {
    throw new Error(`Failed to fetch questions. ${response.message}`);
  }
  return response.data;
};

export const getSubjectById = async (id: number) => {
  const response = await apiRequest<SubjectsResponse>(`/subjects/${id}`);
  if (!response.success) {
    throw new Error(`Failed to fetch subject. ${response.message}`);
  }
  return response.data;
};

export const createSubject = async (subjectData: { name: string }) => {
  const response = await apiRequest<SubjectsResponse>(`/subjects`, {
    method: "POST",
    data: subjectData,
  });
  if (!response.success) {
    throw new Error(`Failed to create subject. ${response.message}`);
  }
  return response.data;
};

export const updateSubject = async (
  id: number,
  subjectData: { name: string; description: string; code: string },
) => {
  const response = await apiRequest<SubjectsResponse>(`/subjects/${id}`, {
    method: "PUT",
    data: subjectData,
  });
  if (!response.success) {
    throw new Error(`Failed to update subject. ${response.message}`);
  }
  return response.data;
};

export const deleteSubject = async (id: number) => {
  const response = await apiRequest<SubjectsResponse>(`/subjects/${id}`, {
    method: "DELETE",
  });
  if (!response.success) {
    throw new Error(`Failed to delete subject. ${response.message}`);
  }
  return response.data;
};
