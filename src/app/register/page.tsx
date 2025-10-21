"use client";

import RegisterCard from "@/components/RegisterCard";
import { getRedirectPath } from "@/lib/utils";
import { Role } from "@/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const roles: Role[] = session?.user?.roles ?? [];
      const firstRole = roles[0]?.name;
      router.push(getRedirectPath(firstRole));
    }
  }, [session, router]);

  return (
    <div>
      <RegisterCard />
    </div>
  );
}
