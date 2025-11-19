import { apiRequest } from "@/lib/api";
import {
  TotalActiveStudentsResponse,
  TotalInactiveStudentsResponse,
  TotalStudentsResponse,
} from "@/types/student";

export const getTotalStudents = async () => {
  const response = await apiRequest<TotalStudentsResponse>(
    `/students/stats/total`,
  );
  if (!response.success) {
    throw new Error(`Failed to fetch total students. ${response.message}`);
  }
  return response.data;
};

export const getTotalActiveStudents = async () => {
  let response;
  try {
    response = await apiRequest<TotalActiveStudentsResponse>(
      `/students/stats/total-active`,
    );
  } catch (err) {
    console.error(err);
  }

  if (!response?.success) {
    throw new Error(
      `Failed to fetch total active students. ${response?.message}`,
    );
  }

  return response.data;
};

export const getTotalInactiveStudents = async () => {
  const response = await apiRequest<TotalInactiveStudentsResponse>(
    `/students/stats/total-inactive`,
  );
  if (!response.success) {
    throw new Error(
      `Failed to fetch the total inactive students. ${response.message}`,
    );
  }
  return response.data;
};
