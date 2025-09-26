"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api, { clearAuthToken } from "@/lib/axios";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        // The axios instance attaches the token from localStorage via interceptor,
        // so a simple validation call is enough.
        await api.get("/auth/validate");
        router.replace("/dashboard");
      } catch {
        try {
          clearAuthToken();
        } catch {}
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-sm text-muted">Checking authentication…</span>
      </div>
    );
  }

  return null;
}
