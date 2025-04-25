import Image from "next/image";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import OpenToHire from "@/components/OpenToHire";
import TechStacks from "@/components/TechStacks";
import { Fragment } from "react";
import ProjectsSection from "@/components/ProjectsSection";
import Experience from "@/components/Experience";
import RecommendationsSection from "@/components/RecommendationsSection";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <Fragment>
      <div className="flex h-[100vh] w-full flex-col items-center justify-center">
        <div className="space-y-4 p-2 text-center md:p-16">
          <h1 className="text-[2rem] text-white drop-shadow-2xl md:text-[6rem]">
            Software Portfolio
          </h1>
          <div className="space-y-4 text-lg">
            <p className="drop-shads0_35px_35px_rgba(0,0,0,0.25)] tracking-[.7em] text-neutral-300">
              Full Stack Software Engineer
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
                  href="PapaYaw-FullStackSoftwareResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-red-700 group-hover:bg-red-800"
                >
                  <BsDownload
                    size={35}
                    className="animate-bounce text-white drop-shadow-2xl"
                  />
                </a>
                <span className="absolute bottom-[6rem] z-50 hidden w-[100px] rounded bg-sky-700 px-2 py-1 text-xs text-white group-hover:flex">
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
      <div className="mb-16 flex flex-col space-y-6">
        <ProjectsSection />
        <div className="flex flex-col items-center justify-center md:mx-12 md:my-12 md:flex-row md:justify-evenly md:space-x-12">
          <Experience />
          <TechStacks />
        </div>
      </div>
      <RecommendationsSection />
      {/* To do add in a backend componentize this page. */}
    </Fragment>
  );
}
