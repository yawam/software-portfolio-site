import { getApprovedRecommendations } from "@/lib/dbCalls";
import RecommendationCard from "./RecommendationCard";
import AddRecommendationButton from "./AddRecommendationButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdmin } from "@/lib/dbCalls";
import { UserCog } from "lucide-react";
import Link from "next/link";

// Public recommendations feed with shortcut for admins to moderate
export default async function RecommendationsSection() {
  const recommendations = await getApprovedRecommendations();
  const session = await getServerSession(authOptions);
  const adminCheck = await isAdmin(session?.user?.email ?? null);
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
            <Link href="/admin">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-white p-4 text-lg text-black shadow-md transition hover:bg-slate-100">
                <span className="hidden md:block">Go to admin panel</span>
                <UserCog className="block md:hidden" />
              </button>
            </Link>
          )}
          <AddRecommendationButton />
        </div>
      </div>
      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation_id={recommendation.id}
            image_url={recommendation.image_url ?? ""}
            recommender_name={recommendation.recommender_name ?? ""}
            recommender_title={recommendation.recommender_title ?? ""}
            recommendation={recommendation.recommendation ?? ""}
            recommender_email={recommendation.recommender_email ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
