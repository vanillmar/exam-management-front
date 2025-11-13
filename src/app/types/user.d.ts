import { BaseAuditableEntity } from "./base-aditable-entity";
import { Response } from "./response";
import { Role } from "./role";

export type UUID = string;

type User = {
  id: UUID;
  username: string;
  email: string;
  roles: Role[];
  notifications: boolean;
  avatar?: string | null;
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
