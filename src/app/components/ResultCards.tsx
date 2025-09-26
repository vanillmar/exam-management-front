interface ResultCardsProps {
  score: string;
  status: string;
  correct: string;
  time: string;
  summary: string;
}

export default function ResultCards({
  score,
  status,
  correct,
  time,
  summary,
}: ResultCardsProps) {
  return (
    <div className="max-w-[900px] mx-auto text-center">
      <h2 className="text-2xl font-bold mb-3">Examination finished</h2>
      <p>{summary}</p>
      <div className="grid grid-cols-4 gap-2.5 my-3.5 max-md:grid-cols-2">
        <div className="card p-3.5">
          <div className="label text-[#cbd5e1]">Score</div>
          <div className="value">{score}</div>
        </div>
        <div className="card p-3.5">
          <div className="label text-[#cbd5e1]">Status</div>
          <div
            className="value"
            style={{ color: status === "PASS" ? "#2bd4a1" : "#ff6b6b" }}
          >
            {status}
          </div>
        </div>
        <div className="card p-3.5">
          <div className="label text-[#cbd5e1]">Correct</div>
          <div className="value">{correct}</div>
        </div>
        <div className="card p-3.5">
          <div className="label text-[#cbd5e1]">Time used</div>
          <div className="value">{time}</div>
        </div>
      </div>
      <p className="text-muted">Passing mark: 75% • Questions: 60</p>
    </div>
  );
}
