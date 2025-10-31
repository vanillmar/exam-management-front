// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/token";
import { login } from "@/services/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        try {
          const response = await login(
            credentials.username,
            credentials.password,
          );
          const { token, refreshToken, expiresAt } = response;
          if (!token) return null;
          const decoded = jwtDecode<DecodedToken>(token);
          return {
            id: decoded.id,
            email: decoded.email,
            username: decoded.sub,
            avatar: decoded.avatar,
            roles: decoded.roles,
            token: token,
            refreshToken: refreshToken,
            expiresIn: expiresAt,
          };
        } catch (err) {
          let message: string;
          if (axios.isAxiosError(err)) {
            message = err.response
              ? JSON.stringify(err.response.data) + " - " + err.message
              : err.message;
          } else {
            message = (err as Error).message ?? "Authentication error";
          }
          console.error("Credentials authorize error:", message);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      // First login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.avatar = user.avatar;
        token.roles = user.roles;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        avatar: token.avatar,
        roles: token.roles,
      };
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresIn = token.expiresIn;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  secret: process.env.NEXTAUTH_SECRET ?? "my_secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default handler;
