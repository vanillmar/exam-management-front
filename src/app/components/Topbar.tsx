"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Topbar() {
  const [time, setTime] = useState("--:--");
  const { data: session, status } = useSession();

  useEffect(() => {
    const tickClock = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
    };
    tickClock();
    const interval = setInterval(tickClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in</div>;
  }
  const name = session?.user?.name;

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-black/50 backdrop-blur border-b border-white/6">
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 font-bold tracking-wide text-white"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={34}
          height={34}
          className="rounded-lg bg-white/5 p-1"
        />
        <span className="text-lg">Fedjtech Exam</span>
      </Link>
      <div className="flex items-center gap-2.5">
        <span className="text-muted">{time}</span>
        <span className="text-muted">{name}</span>
        {name && (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="ghost"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}
