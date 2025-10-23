import { apiRequest } from "@/types/ApiResponse";
import { SubjectsResponse } from "@/types/subject";

export const fetchSubjects = async () => {
  const response = await apiRequest<SubjectsResponse>("/subjects");
  if (!response.success) {
    throw new Error(`Failed to fetch questions. ${response.message}`);
  }
  return response.data;
};
