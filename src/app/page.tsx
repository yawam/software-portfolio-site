import Navbar from "@/components/navbar";
import ProjectCard from "@/components/ProjectCard";
import { SkeletonCard } from "@/components/skeletonCard";
import Image from "next/image";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";

export default function Home() {
  return (
    <main>
      <div className="flex h-[100vh] items-center justify-center bg-gradient-to-b from-gray-800 via-gray-900 to-black shadow-2xl">
        <Navbar />

        <div className="flex flex-col rounded-2xl p-16 text-center shadow-2xl">
          <h1 className="text-[6rem] text-white drop-shadow-2xl">
            Software Portfolio
          </h1>
          <div className="space-y-4 text-lg">
            <p className="tracking-[.7em] text-neutral-300 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
              Full Stack Software Developer
            </p>
            <p className="tracking-[.5em] text-neutral-300 drop-shadow-2xl">
              Papa Yaw Agyeman-Manu
            </p>
          </div>
          <div className="mt-32 flex items-center justify-center space-x-20">
            <div className="space-y-4">
              <div className="group relative z-0 flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full bg-red-300 transition-all hover:-translate-y-2 hover:scale-110 hover:bg-red-400">
                <a
                  href="Resume6-22-2024.pdf" // Update with your resume file path
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-red-700 group-hover:bg-red-800"
                >
                  <BsDownload
                    size={35}
                    className="animate-bounce text-white drop-shadow-2xl"
                  />
                </a>
                <span className="absolute right-[6rem] z-50 hidden w-[100px] rounded bg-sky-700 px-2 py-1 text-xs text-white group-hover:flex">
                  Click to download resume
                </span>
              </div>
              <p className="text-sm text-white drop-shadow-2xl">Resume</p>
            </div>
            <Link href="https://github.com/yawam" className="space-y-4">
              <Image
                src="/github-mark-white.png"
                alt="github link to my github page"
                width={100}
                height={100}
                className="shadow-2xl shadow-neutral-900 transition-all hover:-translate-y-2 hover:scale-110"
              />
              <p className="text-sm text-white drop-shadow-2xl">GitHub</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/papa-yaw/"
              className="space-y-4"
            >
              <Image
                src="/Li-in-Bug.png"
                alt="Linked in link to my linked in page"
                width={110}
                height={130}
                className="shadow-2xl shadow-neutral-800 transition-all hover:-translate-y-2 hover:scale-110"
              />
              <p className="text-sm text-white drop-shadow-2xl">LinkedIn</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex h-[100vh] flex-col">
        <h1 className="mx-6 text-5xl font-semibold drop-shadow-2xl">
          Projects
        </h1>
        <div className="my-4 flex flex-wrap items-center justify-around space-y-4">
          <ProjectCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="mx-12 my-12 flex justify-evenly space-x-12">
          <div className="flex h-[500px] w-[50%] flex-col">
            <h2 className="justify-start text-2xl">Work Experience</h2>
            <div className="flex h-full w-full animate-pulse items-center justify-center rounded-2xl bg-neutral-900/50 shadow-2xl">
              <p className="text-sm text-white">Put work experience here</p>
            </div>
          </div>
          <div className="flex h-[500px] w-[50%] flex-col">
            <h2 className="justify-start text-2xl">Stacks</h2>
            <div className="flex h-full w-full animate-pulse items-center justify-center rounded-2xl bg-neutral-900/50 shadow-2xl">
              <p className="text-sm text-white">Put stacks and technologies</p>
            </div>
          </div>
        </div>
      </div>
      {/* To do 
      fill in work experiences and wait for inspiration 
      on hover for navigation links
      build page links either on page or on another*/}
    </main>
  );
}
