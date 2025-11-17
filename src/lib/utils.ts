import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Convenience helper to combine Tailwind class names without duplicates
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
