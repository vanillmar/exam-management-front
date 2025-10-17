import LoadingScreen from "@/components/LoadingScreen";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <LoadingScreen />
    </div>
  );
}
