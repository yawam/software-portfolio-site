import HobbyCard from "@/components/HobbyCard";
import OpenToHire from "@/components/OpenToHire";
import Image from "next/image";
import { Fragment } from "react";

export default function AboutMe() {
  return (
    <Fragment>
      <div className="my-16 flex h-[100vh] w-full items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center space-y-4 md:w-[40%]">
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
            Now that I know how things work, It&apos;s been a blast and I&apos;m
            excited for the future. At this point I&apos;m confident that with
            the right team, I can build almost anything. 💪 <br /> It&apos;s fun
            to see the results of building useful interactive full-stack
            applications. <br /> What are you working on next? I think I might
            want to be a part of it. 🌟
          </p>
        </div>
      </div>
      <div className="space-y-8 md:mx-10">
        <div>
          <h2 className="text-4xl text-neutral-300">
            Now let&apos;s get to the fun part. My Hobbies!
          </h2>
          <p className="text-sm text-neutral-300">
            Here&apos;s the stuff I like to do. Do we have anything in common?
          </p>
        </div>
        <div className="flex w-full items-center justify-around space-x-4 overflow-x-auto p-2">
          <HobbyCard
            title="Coding"
            image_url="https://utfs.io/f/59dfa694-8fe7-448a-bebd-1005017e7d0f-ic6t1x.jpeg"
          />
          <HobbyCard
            title="Football"
            image_url="https://utfs.io/f/5680b720-f446-4aa9-9d9d-997ff3aa2d20-cvnd4w.webp"
          />
          <HobbyCard
            title="Video Games"
            image_url="https://axl8uyhwd5.ufs.sh/f/7dF6fxvLS6wZntti7Xps3lE9YzjGoRuW1BpF2hJ4my7DIVHQ"
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
        <div className="mb-2 flex w-full flex-col items-center justify-around space-y-8 md:flex-row md:space-x-8">
          <div className="flex h-[400px] w-full flex-col md:h-[500px] md:w-[50%]">
            <p className="mb-2 text-white">
              What music does Papa Yaw listen to?
            </p>
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-700/20 shadow-2xl">
              <iframe
                className="h-full w-full rounded-2xl shadow-2xl shadow-sky-300/20"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1EptGqNgB5GCCA?utm_source=generator"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="flex h-[400px] w-full flex-col md:h-[500px] md:w-[50%]">
            <p className="mb-2 text-white">His Favorite Video Game</p>
            <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-700/20 shadow-2xl">
              <Image
                src="https://utfs.io/f/90f834bc-3c4c-47bb-a618-3bb38e3d7123-1xeek8.jpeg"
                alt="avatar xbox"
                width={150}
                height={120}
                className="absolute left-2 top-2 z-20 rounded-xl opacity-0 shadow-2xl shadow-sky-300/20 transition-opacity ease-in-out group-hover:opacity-100"
              />
              <Image
                src="https://utfs.io/f/73b1a222-2969-43e3-8fcc-6d5400f23d27-8n84pd.png"
                alt="Fifa stats"
                fill
                style={{ objectFit: "cover" }}
                className="z-0 rounded-xl shadow-2xl shadow-sky-300/20 transition-all group-hover:scale-95"
              />
              <div className="z-10 hidden h-[100%] w-[100%] items-center justify-center rounded-xl bg-black/70 text-center text-2xl text-white transition-opacity duration-500 ease-in-out group-hover:flex group-hover:opacity-100">
                <p className="duration-1750 rounded-xl bg-black/80 p-2 opacity-0 shadow-2xl transition-opacity ease-in-out group-hover:opacity-100">
                  EAFC <br /> <span className="text-sm">Can you beat me?</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
