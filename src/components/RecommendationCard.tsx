import Image from "next/image";
import { Check, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  image_url: string;
  recommender_name: string;
  recommendation: string;
  recommender_title: string;
  isApproved?: boolean;
  isPending?: boolean;
  onApprove?: () => void;
  onDecline?: () => void;
  onDelete?: () => void;
}
export default function RecommendationCard({
  image_url,
  recommender_name,
  recommendation,
  recommender_title,
  isApproved,
  isPending,
  onApprove,
  onDecline,
  onDelete,
}: RecommendationCardProps) {
  const isAdminMode = onApprove || onDecline || onDelete;
  return (
    <div
      className={cn(
        "relative w-full rounded-xl px-2 py-4 shadow-lg md:w-[500px]",
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
      <p>{recommendation}</p>
      {isAdminMode && (
        <div className="absolute bottom-2 right-2 flex items-center justify-end gap-2 pt-2">
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
      )}
    </div>
  );
}
