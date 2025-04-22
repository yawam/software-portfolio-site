"use client";
import RecommendationCard from "@/components/RecommendationCard";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast, { Toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AdminRecommendations({
  recommendations,
}: {
  recommendations: any[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  const handleApprove = async (id: number, email: string, name: string) => {
    toast.loading("Approving recommendation...");
    const res = await fetch(`/api/recommendations/${id}/approve`, {
      method: "PATCH",
    });

    if (res.ok) {
      toast.dismiss();
      toast.success("Recommendation approved");
      handleRecommendationEmailApproved(email, name);
      startTransition(() => router.refresh()); // or revalidate
    } else {
      toast.error("Recommendation approval failed");
    }
  };

  const handleDecline = async (id: number, email: string, name: string) => {
    toast.loading("Declining recommendation...");
    const res = await fetch(`/api/recommendations/${id}/decline`, {
      method: "PATCH",
    });

    if (res.ok) {
      toast.dismiss();
      toast.success("Recommendation declined");
      handleRecommendationEmailDeclined(email, name);
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

  const handleRecommendationEmailApproved = async (
    email: string,
    name: string,
  ) => {
    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        to: email,
        subject: "Your recommendation has been approved.",
        html: `<h2>Hi ${name},</h2><p>Thank you for your recommendation once again. It has been approved by the admin(Master P.Y) and he is grateful to your contribution in his professional success. You can now view your recommendation displayed on the portfolio website <a href="https://software-portfolio-site.vercel.app/#recommendations" target="_blank">here</a>.</p><p>Cheers!,</p><h3>Admin's AI Assistant</h3>`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleRecommendationEmailDeclined = async (
    email: string,
    name: string,
  ) => {
    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        to: email,
        subject: "Your recommendation has been declined.",
        html: `<h2>Hi ${name},</h2><p>Thank you for your recommendation. Unfortunately, it has been declined by the admin(Master P.Y). There's probably an error in your recommendation. Master P.Y will reach out to you so we can get things fixed up </p><p>Best regards!</p><h3>Admin's AI Assistant</h3>`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          image_url={recommendation.image_url ?? ""}
          recommendation_id={recommendation.id}
          recommender_name={recommendation.recommender_name ?? ""}
          recommender_title={recommendation.recommender_title ?? ""}
          recommendation={recommendation.recommendation ?? ""}
          recommender_email={recommendation.recommender_email ?? ""}
          isApproved={recommendation.isApproved}
          isPending={isPending}
          onApprove={() => {
            startTransition(() =>
              handleApprove(
                recommendation.id,
                recommendation.recommender_email,
                recommendation.recommender_name,
              ),
            );
          }}
          onDecline={() => {
            startTransition(() =>
              handleDecline(
                recommendation.id,
                recommendation.recommender_email,
                recommendation.recommender_name,
              ),
            );
          }}
          onDelete={() => {
            startTransition(() => handleDelete(recommendation.id));
          }}
        />
      ))}
    </div>
  );
}
