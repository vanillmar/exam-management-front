import { Response } from "./response";
import { Role } from "./role";

export type UUID = string;

export default interface User {
  id: UUID;
  username: string;
  email: string;
  roles: Role[];
}

export interface ProfilePicture {
  url: string
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
