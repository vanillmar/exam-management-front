import { Response } from "./response";

export interface Subject {
  id: number;
  name: string;
  description: string;
  code: string;
}
export type SubjectsResponse = Response<Subject[]>;
