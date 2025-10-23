import { Response } from "./response";

export interface TotalStudents {
  total: number;
}

export type TotalActiveStudents = TotalStudents;
export type TotalInactiveStudents = TotalStudents;

export type TotalStudentsResponse = Response<TotalStudents>;
export type TotalActiveStudentsResponse = Response<TotalActiveStudents>;
export type TotalInactiveStudentsResponse = Response<TotalInactiveStudents>;
