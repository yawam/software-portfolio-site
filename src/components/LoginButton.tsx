"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/admin" })}
      className="mt-4 flex items-center gap-2 rounded bg-white px-4 py-2 text-black shadow hover:bg-gray-200"
    >
      <FcGoogle size={24} />
      <span>Continue with Google</span>
    </button>
  );
}
