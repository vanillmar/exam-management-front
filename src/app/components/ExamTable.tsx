"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useSession } from 'next-auth/react';

interface Exam {
  subject: string;
  title: string;
  result: string;
  status: ExamStatus;
}
interface ExamStatus {
  id: number;
  name: string;
}
interface ExamResponse {
  timestamp: string;
  status: number;
  message: string;
  success: boolean;
  data: Exam[];
}

export default function ExamTable() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [exams, setExams] = useState<Exam[]>([]); 

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get<ExamResponse>(`/exams`,{
          headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
        });
        setExams(response.data.data);
      } catch(err) {
        console.error(err);
        setError("Failed to load exams.");
      }
    };
    fetchExams();
  }, []);

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
     
          {error ?? exams.map((exam) => (
            <tr key={exam.subject} className="border-b border-white/6">
              <td className="p-3">{exam.title}</td>
              <td className="p-3">{exam.result}</td>
              <td className="p-3">
                <Button
                  color="green"
                  data-exam={exam.subject}
                  onClick={() => router.push(`/exam/start/${exam.subject}`)}
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
