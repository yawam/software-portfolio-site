import { getProjectbyId } from "@/lib/dbCalls";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = parseInt(params.projectId, 10);

  const project = await getProjectbyId(projectId);

  return (
    <div className="mt-[50px] flex w-full flex-col items-center justify-center md:h-[70vh]">
      <div className="flex h-[700px] w-[95%] flex-col rounded-xl bg-neutral-400/10 shadow-2xl md:mt-[100px] md:h-[500px] md:w-[60%] md:flex-row">
        <div className="relative h-[50%] w-full md:h-[100%] md:w-[50%]">
          <Image
            src={project?.image_url ?? ""}
            alt={project?.project_title ?? ""}
            fill
            style={{ objectFit: "cover" }}
            className="h-full rounded-t-xl"
          />
        </div>
        <div className="flex w-full flex-col space-y-4 p-4 md:w-[50%]">
          <h2 className="text-3xl">{project?.project_title}</h2>
          <p className="text-lg">{project?.project_Description}</p>
        </div>
      </div>
      <div className="mt-4 w-[95%]">
        <Link href={project?.project_url ?? ""}>
          <button className="float-right h-16 w-32 rounded bg-sky-950 px-4 py-2 text-lg text-white shadow-xl transition-all hover:scale-105 hover:bg-sky-800">
            Visit Site
          </button>
        </Link>
      </div>
    </div>
  );
}
