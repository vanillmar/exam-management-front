export interface Response<T> {
  timestamp: string; // ISO date string
  status: number;
  message: string;
  success: boolean;
  data: T;
}
