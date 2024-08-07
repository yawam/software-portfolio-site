import ExperienceCard from "@/components/ExperienceCard";
import Navbar from "@/components/navbar";
import ProjectCard from "@/components/ProjectCard";
import { SkeletonCard } from "@/components/skeletonCard";
import Image from "next/image";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import OpenToHire from "@/components/OpenToHire";
import TechStacks from "@/components/TechStacks";

export default function Home() {
  return (
    <>
      <div className="flex h-[100vh] flex-col items-center justify-center">
        <div className="space-y-4 rounded-2xl border-sky-200 p-16 text-center shadow-2xl shadow-sky-300/20">
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
          <div className="flex w-full justify-center">
            <OpenToHire />
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
                className="shadow-2xl transition-all hover:-translate-y-2 hover:scale-110"
              />
              <p className="text-sm text-white drop-shadow-2xl">GitHub</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/papa-yaw/"
              className="space-y-4"
            >
              <Image
                src="/LI-In-Bug.png"
                alt="Linked in link to my linked in page"
                width={110}
                height={130}
                className="shadow-2xl transition-all hover:-translate-y-2 hover:scale-110"
              />
              <p className="text-sm text-white drop-shadow-2xl">LinkedIn</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex h-[100vh] flex-col space-y-6 pb-6">
        <div className="border-b-[1px] border-b-sky-300 shadow-sky-300/20">
          <h1
            id="projects"
            className="mx-6 text-5xl font-semibold drop-shadow-2xl"
          >
            Projects
          </h1>
        </div>
        <p className="mx-10 text-neutral-400">Built from scratch</p>

        <div className="my-4 flex items-center justify-around space-y-4">
          <ProjectCard
            href="https://plums-ioo918mj7-papa-yaw-agyeman-manus-projects.vercel.app/"
            image_url="https://utfs.io/f/e6c3e84d-8601-4aa6-bf9b-e33a27a8a8f3-a2l1v9.png"
            title="PLUMS"
            description="A personal learning Management software that I created with Next.js, React, and Tailwind CSS"
          />
          <ProjectCard
            href=""
            image_url="https://utfs.io/f/f0469d7c-1504-41e4-be77-304fffc37bfb-5qlfk6.png"
            title="Wedding Website"
            description="A website I built for my wedding to collect guest information and give information about the wedding"
          />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <p className="mx-10 text-neutral-400">Clones</p>
        <div className="my-4 flex items-center justify-around space-y-4">
          <ProjectCard
            href=""
            image_url="https://utfs.io/f/3dac2974-a161-4701-8e66-dac99c86a828-mp28yr.png"
            title="Spotify Clone"
            description="Music player platform clone from Code with Antonio"
          />
          <ProjectCard
            href=""
            image_url="https://utfs.io/f/f3d79570-72fb-4dcd-8c7c-453510fc9c17-q2hon4.png"
            title="LMS Clone"
            description="Learning Management system clone from Code with Antonio"
          />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="mx-12 my-12 flex justify-evenly space-x-12">
          <div className="flex h-[500px] w-[50%] flex-col">
            <h2 id="experience" className="justify-start text-2xl">
              Work Experience
            </h2>
            <div className="flex h-full w-full items-center justify-around space-x-4 overflow-y-auto rounded-2xl bg-neutral-900/20 p-4 text-center shadow-2xl">
              <ExperienceCard
                href=""
                image_url="https://utfs.io/f/fff40f2c-fc20-4c89-94fb-a4192e7512f7-ibec8w.webp"
                title="Online Teaching Assistant - Web Frontend Development"
                start_date="January 2024"
                end_date="Present"
                bgColor="white"
              />
              <ExperienceCard
                href=""
                image_url="https://utfs.io/f/f0276cc0-1b38-4db6-a2f5-98f651e0e4c3-bhjdtr.png"
                title="Software Developer Intern"
                start_date="July 2023"
                end_date="December 2023"
                bgColor="white"
              />
            </div>
          </div>
          <div className="flex h-[500px] w-[50%] flex-col">
            <h2 id="stacks" className="justify-start text-2xl">
              Stacks and Techs
            </h2>
            <div className="grid h-[500px] w-full grid-cols-3 grid-rows-3 gap-4 overflow-y-auto rounded-2xl bg-neutral-900/50 p-2 shadow-2xl">
              <TechStacks />
            </div>
          </div>
        </div>
      </div>
      {/* To do 
      fill in work experiences and wait for inspiration 
      on hover for navigation links
      Open to hire  component
      build page links either on page or on another*/}
    </>
  );
}
