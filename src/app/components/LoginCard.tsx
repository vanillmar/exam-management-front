"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api, { setAuthToken, clearAuthToken } from "@/lib/axios";
import { AuthResponseDTO, ResponseDTO } from "@/types/auth";
import axios from "axios";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to check if resp has a token
  const hasToken = (resp: ResponseDTO | AuthResponseDTO): boolean => {
    // Type guard to check if resp is AuthResponse
    if ("token" in resp) {
      // Ensure token is a non-empty string
      return typeof resp.token === "string" && resp.token.length > 0;
    }
    return false;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setUsername(username.trim()); // Trim whitespace from username
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    setLoading(true);
    try {
      // POST credentials to the auth endpoint. Use absolute URL so it works regardless of api.baseURL.
      const resp = await api.post<ResponseDTO | AuthResponseDTO>(
        "/auth/login",
        { username, password },
      );
      const respData: ResponseDTO | AuthResponseDTO = resp.data;
      if (!hasToken(respData)) {
        setError("Login failed. " + respData.message);
        setLoading(false);
        return;
      }
      // Persist username for UI and store token for api helper
      if ("username" in respData && typeof respData.username === "string") {
        localStorage.setItem("fedjtech_user", respData.username);
      }
      if ("token" in respData && typeof respData.token === "string") {
        setAuthToken(respData.token);
      }
      // Navigate to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      // Try to extract a useful message from the server response (type-safe)
      let serverMessage: string | undefined;
      if (
        axios.isAxiosError(err) &&
        err.response &&
        typeof err.response.data === "object"
      ) {
        const data = err.response.data as Record<string, unknown>;
        if (typeof data.message === "string") serverMessage = data.message;
        else if (typeof data.error === "string") serverMessage = data.error;
      }
      setError(serverMessage ?? "Invalid username or password");
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
