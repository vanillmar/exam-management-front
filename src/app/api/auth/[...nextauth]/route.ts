// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// NextAuth in the App Router requires exporting HTTP method handlers (GET/POST) from the route file.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // If credentials are missing, return null so NextAuth responds with 401 instead of an empty body
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(
            `http://127.0.0.1:8080/api/auth/login`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            { timeout: 5000 },
          );
          const user = response.data;
          if (user && user.token) {
            return {
              id: user.id ?? user.username,
              name: user.username ?? user.email ?? "",
              token: user.token,
            };
          }
          // Return null on invalid credentials to allow NextAuth to send a proper JSON error
          return null;
        } catch (err) {
          // Normalize axios errors to avoid throwing non-serializable objects
          const message = axios.isAxiosError(err)
            ? // If the server responded with a body, include it for easier debugging
              err.response
              ? JSON.stringify(err.response.data) + " - " + err.message
              : err.message
            : ((err as Error).message ?? "Authentication error");
          // Returning null here prevents NextAuth from sending an empty/non-JSON response
          // and results in a predictable 401 response on the client
          console.error("Credentials authorize error (normalized):", message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debug for development; disable in production
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // The 'user' object comes from authorize return value. Use safe assignment through unknown casts
        token.id = (user as unknown as { id?: string }).id ?? token.id;
        token.username =
          (user as unknown as { name?: string }).name ?? token.username;
        token.accessToken =
          (user as unknown as { token?: string }).token ?? token.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Guard against undefined session.user and keep types safe by casting through unknown
      const userRecord = session.user ?? ({} as unknown as typeof session.user);
      (userRecord as unknown as { id?: string }).id =
        (token as unknown as { id?: string }).id ??
        (userRecord as unknown as { id?: string }).id;
      (userRecord as unknown as { username?: string }).username =
        (token as unknown as { username?: string }).username ??
        (userRecord as unknown as { username?: string }).username;
      // Attach back to session
      session.user = userRecord as typeof session.user;
      // Attach accessToken to session via unknown cast to allow adding custom fields
      (session as unknown as Record<string, unknown>).accessToken =
        (token as unknown as { accessToken?: string }).accessToken ??
        (session as unknown as Record<string, unknown>).accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Your login page
    newUser: "/register",
  },
  // Provide a fallback secret during development to avoid NextAuth returning invalid/empty responses
  secret: process.env.NEXTAUTH_SECRET ?? "my_secret", // Add a secret in .env for production
};

// Create a configured handler from NextAuth and export it for the App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export default handler;
