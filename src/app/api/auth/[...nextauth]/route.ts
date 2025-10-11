// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/lib/axios";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

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
          if (user && user.token) {
            return {
              id: user.id ?? user.username,
              name: user.username ?? user.email ?? "",
              token: user.token,
              roles: user.roles ?? [], // ✅ make sure roles is plural
            };
          }

          return null;
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
  debug: true,

  callbacks: {
    // ✅ Store roles in JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id ?? token.id;
        token.username = (user as any).name ?? token.username;
        token.email = (user as any).email ?? token.email;
        token.accessToken = (user as any).token ?? token.accessToken;
        token.roles = (user as any).roles ?? []; // ✅ save roles into token
      }
      return token;
    },

    // ✅ Expose roles to session
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
        (session.user as any).email = token.email;
        (session.user as any).roles = token.roles ?? []; // ✅ roles added here
      }
      (session as any).accessToken = token.accessToken;
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
