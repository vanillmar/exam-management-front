import { Response } from "./response";
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

export interface UpcommingExams {
  total: number;
}

export type ExamsResponse = Response<Exam[]>;
export type ExamResponse = Response<Exam>;
export type UpcommingExamResponse = Response<UpcommingExams>;
