"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeModeScript, ThemeProvider } from "flowbite-react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/custom.css"; // Import your new custom CSS after Tailwind
import fedgtechTheme from "./styles/fedgtechTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider theme={fedgtechTheme}>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
