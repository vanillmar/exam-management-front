"use client";

import RegisterCard from "@/components/RegisterCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return (
    <div>
      <RegisterCard />
    </div>
  );
}
