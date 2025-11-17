import { Fragment } from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { getClones, getProjects } from "@/lib/dbCalls";

// Fetches projects/clones on the server and renders both carousels
export default async function ProjectsSection() {
  const projects = await getProjects();
  const clones = await getClones();

  return (
    <Fragment>
      <div className="mx-6 border-b-2 border-b-sky-300 pb-2 shadow-sky-300/20">
        <h2 id="projects" className="text-3xl drop-shadow-2xl">
          Projects
        </h2>
      </div>
      <p className="mx-6 text-neutral-400 md:mx-10">Built from scratch</p>
      <div className="my-4 flex items-center justify-around space-x-4 overflow-x-auto">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard
              href={project.project_url ?? ""}
              image_url={project.image_url ?? ""}
              title={project.project_title ?? ""}
              description={project.project_Description ?? ""}
            />
          </Link>
        ))}
      </div>
      <p className="mx-6 text-neutral-400 md:mx-10">
        Clones (Proof-of-concept)
      </p>
      <div className="my-4 flex items-center justify-around space-x-4 overflow-x-auto">
        {clones.map((clone) => (
          <Link key={clone.id} href={`/clones/${clone.id}`}>
            <ProjectCard
              href={clone.clone_url ?? ""}
              image_url={clone.image_url ?? ""}
              title={clone.clone_title ?? ""}
              description={clone.clone_Description ?? ""}
            />
          </Link>
        ))}
      </div>
    </Fragment>
  );
}
