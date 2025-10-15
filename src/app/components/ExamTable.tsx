"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Exam, ExamResponse } from "@/types/exam";

export default function ExamTable() {
  const { data: session } = useSession();
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get<ExamResponse>(`/exams`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        setExams(response.data.data);
      } catch {
        // Throw the error to trigger the global error boundary
        throw new Error("Failed to load exams.");
      }
    };
    if (session?.accessToken) {
      fetchExams();
    }
  }, [session?.accessToken]);

  // If we reach here without error, render the table
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
            <tr key={exam.id} className="border-b border-white/6">
              <td className="p-3">{exam.title}</td>
              <td className="p-3">{exam.result}</td>
              <td className="p-3">
                <Button
                  color="green"
                  data-exam={exam.subject}
                  onClick={() =>
                    router.push(`/exam/start/${exam.subject.name}`)
                  }
                >
                  {exam.examStatus.name}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
