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
  userId: string;
  username: string;
  email: string;
  personId: number;
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  birthDate: string;
  nationalId: string;
  addressId: number;
  isPrimaryAddress: boolean;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  contactId: number;
  isPrimaryContact: boolean;
  phoneNumber: string;
  emergencyContactPhone: string;
  bio: string;
  notifications: boolean;
}): Profile {
  return {
    user: {
      id: data.userId,
      username: data.username,
      email: data.email,
      notifications: data.notifications,
      updatedBy: data.userId,
    },
    person: {
      id: data.personId,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      birthDate: data.birthDate,
      nationalId: data.nationalId,
      bio: data.bio,
      updatedBy: data.userId,
    },
    contact: {
      id: data.contactId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isPrimary: data.isPrimaryContact,
      personId: data.personId,
      updatedBy: data.userId,
    },
    address: {
      id: data.addressId,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      isPrimary: data.isPrimaryAddress,
      personId: data.personId,
      updatedBy: data.userId,
    },
  };
}
