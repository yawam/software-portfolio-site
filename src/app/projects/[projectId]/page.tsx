import { getProjectbyId } from "@/lib/dbCalls";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = parseInt(params.projectId, 10);

  const project = await getProjectbyId(projectId);

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
}
