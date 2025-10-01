import React from "react";
import ClientExamWrapper from "./ClientExamWrapper";

// Server component: await params safely and render a client component wrapper.
export default async function ExamPage({
  params,
}: {
  readonly params: { readonly subject: string };
}) {
  // `params` in Next.js app router can be a proxy in development. Await it to safely access properties.
  const resolvedParams = (await params) as { subject: string };
  const subject = resolvedParams.subject;
  return <ClientExamWrapper subject={subject} />;
}
