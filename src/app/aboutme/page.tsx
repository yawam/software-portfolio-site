import HobbyCard from "@/components/HobbyCard";
import OpenToHire from "@/components/OpenToHire";
import Image from "next/image";
import { Fragment } from "react";

export default function AboutMe() {
  return (
    <Fragment>
      <div className="my-16 flex h-[100vh] w-full items-center justify-center">
        <div className="flex w-[40%] flex-col items-center justify-center space-y-4">
          <div className="relative h-[300px] w-[300px]">
            <Image
              src="https://utfs.io/f/b35332ed-4c66-4ced-9121-6a4d65fa729a-o9sf04...jpg"
              fill
              style={{ objectFit: "cover" }}
              alt="profile"
              className="rounded-[100%] shadow-2xl shadow-sky-300/20"
            />
          </div>
          <OpenToHire />
          <p className="text-lg drop-shadow-[4rem]">
            🚀 Hi! I&apos;m Papa Yaw!,
            <br /> A passionate Software Engineering student at BYU-Idaho,
            focusing on Full-Stack Web Development and various web and software
            development technologies. I&apos;ve always had the resolve of not
            always being the user but the developer too. <br />
            Now that I know how things work, It&apos;s been blast and I&apos;m
            excited for the future. At this point I&apos;m confident that with
            the right team, I can build almost anything. 💪 <br /> It&apos;s fun
            to see the results of building useful interactive full-stack
            applications. <br /> What are you working on next? I think I might
            want to be a part of it. 🌟
          </p>
        </div>
      </div>
      <div className="mx-10 space-y-8">
        <div>
          <h2 className="text-4xl text-neutral-300">
            Now let&apos;s get to the fun part. My Hobbies!
          </h2>
          <p className="text-sm text-neutral-300">
            Here&apos;s the stuff I like to do. Do we have anything in common?
          </p>
        </div>
        <div className="flex w-full items-center justify-around">
          <HobbyCard
            title="Coding"
            image_url="https://utfs.io/f/59dfa694-8fe7-448a-bebd-1005017e7d0f-ic6t1x.jpeg"
          />
          <HobbyCard
            title="Football"
            image_url="https://utfs.io/f/5680b720-f446-4aa9-9d9d-997ff3aa2d20-cvnd4w.webp"
          />
          <HobbyCard
            title="The Organ"
            image_url="https://utfs.io/f/34c1d99d-d830-4b16-94d8-d19577cd680f-fzlfz1.jpg"
          />
          <HobbyCard
            title="Music Scoring"
            image_url="https://utfs.io/f/b3dcd1ea-a521-4628-8f89-061bc7a58926-1t4w9r.jpg"
          />
        </div>
        <div className="flex w-full items-center justify-evenly">
          <div>
            What music does Papa Yaw listen to
            <div className="flex h-[400px] w-[600px] animate-pulse items-center justify-center rounded-xl bg-neutral-700/20 shadow-2xl">
              Spotify section
            </div>
          </div>
          <div>
            His Favorite Video Game
            <div className="flex h-[400px] w-[600px] animate-pulse items-center justify-center rounded-xl bg-neutral-700/20 shadow-2xl">
              Fifa section
            </div>
          </div>
        </div>

        {/* Set up Spotify Section
        Set up Fifa Section */}
      </div>
    </Fragment>
  );
}
