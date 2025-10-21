"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRedirectPath as redirectPath } from "@/lib/utils";

import LoginCard from "@/components/LoginCard";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const roles: string[] = session.user?.roles;
      router.push(redirectPath(roles));
    }
  }, [session, router]);

  return <LoginCard />;
}
