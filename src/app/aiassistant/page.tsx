"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import ChatInterface from "@/components/ChatInterface";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsLayoutSidebar } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function AiAssistant() {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Always close sidebar on mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

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
    <div className="relative flex h-[87vh] w-full p-2 md:mt-[7px] md:space-x-6">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-30 flex h-[87vh] flex-col rounded-xl bg-neutral-500/30 p-4 shadow-lg transition-all duration-500 ease-in-out ${sidebarOpen ? "w-[70vw] max-w-xs translate-x-0" : "w-[70vw] max-w-xs -translate-x-[100%]"} md:static md:flex md:w-[20%] md:max-w-none md:translate-x-0`}
        style={{ minHeight: "calc(87vh - 0.5rem)" }}
      >
        <div
          className="flex w-[15%] items-center justify-center rounded-xl px-1 py-2 transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral-800 hover:shadow-lg"
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <BsLayoutSidebar size={25} />
        </div>
        {/* still working on this part. we are going to store chats and other features here. AI responses still need more training as well. Logout button works though. */}
        <div className="mt-auto flex w-full justify-end">
          <button
            onClick={handleSignOut}
            className="rounded-xl bg-zinc-100 px-4 py-2 text-black transition-all hover:bg-zinc-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar open button (shows when sidebar is closed, always visible on mobile) */}
      {(!sidebarOpen || isMobile) && (
        <button
          className="fixed left-2 top-4 z-40 flex items-center justify-center rounded-xl bg-neutral-700 p-2 shadow-lg transition-all hover:scale-110 hover:bg-neutral-800 md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <BsLayoutSidebar size={25} className="text-white" />
        </button>
      )}

      {/* Chat area, width adjusts based on sidebar state and screen size */}
      <div
        className={`ml-auto flex h-full flex-col items-center justify-center rounded-xl transition-all duration-500 ease-in-out ${sidebarOpen && !isMobile ? "w-[80%]" : "w-full"}`}
      >
        <ChatInterface username={session.user?.name ?? ""} />
      </div>
    </div>
  );
}
