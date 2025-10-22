"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
// import "./styles/custom.css"; // Import your new custom CSS after Tailwind

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
