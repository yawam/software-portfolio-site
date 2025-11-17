// components/AuthProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";

// Wraps pages in NextAuth's session provider for client components
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
