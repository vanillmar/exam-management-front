import { Profile } from "@/types/profile";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRedirectPath(roles: string[]): string {
  const map: Record<string, string> = {
    ADMIN: "/admin/dashboard",
    INSPECTOR: "/inspector/dashboard",
    INSTRUCTORS: "/instructors/dashboard",
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

export function convertToProfile(data: {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  birthDate: string;
  nationalId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  emergencyContactPhone: string;
  bio: string;
  notifications: boolean;
}): Profile {
  return {
    user: {
      id: data.id,
      username: data.username,
      email: data.email,
      notifications: data.notifications,
    },
    person: {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      birthDate: data.birthDate,
      nationalId: data.nationalId,
      bio: data.bio,
    },
    contact: {
      phoneNumber: data.phoneNumber,
      emergencyContactPhone: data.emergencyContactPhone,
    },
    address: {
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
    },
  };
}
