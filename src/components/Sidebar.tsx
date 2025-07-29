"use client";
import { BsLayoutSidebar } from "react-icons/bs";
import { ReactNode } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  children?: ReactNode;
}

export default function Sidebar({
  open,
  onClose,
  onLogout,
  children,
}: SidebarProps) {
  return (
    <div
      className={`fixed left-0 top-2 z-40 flex h-[90vh] w-[70vw] max-w-xs flex-col rounded-xl bg-neutral-500/30 p-4 shadow-lg transition-all duration-500 ease-in-out md:top-[90px] md:h-[87vh] ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        type="button"
        className="flex h-[32px] w-[32px] items-center justify-center rounded-xl px-1 py-2 transition-all hover:scale-105 hover:cursor-pointer hover:bg-neutral-800 hover:shadow-lg"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <BsLayoutSidebar size={25} />
      </button>
      {/* Sidebar content */}
      <div className="w-full flex-1">{children}</div>
      <div className="mt-auto flex w-full justify-end">
        <button
          onClick={onLogout}
          className="rounded-xl bg-zinc-100 px-4 py-2 text-black transition-all hover:bg-zinc-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
