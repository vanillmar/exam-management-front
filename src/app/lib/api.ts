export interface Question {
  id: string;
  question: string;
  options: string[];
  answer_index: number;
}

export interface QuestionBank {
  source: string;
  question_count: number;
  questions: Question[];
}

export const fetchQuestions = async (subject: string): Promise<QuestionBank> => {
  const res = await fetch(`/app/api/questions/${subject}`);
  if (!res.ok) {
    throw new Error('Failed to fetch questions');
  }
  return res.json();
};