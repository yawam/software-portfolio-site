import ExperienceCard from "@/components/ExperienceCard";
import Navbar from "@/components/navbar";
import ProjectCard from "@/components/ProjectCard";
import { SkeletonCard } from "@/components/skeletonCard";
import Image from "next/image";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
import OpenToHire from "@/components/OpenToHire";
import TechStacks from "@/components/TechStacks";
import { Fragment } from "react";
import RecommendationCard from "@/components/RecommendationCard";

export default function Home() {
  return (
    <Fragment>
      <div className="flex h-[100vh] w-full flex-col items-center justify-center">
        <div className="space-y-4 rounded-2xl border-sky-200 p-2 text-center shadow-2xl shadow-sky-300/20 md:p-16">
          <h1 className="text-[2rem] text-white drop-shadow-2xl md:text-[6rem]">
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
                  href="Resume8-14-2024.pdf"
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
        <div className="mx-6 border-b-2 border-b-sky-300 pb-2 shadow-sky-300/20">
          <h2 id="projects" className="text-3xl drop-shadow-2xl">
            Projects
          </h2>
        </div>
        <p className="mx-6 text-neutral-400 md:mx-10">Built from scratch</p>
        <div className="my-4 flex items-center justify-around space-x-4">
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
        </div>
        <p className="mx-6 text-neutral-400 md:mx-10">Clones</p>
        <div className="my-4 flex items-center justify-around space-x-4">
          <ProjectCard
            href="https://spotify-clone-90q4tfeni-papa-yaw-agyeman-manus-projects.vercel.app/"
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
        </div>
        <div className="flex flex-col items-center justify-center md:mx-12 md:my-12 md:flex-row md:justify-evenly md:space-x-12">
          <div className="flex h-[500px] w-full flex-col md:w-[50%]">
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
          <div className="flex h-[500px] w-full flex-col md:w-[50%]">
            <h2 id="stacks" className="justify-start text-2xl">
              Stacks and Techs
            </h2>
            <TechStacks />
          </div>
        </div>
        <div className="my-10 px-2 md:mx-2">
          <div className="my-10 w-full border-b-2 border-b-sky-300 pb-2">
            <h2 className="text-3xl drop-shadow-2xl">Recommendations</h2>
          </div>
          <div className="flex flex-col gap-4 md:grid md:max-w-full md:grid-cols-3 md:space-x-4">
            <RecommendationCard
              image_url="https://utfs.io/f/a0eeddae-40b1-44e8-88fd-cb6d08b7a4b8-mym5hl.jpeg"
              recommender_name="Freda Agyeman-Manu"
              recommender_title="Wife"
              recommendation="Papa Yaw demonstrated remarkable dedication in building our wedding website. He took our vision and brought it to life with a perfect blend of creativity and technical skill. The website not only functioned seamlessly but also helped us cut costs and efficiently relay important information to our guests. His hard work was evident in every detail, from the sleek design to the user-friendly interface. Papayaw’s ability to tackle challenges and deliver an exceptional final product truly sets him apart. I wholeheartedly recommend him."
            />
            <RecommendationCard
              image_url="https://utfs.io/f/7dF6fxvLS6wZ09n75USXqOiahMfzCpxbw1QBgN2dY7mVrs0l"
              recommender_name="Gerald Pierce"
              recommender_title="Adjunct Instructor BYU-Idaho"
              recommendation="To whom I concern I have known Papa Yaw Agyeman-Manu and he has worked with me for two semesters as my teachers assistant. 
He was always polite and professional to myself and to the students he brought a level of expertise that was very helpful to the students and he was willing to follow council and show flexibility with his duties as my teaching assistant.
His knowledge of front end web development Made it so he could easily help the students in our classes as they asked him questions.
I would love to have him again as my teacher's assistant"
            />
          </div>
        </div>
      </div>
      {/* To do 
      build contact me page 
      finish mobile view for contact me
      */}
    </Fragment>
  );
}
