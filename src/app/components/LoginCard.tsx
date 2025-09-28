"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api, { clearAuthToken } from "@/lib/axios";
import { AuthResponseDTO, ResponseDTO } from "@/types/auth";
import { hasToken, persistAuth, extractErrorMessage } from "@/lib/utils";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Helper to navigate to dashboard
  const goToDashboard = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const trimmedUsername = username.trim();
    setUsername(trimmedUsername); // Trim whitespace from username
    if (!trimmedUsername) {
      setError("Please enter a username");
      return;
    }
    setLoading(true);
    try {
      const resp = await api.post<ResponseDTO | AuthResponseDTO>(
        "/auth/login",
        { username: trimmedUsername, password },
      );
      const respData: ResponseDTO | AuthResponseDTO = resp.data;
      if (!hasToken(respData)) {
        setError("Login failed. " + respData.message);
        return;
      }
      persistAuth(respData);
      goToDashboard();
    } catch (err: unknown) {
      setError(extractErrorMessage(err));
      try {
        clearAuthToken();
      } catch {}
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[520px] mx-auto mt-[8vh] glass p-5 flex flex-col gap-3.5">
      <div className="flex justify-center mb-0">
        <Image
          src="/logo.png"
          alt="Login Logo"
          width={120}
          height={40}
          className="opacity-95 drop-shadow-lg"
        />
      </div>
      <h2 className="text-2xl font-extrabold mb-3">Sign In</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Language</span>
          <select className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text">
            <option>English</option>
            <option>Português</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 cta rounded-lg"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
      {error && (
        <p className="text-center text-sm text-red-300 mt-2">{error}</p>
      )}
      <p className="text-center text-muted">
        Demo login — use any credentials.
      </p>
    </div>
  );
}
