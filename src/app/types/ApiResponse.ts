export interface ApiResponse<T> {
  timestamp: string; // ISO date string
  status: number;
  message: string;
  success: boolean;
  data: T;
}