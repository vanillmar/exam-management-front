'use client';
import { Question } from '@/lib/api';

interface QuestionAreaProps {
  question: Question;
  index: number;
  total: number;
  answers: (number | null)[];
  marked: Set<number>;
  onAnswer: (index: number, option: number) => void;
  onMark: (index: number) => void;
}

export default function QuestionArea({
  question,
  index,
  total,
  answers,
  marked,
  onAnswer,
  onMark,
}: QuestionAreaProps) {
  return (
    <div className="glass p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg">Question ({index + 1})</h3>
        <span className="badge">{`${index + 1}/${total}`}</span>
      </div>
      <p className="text-lg leading-relaxed mb-3.5">{question.question}</p>
      <div className="flex flex-col gap-2.5">
        {question.options.map((option, i) => (
          <label key={i} className="opt flex items-start gap-2.5 p-2.5 bg-white/5 border border-white/8 rounded-10">
            <input
              type="radio"
              name={`q-${index}`}
              checked={answers[index] === i}
              onChange={() => onAnswer(index, i)}
              className="mt-1"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <div className="statusbar mt-3 text-sm text-[#cbd5e1]">
        <button
          onClick={() => onMark(index)}
          className={`icon-btn ${marked.has(index) ? 'border-brand' : ''}`}
        >
          ★
        </button>
      </div>
    </div>
  );
}