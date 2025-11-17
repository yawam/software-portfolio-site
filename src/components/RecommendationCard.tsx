"use client";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Check, X, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Card used in both public feed and admin panel with optional moderation actions
interface RecommendationCardProps {
  image_url: string;
  recommendation_id: number;
  recommender_name: string;
  recommendation: string;
  recommender_title: string;
  recommender_email: string;
  isApproved?: boolean;
  isPending?: boolean;
  onApprove?: () => void;
  onDecline?: () => void;
  onDelete?: () => void;
}

export default function RecommendationCard({
  image_url,
  recommendation_id,
  recommender_name,
  recommendation,
  recommender_title,
  recommender_email,
  isApproved,
  isPending,
  onApprove,
  onDecline,
  onDelete,
}: RecommendationCardProps) {
  const isAdminMode = onApprove || onDecline || onDelete;
  const { data: session } = useSession();
  const isRecommender = session?.user?.email === recommender_email;
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(recommendation);
  const [isEditingPending, startTransitionEdit] = useTransition();
  const router = useRouter();

  const handleRecommendationEditEmail = async () => {
    await fetch(`/api/email`, {
      method: "POST",
      body: JSON.stringify({
        to: recommender_email,
        subject: "Your recommendation has been edited.",
        html: `<h2>Hi ${recommender_name},</h2><p>Your recommendation has been edited successfully and has been sent to the admin(Master PY) for approval. You should receive an email once it has been approved. </p><p>Best regards!</p><h3>Admin's AI Assistant</h3>`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div
      className={cn(
        "mb-4 break-inside-avoid rounded-xl p-4 shadow-md transition-all duration-200 ease-in-out",
        isAdminMode
          ? isApproved
            ? "bg-emerald-500/30"
            : "bg-red-500/30"
          : "bg-neutral-500/30",
      )}
    >
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
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            startTransitionEdit(async () => {
              const res = await fetch(
                `/api/recommendations/${recommendation_id}/edit`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    recommendation: editedText,
                    isApproved: false,
                  }),
                },
              );

              if (res.ok) {
                toast.success("Recommendation updated!");
                handleRecommendationEditEmail();
                setEditing(false);
                router.refresh();
              } else {
                toast.error("Update failed");
              }
            });
          }}
          className="mb-2"
        >
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full rounded bg-neutral-700 p-2 text-white"
            rows={4}
          />
          <div className="flex items-center justify-end space-x-2">
            <button
              type="submit"
              className="mt-2 rounded bg-sky-600 px-4 py-1 text-sm text-white hover:bg-sky-700"
              disabled={isEditingPending}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-2 rounded bg-red-600 px-4 py-1 text-sm text-white hover:bg-red-700"
              onClick={() => setEditing(false)}
              disabled={isEditingPending}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p>{recommendation}</p>
      )}
      {isAdminMode ? (
        <div className="flex items-center justify-end gap-2">
          {onApprove && (
            <button
              onClick={onApprove}
              disabled={isPending}
              title="Approve"
              className="rounded p-2 text-green-500 transition-all hover:bg-green-500/20 hover:shadow-lg"
            >
              <Check />
            </button>
          )}
          {onDecline && (
            <button
              onClick={onDecline}
              disabled={isPending}
              title="Decline"
              className="rounded p-2 text-red-500 transition-all hover:bg-red-500/20 hover:shadow-lg"
            >
              <X />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              disabled={isPending}
              title="Delete"
              className="rounded p-2 text-red-500 transition-all hover:bg-red-500/20 hover:shadow-lg"
            >
              <Trash2 />
            </button>
          )}
        </div>
      ) : isRecommender && !editing ? (
        <button
          onClick={() => setEditing(true)}
          title="Edit Recommendation"
          className="rounded p-2 text-sky-400 transition-all hover:bg-sky-500/20 hover:shadow-md"
        >
          <Pencil />
        </button>
      ) : null}
    </div>
  );
}
