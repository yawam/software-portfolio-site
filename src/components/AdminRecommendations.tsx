"use client";
import RecommendationCard from "@/components/RecommendationCard";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast, { Toast } from "react-hot-toast";

export default function AdminRecommendations({
  recommendations,
}: {
  recommendations: any[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleApprove = async (id: number) => {
    toast.loading("Approving recommendation...");
    const res = await fetch(`/api/recommendations/${id}/approve`, {
      method: "PATCH",
    });

    if (res.ok) {
      toast.dismiss();
      toast.success("Recommendation approved");
      startTransition(() => router.refresh()); // or revalidate
    } else {
      toast.error("Recommendation approval failed");
    }
  };

  const handleDecline = async (id: number) => {
    toast.loading("Declining recommendation...");
    const res = await fetch(`/api/recommendations/${id}/decline`, {
      method: "PATCH",
    });

    if (res.ok) {
      toast.dismiss();
      toast.success("Recommendation declined");
      startTransition(() => router.refresh());
    } else {
      toast.error("Recommendation decline failed");
    }
  };

  const handleDelete = async (id: number) => {
    toast.loading("Deleting recommendation...");
    const res = await fetch(`/api/recommendations/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.dismiss();
      toast.success("Recommendation deleted");
      startTransition(() => router.refresh());
    } else {
      toast.error("Recommendation delete failed");
    }
  };

  return (
    <div className="grid grid-cols-1 justify-items-center gap-y-4 lg:grid-cols-3">
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          image_url={recommendation.image_url ?? ""}
          recommender_name={recommendation.recommender_name ?? ""}
          recommender_title={recommendation.recommender_title ?? ""}
          recommendation={recommendation.recommendation ?? ""}
          isApproved={recommendation.isApproved}
          isPending={isPending}
          onApprove={() => {
            startTransition(() => handleApprove(recommendation.id));
          }}
          onDecline={() => {
            startTransition(() => handleDecline(recommendation.id));
          }}
          onDelete={() => {
            startTransition(() => handleDelete(recommendation.id));
          }}
        />
      ))}
    </div>
  );
}
