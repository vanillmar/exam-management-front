"use client";

import dynamic from "next/dynamic";
import React from "react";

const ClientExam = dynamic(() => import("./ClientExam"), { ssr: false });

export default function ClientExamWrapper({ subject }: { subject: string }) {
  return <ClientExam subject={subject} />;
}
