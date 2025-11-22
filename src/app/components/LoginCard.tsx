"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { getRedirectPath } from "@/lib/utils";

export default function LoginCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        setError(
          result.error || "Unknown error occurred, please try again later.",
        );
        setLoading(false);
        return;
      }
      const session = await getSession(); // Get the newly created session
      if (result?.ok && session) {
        router.push(getRedirectPath(session.user.roles));
      }
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[520px] mx-auto mt-[8vh] glass p-5 flex flex-col gap-3.5">
      <div className="flex justify-center mb-0">
        <Image
          priority={false}
          src="/logo.png"
          alt="Login Logo"
          width={120}
          height={40}
          className="opacity-95 drop-shadow-lg"
          loading="lazy"
        />
      </div>
      <h2 className="text-2xl font-extrabold mb-3">Sign In</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
        <Label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Username</span>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Label>
        <Label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Label>
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 cta rounded-lg"
        >
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>
      {error && (
        <p className="text-center text-sm text-red-300 mt-2">{error}</p>
      )}
      <p className="text-center text-muted">Login — use your credentials.</p>
      <p className="text-center text-muted">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-blue-300">
          Sign Up
        </a>
      </p>
    </div>
  );
}
