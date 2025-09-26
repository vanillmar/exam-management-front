import React from "react";
import ClientExamWrapper from "./ClientExamWrapper";

// Server component: await params safely and render a client component wrapper.
export default function ExamPage({
  params,
}: {
  readonly params: { readonly subject: string };
}) {
  // `params` in Next.js app router is a plain object in production, but in dev it can be a proxy.
  // Access it synchronously here (server component) — do not use `params` inside a client component.
  const subject = params.subject;
  return <ClientExamWrapper subject={subject} />;
}
