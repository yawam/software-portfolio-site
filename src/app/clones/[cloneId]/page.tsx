import { getClonebyId, getProjectbyId } from "@/lib/dbCalls";

export default async function ProjectPage({
  params,
}: {
  params: { cloneId: string };
}) {
  const cloneId = parseInt(params.cloneId, 10);

  const clone = await getClonebyId(cloneId);

  return (
    <div>
      Welcome to {clone?.clone_title} of id {cloneId}
    </div>
  );
}
