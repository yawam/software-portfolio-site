"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import ChatInterface from "@/components/ChatInterface";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsLayoutSidebar } from "react-icons/bs";
import { VscRefresh } from "react-icons/vsc";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useState } from "react";

// Chat page that protects access behind Google auth and hosts the assistant UI
export default function AiAssistant() {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  if (status === "loading")
    return (
      <div className="flex h-screen w-full animate-pulse items-center justify-center text-3xl text-amber-300">
        Loading…
      </div>
    );

  // Trigger Google login flow and bounce back to the assistant
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/aiassistant" });
    toast.success("Signed in successfully");
  };
  // Explicit sign-out returns visitors to the homepage
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Signed out successfully");
  };

  const handleCloseSignInModal = () => {
    router.push("/aboutme");
  };
  console.log("Session:", session);

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
    <div className="relative flex h-[87vh] w-full items-center justify-center p-2 md:mt-[7px] md:w-full">
      {/* Sidebar as modal/portal */}
      <Sidebar
        open={sidebarOpen}
        user_name={session.user?.name ?? ""}
        user_image={session.user?.image ?? ""}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleSignOut}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <button
            className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-neutral-700 p-4 shadow-lg transition-all hover:scale-105 hover:bg-neutral-800"
            onClick={() => window.location.reload()}
            aria-label="Refresh chat"
          >
            <VscRefresh
              size={35}
              className="text-white group-hover:animate-spin"
            />
            <span className="mt-2 text-lg font-semibold text-white">
              Refresh the chat
            </span>
          </button>
        </div>
      </Sidebar>

      {/* Sidebar open button (always visible when sidebar is closed) */}
      {!sidebarOpen && (
        <button
          className="fixed left-4 top-24 z-50 flex items-center justify-center rounded-xl bg-neutral-700 p-2 shadow-lg transition-all hover:scale-110 hover:bg-neutral-800"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <BsLayoutSidebar size={25} className="text-white" />
        </button>
      )}
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center rounded-xl transition-all duration-500 ease-in-out md:max-w-[80%]">
        <ChatInterface username={session.user?.name ?? ""} />
      </div>
    </div>
  );
}
