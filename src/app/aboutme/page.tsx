import Image from "next/image";

export default function AboutMe() {
  return (
    <>
      <div className="mt-16 flex h-[100vh] w-full items-center justify-center">
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
            applications. What are you working on next? I think I might want to
            be a part of it. 🌟
          </p>
        </div>
      </div>
      <div>
        Now time to learn about my personal life. Not too personal though. Not
        your average portfolio page, All the boring stuff&apos;s on the
        homepage.
        <div className="w-full">
          coding.. of course I love it... wrote my first line fo code when I was
          a teenager. didn&apos;t know what I was doing
          <div className="flex w-full items-center justify-around">
            <div className="h-[500px] w-[40%] rounded-xl bg-neutral-700/20 shadow-2xl">
              picture of desk set up
            </div>
            <div className="h-[500px] w-[40%] rounded-xl bg-neutral-700/20 shadow-2xl">
              some DSA representation image
            </div>
          </div>
        </div>
        Now here&apos;s the good part. My Hobbies. Do we have anything in
        common?
        <div>What music does PAPA yAW lISTEN TO</div>
        <div>His Favorite Video Game</div>
        <div>Favorite sport</div>
        <div>The ORGAN</div>
        {/* What to add in next, 
      family life? where from? HOBBIES!! SPOTIFY SECTION!! ORGAN SECTION!! FIFA Section */}
      </div>
    </>
  );
}
