import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRedirectPath(roles: string[]): string {
  const map: Record<string, string> = {
    ADMIN: "/admin/dashboard",
    INSPECTOR: "/inspector/dashboard",
    PILOT: "/pilot/dashboard",
    STUDENT: "/student/dashboard",
    USER: "/user/dashboard",
  };

  const priority = ["ADMIN", "TEACHER", "STUDENT", "USER"];

  for (const role of priority) {
    if (roles.includes(role)) {
      return map[role];
    }
  }

  return "/home";
}
