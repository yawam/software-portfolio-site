import AdminRecommendations from "@/components/AdminRecommendations";
import LoginButton from "@/components/LoginButton";
import { authOptions } from "@/lib/authOptions";
import { getRecommendationsByApprovalPriority, isAdmin } from "@/lib/dbCalls";
import { getServerSession } from "next-auth";
import { FcGoogle } from "react-icons/fc";

export default async function Admin() {
  const recommendations = await getRecommendationsByApprovalPriority();
  const session = await getServerSession(authOptions);
  const adminCheck = await isAdmin(session?.user?.email ?? null);

  if (!adminCheck) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center">
        <h1 className="text-center text-3xl">
          🧤 I&apos;m terribly sorry, but this page is reserved for Master Papa
          Yaw only. Any further trespass shall be... noted. 📝🕯️🩸
        </h1>
        <LoginButton text="Continue with Google" />
        <a
          href="/"
          className="mt-4 flex items-center gap-2 rounded bg-white px-4 py-2 text-black shadow hover:bg-gray-200"
        >
          Back to home
        </a>
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
        <p className="p-2 text-neutral-300">
          You have recommendations needing approval
        </p>
        <AdminRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
}
