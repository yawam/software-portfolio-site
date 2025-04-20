import AdminRecommendations from "@/components/AdminRecommendations";
import { authOptions } from "@/lib/authOptions";
import { getRecommendationsByApprovalPriority, isAdmin } from "@/lib/dbCalls";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const recommendations = await getRecommendationsByApprovalPriority();
  const session = await getServerSession(authOptions);
  const adminCheck = await isAdmin(session?.user?.email ?? null);

  if (!adminCheck) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center">
        <h1>
          🧤 I'm terribly sorry, but this page is reserved for Master Papa Yaw
          only. Any further trespass shall be... noted. 📝🕯️🩸
        </h1>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col">
      <div className="mt-10 flex w-full flex-col p-10">
        <h1 className="text-3xl">Welcome Master Papa Yaw</h1>
        <p className="mt-4 text-lg">
          This is the Admin Portal where you can see everything
        </p>
      </div>
      <div className="p-10">
        <div className="my-2 flex w-full items-center justify-between border-b-2 border-b-sky-300 pb-2">
          <h2 className="text-xl font-semibold drop-shadow-2xl md:text-3xl md:font-normal">
            Recommendations
          </h2>
        </div>
        <p className="text-neutral-300">
          You have recommendations needing approval
        </p>
        <AdminRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
}
