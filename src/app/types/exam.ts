import { ApiResponse } from "./ApiResponse";
import { Subject } from "./subject";

export interface Exam {
  id: number;
  subject: Subject;
  title: string;
  result: string;
  timeLimit: number;
  passMark: number;
  examStatus: ExamStatus;
}
export interface ExamStatus {
  id: number;
  name: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExamResponse extends ApiResponse<Exam[]> {}
