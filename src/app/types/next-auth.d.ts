// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email?: string;
      avatar?: string;
      roles: string[];
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }

  interface User {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
    roles: string[];
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
    roles: string[];
    token: string;
    refreshToken: string;
    expiresIn: number;
  }
}
