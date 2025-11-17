import { PrismaClient } from "@prisma/client";

// Keep a single Prisma instance across hot reloads to avoid connection leaks
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable detailed logs for debugging
  });

// Cache the client in development so Next.js doesn't spawn extras on reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
