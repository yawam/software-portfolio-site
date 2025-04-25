"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface LoginButtonProps {
  text: string;
}

export default function LoginButton({ text }: LoginButtonProps) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/admin" })}
      className="mt-4 flex items-center gap-2 rounded bg-white px-4 py-2 text-black shadow hover:bg-gray-200"
    >
      <FcGoogle size={24} />
      <span>{text}</span>
    </button>
  );
}
