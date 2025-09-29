"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

interface Role {
  id: string;
  name: string;
}

export default function RegisterCard() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/roles`,
        );
        setRoles(response.data.roles);
        if (response.data.length > 0) {
          setRoleId(response.data[0].id); // Set default role to first option
        }
      } catch {
        setError("Failed to load roles");
      }
    };
    fetchRoles();
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const trimmedUsername = username.trim();
    setUsername(trimmedUsername);

    if (!firstname || !lastname || !trimmedUsername || !email || !password || !confirmPassword || !roleId) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        { 
            firstname, lastname,
            username: trimmedUsername, email,
            password, roleId,
            isActive: enabled
        },
      );
      setSuccess(response.data.message || "Registration successful!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.log(err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Registration failed"
        : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[520px] mx-auto mt-[8vh] glass p-5 flex flex-col gap-3.5">
      <div className="flex justify-center mb-0">
        <Image
          src="/logo.png"
          alt="Register Logo"
          width={120}
          height={40}
          className="opacity-95 drop-shadow-lg"
        />
      </div>
      <h2 className="text-2xl font-extrabold mb-3">Sign Up</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Firstname</span>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Lastname</span>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text"
          />
        </label>
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
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <span>Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1]">
          <span>Role</span>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="w-full h-10 bg-white/8 border border-white/12 rounded-10 px-3 text-text"
          >
            {roles.length === 0 && <option value="">Loading roles...</option>}
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[#cbd5e1] items-start">
            <span>Enabled</span>
            <input
                name="enabled"
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className=" h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"/>
        </label>
        <button
          type="submit"
          disabled={loading || roles.length === 0}
          className="w-full h-10 cta rounded-lg"
        >
          {loading ? "Signing up…" : "Sign Up"}
        </button>
      </form>
      {error && (
        <p className="text-center text-sm text-red-300 mt-2">{error}</p>
      )}
      {success && (
        <p className="text-center text-sm text-green-300 mt-2">{success}</p>
      )}
      <p className="text-center text-muted">
        Already have an account?{" "}
        <a href="/login" className="text-blue-300">
          Sign in
        </a>
      </p>
    </div>
  );
}
