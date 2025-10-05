"use client";
import ErrorToast from "./components/ErrorToast";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <ErrorToast message={error.message} retry={() => reset()} />
      </body>
    </html>
  );
}
