"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("fedjtech_user", username.trim());
      router.push("/dashboard");
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
        <button type="submit" className="w-full h-10 cta rounded-lg">
          Sign In
        </button>
      </form>
      <p className="text-center text-muted">
        Demo login — use any credentials.
      </p>
    </div>
  );
}
