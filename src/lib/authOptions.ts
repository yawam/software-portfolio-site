// src/lib/authOptions.ts (or wherever you like)
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Session } from "next-auth";

// Centralized NextAuth configuration for Google OAuth sessions
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: Session }) {
      // Return the base session untouched so user info remains consistent
      return session;
    },
  },
};
