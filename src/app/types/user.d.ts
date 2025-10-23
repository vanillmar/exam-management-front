import { Response } from "./response";

export type UUID = string;

export interface Permission {
  id: number;
  name: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string; // e.g. "ROLE_ADMIN"
  description?: string;
  permissions: Permission[];
}

export default interface User {
  id: UUID;
  username: string;
  email: string;
  roles: Role[];
}

export interface TotalUsers {
  total: number;
}

export type UsersResponse = Response<User[]>;
export type UserResponse = Response<User>;

export type TotalActiveUsers = TotalUsers;
export type TotalInactiveUsers = TotalUsers;

export type TotalUsersResponse = Response<TotalUsers>;
export type TotalActiveUsersResponse = Response<TotalActiveUsers>;
export type TotalInactiveUsersResponse = Response<TotalInactiveUsers>;
