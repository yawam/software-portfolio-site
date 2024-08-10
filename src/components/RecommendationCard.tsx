import Image from "next/image";

interface RecommendationCardProps {
  image_url: string;
  recommender_name: string;
  recommendation: string;
  recommender_title: string;
}
export default function RecommendationCard({
  image_url,
  recommender_name,
  recommendation,
  recommender_title,
}: RecommendationCardProps) {
  return (
    <div className="h-[200px] w-[500px] rounded-xl bg-neutral-600/30 px-2 py-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative h-[75px] w-[75px]">
          <Image
            src={image_url}
            alt="recommender image"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full shadow-2xl shadow-sky-300/20"
          />
        </div>
        <div>
          <p>{recommender_name}</p>
          <p className="text-sm text-neutral-400">{recommender_title}</p>
        </div>
      </div>
      <p>{recommendation}</p>
    </div>
  );
}
