import { getRecommendations } from "@/lib/dbCalls";
import RecommendationCard from "./RecommendationCard";

export default async function RecommendationsSection() {
  const recommendations = await getRecommendations();
  return (
    <div className="my-10 px-2 md:mx-2">
      <div className="my-10 w-full border-b-2 border-b-sky-300 pb-2">
        <h2 className="text-3xl drop-shadow-2xl">Recommendations</h2>
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
