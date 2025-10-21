import { Response } from "./ApiResponse";

export interface Subject {
  id: number;
  name: string;
  description: string;
  code: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SubjectsResponse extends Response<Subject[]> {}
