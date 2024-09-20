"use client";

import Link from "next/link";
import {
  FaHome,
  FaProjectDiagram,
  FaBriefcase,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 w-full bg-sky-950/95 shadow-2xl md:relative md:top-0 md:w-[50%] md:rounded-b-xl md:border md:border-cyan-100">
      <ul className="flex h-full items-center justify-evenly">
        <li className="md:hidden">
          <Link href="/">
            <FaHome className="text-2xl text-white" />
          </Link>
        </li>
        <li className="md:hidden">
          <Link href="/#projects">
            <FaProjectDiagram className="text-2xl text-white" />
          </Link>
        </li>
        <li className="md:hidden">
          <Link href="/#experience">
            <FaBriefcase className="text-2xl text-white" />
          </Link>
        </li>
        <li className="md:hidden">
          <Link href="/aboutme">
            <FaUser className="text-2xl text-white" />
          </Link>
        </li>
        <li className="md:hidden">
          <Link href="/contactme">
            <FaEnvelope className="text-2xl text-white" />
          </Link>
        </li>

        <li className="hidden md:inline">
          <Link href="/">Home</Link>
        </li>
        <li className="hidden md:inline">
          <Link href="/#projects">Projects</Link>
        </li>
        <li className="hidden md:inline">
          <Link href="/#experience">Work and Tech</Link>
        </li>
        <li className="hidden md:inline">
          <Link href="/aboutme">About me</Link>
        </li>
        <li className="hidden md:inline">
          <Link href="/contactme">Contact me</Link>
        </li>
      </ul>
    </nav>
  );
}
