// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/token";

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
          const response = await axiosInstance.post(
            `/auth/login`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            { timeout: 5000 },
          );

          const user = response.data.data;
          if (!user?.token) return null;
          const decoded = jwtDecode<DecodedToken>(user.token);
          return {
            id: decoded.id,
            email: decoded.email,
            username: decoded.sub,
            roles: decoded.roles, // parse if stringified
            token: user.token,
          };
        } catch (err) {
          const message = axios.isAxiosError(err)
            ? err.response
              ? JSON.stringify(err.response.data) + " - " + err.message
              : err.message
            : ((err as Error).message ?? "Authentication error");
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
        token.roles = user.roles;
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        roles: token.roles,
      };
      session.accessToken = token.accessToken;
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
