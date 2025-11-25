import { BaseAuditableEntity } from "./base-aditable-entity";
import { Person } from "./person";
import { Response } from "./response";
import { Role } from "./role";

export type UUID = string;

export type User = {
  id: UUID;
  username: string;
  password?: string;
  email: string;
  roles: Role[];
  notifications: boolean;
  person?: Person | null;
  avatar?: string | null;
  bio?: string | null;
  active: boolean;
  enabled: boolean;
} & BaseAuditableEntity;

export interface ProfilePicture {
  url: string;
}

export interface TotalUsers {
  total: number;
}

export type UsersResponse = Response<User[]>;
export type UserResponse = Response<User>;

export type ProfilePictureResponse = Response<ProfilePicture>;

export type TotalActiveUsers = TotalUsers;
export type TotalInactiveUsers = TotalUsers;

export type TotalUsersResponse = Response<TotalUsers>;
export type TotalActiveUsersResponse = Response<TotalActiveUsers>;
export type TotalInactiveUsersResponse = Response<TotalInactiveUsers>;

export default User;
