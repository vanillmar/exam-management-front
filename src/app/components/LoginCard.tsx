"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const trimmedUsername = username.trim();
    setUsername(trimmedUsername);
    if (!trimmedUsername) {
      setError("Please enter a username");
      return;
    }
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect
        username: trimmedUsername,
        password,
      });
      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }
      // Successful login, redirect to dashboard
      router.push("/dashboard");
    } catch {
      setError("An unexpected error occurred");
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
