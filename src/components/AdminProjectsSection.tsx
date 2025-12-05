import { getClones, getProjects } from "@/lib/dbCalls";
import AdminProjectsManager from "./AdminProjectsManager";

export default async function AdminProjectsSection() {
  const [projects, clones] = await Promise.all([getProjects(), getClones()]);

  return (
    <div id="admin-projects" className="p-10">
      <AdminProjectsManager projects={projects} clones={clones} />
    </div>
  );
}
