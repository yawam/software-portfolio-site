"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import ChatInterface from "@/components/ChatInterface";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function AiAssistant() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading")
    return (
      <div className="flex h-screen w-full animate-pulse items-center justify-center text-3xl text-amber-300">
        Loading…
      </div>
    );

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/aiassistant" });
    toast.success("Signed in successfully");
  };
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Signed out successfully");
  };

  const handleCloseSignInModal = () => {
    router.push("/aboutme");
  };

  if (!session) {
    return (
      <div className="duration transition-opacity-300 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-slide-in relative flex h-auto min-h-[45%] w-[90%] max-w-md translate-y-0 transform flex-col items-center justify-center rounded-xl border border-sky-300 bg-zinc-900 p-6 shadow-lg transition-all duration-300 md:w-[50%] md:translate-y-0">
          <button
            onClick={() => handleCloseSignInModal()}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          >
            <X size={35} />
          </button>
          <h2 className="mb-4 mt-4 text-center text-3xl">
            Sign in to chat with Papa Yaw’s assistant
          </h2>
          <button
            onClick={handleSignIn}
            className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-lg text-black shadow-md transition hover:bg-gray-200"
          >
            <FcGoogle size={35} />
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-center text-2xl text-white">
        Welcome {session.user?.name}, Ask me anything about PY and his work
      </h1>
      <ChatInterface />
      <button
        onClick={handleSignOut}
        className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
