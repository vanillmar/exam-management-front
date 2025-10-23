"use client";

import RegisterCard from "@/components/RegisterCard";
import { getRedirectPath } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const roles = session?.user?.roles;
      router.push(getRedirectPath(roles));
    }
  }, [session, router]);

  return (
    <div>
      <RegisterCard />
    </div>
  );
}
