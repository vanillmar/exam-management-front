import api from "@/lib/axios";

export interface Response<T> {
  timestamp: string; // ISO date string
  status: number;
  message: string;
  success: boolean;
  data: T;
}

export async function apiRequest<T>(
  endpoint: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    data?: T;
    params?: Record<string, unknown>;
  },
): Promise<T> {
  const res = await api.request<T>({
    url: endpoint,
    method: options?.method || "GET",
    data: options?.data,
    params: options?.params,
  });

  return res.data;
}
