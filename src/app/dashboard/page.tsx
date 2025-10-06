"use client";

import Image from "next/image";
import Topbar from "@/components/Topbar";
import ExamTable from "@/components/ExamTable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <LoadingScreen />;
  if (!session) return null;
  return (
    <div className="px-6 py-2">
      <Topbar />
      <div className="max-w-[860px] mx-auto text-center my-8">
        <Image
          src="/logo.png"
          alt="Welcome Logo"
          width={120}
          height={40}
          className="w-[280px] mx-auto opacity-95 drop-shadow-xl"
        />
        <h1 className="text-4xl my-2.5">Welcome to Fedjtech Exam</h1>
        <p className="text-muted">Select an examination to begin.</p>
      </div>
      <ExamTable />
    </div>
  );
}
