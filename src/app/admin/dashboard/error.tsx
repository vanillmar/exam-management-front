"use client"; // Error boundaries must be Client Components

import ErrorToast from "@/components/ErrorToast";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return <ErrorToast message={error.message} retry={() => reset()} />;
}
