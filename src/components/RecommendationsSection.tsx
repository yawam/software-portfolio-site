import { getRecommendations } from "@/lib/dbCalls";
import RecommendationCard from "./RecommendationCard";
import AddRecommendationButton from "./AddRecommendationButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdmin } from "@/lib/dbCalls";
import { UserCog } from "lucide-react";

export default async function RecommendationsSection() {
  const recommendations = await getRecommendations();
  const session = await getServerSession(authOptions);
  console.log(session);
  const adminCheck = await isAdmin(session?.user?.email ?? null);
  console.log(adminCheck);
  return (
    <div className="my-10 px-2 md:mx-2">
      <div
        id="recommendations"
        className="my-10 flex w-full items-center justify-between border-b-2 border-b-sky-300 pb-2"
      >
        <h2 className="text-xl font-semibold drop-shadow-2xl md:text-3xl md:font-normal">
          Recommendations
        </h2>
        <div className="flex gap-4">
          {adminCheck && (
            <button className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-lg text-black shadow-md transition hover:bg-slate-100">
              <span className="hidden md:block">Go to admin panel</span>
              <UserCog className="block md:hidden" />
            </button>
          )}
          <AddRecommendationButton />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:grid md:max-w-full md:grid-cols-3 md:space-x-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            image_url={recommendation.image_url ?? ""}
            recommender_name={recommendation.recommender_name ?? ""}
            recommender_title={recommendation.recommender_title ?? ""}
            recommendation={recommendation.recommendation ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
