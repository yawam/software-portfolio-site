import Link from "next/link";
import ExperienceCard from "./ExperienceCard";
import { getProjectbyId } from "@/lib/dbCalls";
import ProjectCard from "./ProjectCard";

export default async function Experience() {
  const project = await getProjectbyId(2);
  return (
    <div className="flex h-[500px] w-full flex-col md:w-[50%]">
      <h2 id="experience" className="justify-start text-2xl">
        Work Experience
      </h2>
      <div className="flex h-full w-full flex-nowrap items-center justify-start space-x-4 overflow-x-auto rounded-2xl bg-neutral-900/20 p-4 text-center shadow-2xl">
        {project && (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard
              href={project.project_url ?? ""}
              image_url={project.image_url ?? ""}
              title={project.project_title ?? ""}
              description={project.project_Description ?? ""}
            />
          </Link>
        )}
        <ExperienceCard
          href=""
          image_url="https://utfs.io/f/f0276cc0-1b38-4db6-a2f5-98f651e0e4c3-bhjdtr.png"
          title="Software Developer Intern"
          start_date="July 2023"
          end_date="December 2023"
          bgColor="white"
        />
        <ExperienceCard
          href=""
          image_url="https://utfs.io/f/fff40f2c-fc20-4c89-94fb-a4192e7512f7-ibec8w.webp"
          title="Online Teaching Assistant - Web Development(Frontend | Backend)"
          start_date="January 2024"
          end_date="Present"
          bgColor="white"
        />
      </div>
    </div>
  );
}
