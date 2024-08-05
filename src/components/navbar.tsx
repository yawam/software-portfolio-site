"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 h-16 w-[50%] rounded-b-xl border border-cyan-100 bg-sky-950 shadow-2xl">
      <ul className="my-4 flex content-center justify-around">
        <Link href="/">Home</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#experience">Work and Tech</Link>
        <Link href="/aboutme">About me</Link>
        <Link href="">Contact me</Link>
      </ul>
    </nav>
  );
}
