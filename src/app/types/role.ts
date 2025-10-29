import { Permission } from "./permission";
import { Response } from "./response";

export interface Role {
  id: number;
  name: string; // e.g. "ROLE_ADMIN"
  description?: string;
  permissions: Permission[];
}

export const Roles = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
  INSPECTOR: "INSPECTOR",
  PILOT: "PILOT",
  USER: "USER",
  ALL: "ROLE.*",
} as const;

export const RoleRedirects: Record<string, string> = {
  [Roles.ADMIN]: "/admin/dashboard",
  [Roles.INSTRUCTOR]: "/instructor/dashboard",
  [Roles.STUDENT]: "/student/dashboard",
  [Roles.INSPECTOR]: "/inspector/dashboard",
  [Roles.PILOT]: "/pilot/dashboard",
  [Roles.USER]: "/user/dashboard",
  [Roles.ALL]: "/user/dashboard",
};

export type RoleResponse = Response<Role>;
export type RolesResponse = Response<Role[]>;
