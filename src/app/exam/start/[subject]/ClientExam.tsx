"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import LeftNav from "@/components/LeftNav";
import QuestionArea from "@/components/QuestionArea";
import CalculatorModal from "@/components/CalculatorModal";
import CommentModal from "@/components/CommentModal";
import AttachmentModal from "@/components/AttachmentModal";
import FinishModal from "@/components/FinishModal";
import { fetchQuestions, Question } from "@/lib/api";

const PASS_MARK = 75;
const LIMIT_SECONDS = 2 * 60 * 60 + 30 * 60; // 2h30

export default function ClientExam({ subject }: { subject: string }) {
  const router = useRouter();
  const [currentSet, setCurrentSet] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [takeCount, setTakeCount] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [marked, setMarked] = useState(new Set<number>());
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [remainingSeconds, setRemainingSeconds] = useState(LIMIT_SECONDS);
  const [showCalc, setShowCalc] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(subject);
        const questionCount = data.questionCount; // Assuming the API returns questionCount

        const shuffled = [...data.questions]
          .sort(() => Math.random() - 0.5)
          .slice(0, questionCount);
        setCurrentSet(shuffled);
        setTakeCount(questionCount);
        setAnswers(Array(questionCount).fill(null));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    loadQuestions();

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          finishExam(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, takeCount]);

  const handleAnswer = (index: number, option: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = option;
      return newAnswers;
    });
  };

  const handleMark = (index: number) => {
    setMarked((prev) => {
      const newMarked = new Set(prev);
      if (newMarked.has(index)) newMarked.delete(index);
      else newMarked.add(index);
      return newMarked;
    });
  };

  const finishExam = (auto: boolean) => {
    let correct = 0;
    for (let i = 0; i < takeCount; i++) {
      if (answers[i] === currentSet[i]?.answerIndex) correct++;
    }
    const score = Math.round((correct / takeCount) * 100);
    const status = score >= PASS_MARK ? "PASS" : "FAIL";
    const elapsed = LIMIT_SECONDS - remainingSeconds;
    const pad = (n: number) => String(n).padStart(2, "0");
    const time = `${pad(Math.floor(elapsed / 3600))}:${pad(Math.floor((elapsed % 3600) / 60))}:${pad(elapsed % 60)}`;

    router.push(
      `/result?score=${score}&status=${status}&correct=${correct}/${takeCount}&time=${time}&summary=${
        auto
          ? "Time is up. Your examination was auto-submitted."
          : "Your examination data has been successfully submitted."
      }`,
    );
  };

  if (!currentSet.length) return <div>Loading...</div>;

  return (
    <div>
      <Topbar />
      <div className="exam-split grid grid-cols-[280px_1fr] gap-4 max-w-[1200px] mx-auto max-md:grid-cols-1">
        <LeftNav
          total={takeCount}
          answers={answers}
          marked={marked}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
          onFinish={() => setShowFinish(true)}
        />
        <QuestionArea
          question={currentSet[currentIndex]}
          index={currentIndex}
          total={takeCount}
          answers={answers}
          marked={marked}
          onAnswer={handleAnswer}
          onMark={handleMark}
        />
      </div>
      {showCalc && <CalculatorModal onClose={() => setShowCalc(false)} />}
      {showComment && (
        <CommentModal
          comment={comments[currentIndex] || ""}
          onSave={(text) => {
            setComments((prev) => ({ ...prev, [currentIndex]: text }));
            setShowComment(false);
          }}
          onClose={() => setShowComment(false)}
        />
      )}
      {showAttachment && (
        <AttachmentModal onClose={() => setShowAttachment(false)} />
      )}
      {showFinish && (
        <FinishModal
          remaining={answers.filter((a) => a === null).length}
          onCancel={() => setShowFinish(false)}
          onConfirm={() => finishExam(false)}
        />
      )}
    </div>
  );
}