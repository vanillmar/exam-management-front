import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <Spinner
        aria-label="Loading spinner"
        size="xl"
        className="text-blue-600 dark:text-blue-500"
      />
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    </div>
  );
}
