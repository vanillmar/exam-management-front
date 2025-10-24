import { Response } from "./response";

export interface Subject {
  id: number;
  name: string;
  description: string;
  code: string;
}
export interface TotalSubjects {
  total: number;
}

export type SubjectResponse = Response<Subject>;
export type SubjectsResponse = Response<Subject[]>;

export type TotalSubjectsResponse = Response<TotalSubjects>;
