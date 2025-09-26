"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api, { clearAuthToken } from "@/lib/axios";

/**
 * Client-side hook that validates an auth token (stored in localStorage)
 * and redirects to /login when missing/invalid. Returns `true` while
 * checking and `false` once validation completes (or redirect happens).
 */
export default function useRequireAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // no token -> go to login
          router.replace("/login");
          return;
        }

        // axios instance reads the token from localStorage in its request
        // interceptor, so a simple validation request is enough.
        await api.get("/auth/validate");

        if (mounted) setLoading(false);
      } catch {
        try {
          clearAuthToken();
        } catch {}
        router.replace("/login");
      }
    };

    check();

    return () => {
      mounted = false;
    };
  }, [router]);

  return loading;
}
