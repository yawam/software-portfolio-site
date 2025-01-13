import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  return (
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
  );
}
