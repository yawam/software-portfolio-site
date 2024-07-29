"use client";

export default function Navbar() {
  return (
    <nav className="absolute top-0 h-16 w-[50%] rounded-b-xl border border-cyan-100 bg-sky-950 shadow-2xl">
      <ul className="my-4 flex content-center justify-around">
        <li>Home</li>
        <li>Projects</li>
        <li>Work and Tech</li>
        <li>About me</li>
        <li>Contact me</li>
      </ul>
    </nav>
  );
}
