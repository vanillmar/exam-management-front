"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRedirectPathByRole } from "@/lib/util";
import { Role } from "@/types/user";

import LoginCard from "@/components/LoginCard";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const roles: Role[] = session?.user?.roles ?? [];
      const firstRole = roles[0]?.name;
      router.push(getRedirectPathByRole(firstRole));
    }
  }, [session, router]);

  return <LoginCard />;
}
