import Image from "next/image";

const stacks = [
  {
    src: "https://utfs.io/f/b9f93697-c0f9-4461-a2c5-3094436a5042-z7y6p2.svg",
    alt: "Node.js logo",
  },
  {
    src: "https://utfs.io/f/5b6138c6-76c9-4115-8f0b-17b96d0ec7af-igyywx.svg",
    alt: "TypeScript logo",
  },
  {
    src: "https://utfs.io/f/f717d8f1-8349-4a3f-ab04-a6ab2887a3dd-jw2dwd.svg",
    alt: "Python Logo",
  },
  {
    src: "https://utfs.io/f/523f15b5-3bd6-4ee2-a20e-c0391cee7592-ruxgie.svg",
    alt: "Next.js Logo",
  },
  {
    src: "https://utfs.io/f/d0425e2d-fa5f-44ca-ae1d-e61a9a37dcc5-8ewyd5.svg",
    alt: "React.js Logo",
  },
  {
    src: "https://utfs.io/f/bf546595-7e97-4ef4-9709-6561913c82bf-z091xq.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://utfs.io/f/a968baf0-693c-4fd9-8d4e-8303b7fc93f7-1qgrdc.svg",
    alt: "Tailwind Logo",
  },
  {
    src: "https://utfs.io/f/bba1915f-4cd2-4e1b-a979-2d93f4559671-wf79eu.png",
    alt: "MySql Logo",
  },
  {
    src: "https://utfs.io/f/b9362961-0ce3-4658-9c10-4c7a313ee620-w0h17w.svg",
    alt: "Prisma Logo",
  },
  {
    src: "https://utfs.io/f/852c8410-5819-4e5f-b855-751cbf4fbe17-qn2wzh.png",
    alt: "C# Logo",
  },

  {
    src: "https://axl8uyhwd5.ufs.sh/f/7dF6fxvLS6wZDZskqVlbd1KlyvE9xsSm0GQYiwfpugVjJcoe",
    alt: "CSS Logo",
  },
  {
    src: "https://axl8uyhwd5.ufs.sh/f/7dF6fxvLS6wZGlUUqqZbXma3zwk7UgON4qDFE0PeMdK9B15J",
    alt: "HTML Logo",
  },
  {
    src: "https://axl8uyhwd5.ufs.sh/f/7dF6fxvLS6wZaDAPAG1HSiQM8fmWC1Ao0eglLJH2u6DsEIBO",
    alt: "Javascript Logo",
  },
];
export default function TechStacks() {
  return (
    <div className="flex h-[500px] w-full flex-col md:w-[50%]">
      <h2 id="stacks" className="justify-start text-2xl">
        Stacks and Techs
      </h2>
      <div className="flex h-[500px] w-full flex-wrap justify-center gap-4 overflow-y-auto rounded-2xl bg-neutral-900/50 p-2 shadow-2xl">
        {stacks.map((stack, key) => (
          <div
            key={key}
            className="relative h-[100px] w-[150px] flex-shrink-0 overflow-hidden rounded-xl bg-neutral-900/20 py-4 shadow-2xl"
          >
            <Image
              alt={stack.alt}
              src={stack.src}
              fill
              style={{ objectFit: "contain" }}
              className="py-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
