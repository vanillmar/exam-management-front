"use client";

import { useRouter } from "next/navigation";

const exams = [
  { subject: "airlaw", title: "Air Law", result: "—", status: "Ready" },
  {
    subject: "human-performance",
    title: "Human Performance",
    result: "—",
    status: "Ready",
  },
  {
    subject: "aircraft-technical",
    title: "Aircraft Technical General",
    result: "—",
    status: "Ready",
  },
  {
    subject: "flight-planning",
    title: "Flight Planning and Performance",
    result: "—",
    status: "Ready",
  },
  {
    subject: "instruments",
    title: "Instruments and Electronics",
    result: "—",
    status: "Ready",
  },
  {
    subject: "meteorology",
    title: "Meteorology",
    result: "—",
    status: "Ready",
  },
  {
    subject: "general-navigation",
    title: "General Navigation",
    result: "—",
    status: "Ready",
  },
  { subject: "radio-aids", title: "Radio Aids", result: "—", status: "Ready" },
];

export default function ExamTable() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto exam-table">
      <table className="w-full border-collapse bg-white/3 rounded-10 overflow-hidden">
        <thead>
          <tr>
            <th className="text-left p-3 text-[#cbd5e1]">Examination</th>
            <th className="text-left p-3 text-[#cbd5e1]">Result</th>
            <th className="text-left p-3 text-[#cbd5e1]">Status</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.subject} className="border-b border-white/6">
              <td className="p-3">{exam.title}</td>
              <td className="p-3">{exam.result}</td>
              <td className="p-3">
                <button
                  className="info"
                  data-exam={exam.subject}
                  onClick={() => router.push(`/exam/start/${exam.subject}`)}
                >
                  {exam.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
