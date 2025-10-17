import { Spinner } from "@/components/ui/spinner"
export default function LoadingScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <Spinner aria-label="Loading spinner" className="size-8 text-yellow-500"/>
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    </div>
  );
}
