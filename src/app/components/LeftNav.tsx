"use client";

import { useState } from "react";

interface LeftNavProps {
  total: number;
  answers: (number | null)[];
  marked: Set<number>;
  currentIndex: number;
  onSelect: (index: number) => void;
  onFinish: () => void;
}

export default function LeftNav({
  total,
  answers,
  marked,
  currentIndex,
  onSelect,
  onFinish,
}: LeftNavProps) {
  const [timer] = useState("2:30:00");

  return (
    <div className="sticky top-16 bg-white/3 border border-white/8 rounded-lg p-2.5 flex flex-col gap-2.5 h-[calc(100vh-110px)]">
      <div className="grid grid-cols-5 gap-1.5 mb-1.5">
        <button className="icon-btn">◀</button>
        <button className="icon-btn">▶</button>
        <button className="icon-btn">★</button>
        <button className="icon-btn">📎</button>
        <button className="icon-btn">💬</button>
        <button className="finish-btn col-span-5" onClick={onFinish}>
          Finish
        </button>
      </div>
      <div className="text-center text-sm border border-dashed border-white/10 p-1.5">
        {timer}
      </div>
      <div className="
        p-2
        grid grid-cols-5 
        gap-1.5 overflow-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
      ">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            className={`q-btn ${answers[i] !== null ? "answered" : ""} ${marked.has(i) ? "marked" : ""} ${
              i === currentIndex ? "current" : ""
            }`}
            onClick={() => onSelect(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="text-sm text-[#cbd5e1] text-center">
        Processed: {answers.filter((a) => a !== null).length}/{total}
      </div>
    </div>
  );
}
