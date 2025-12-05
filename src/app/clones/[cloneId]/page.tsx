import VisitSiteButton from "@/components/VisiteSiteButton";
import RichTextPreview from "@/components/RichTextPreview";
import { getClonebyId } from "@/lib/dbCalls";
import Image from "next/image";
import Link from "next/link";

export default async function ClonePage({
  params,
}: {
  params: { cloneId: string };
}) {
  const cloneId = parseInt(params.cloneId, 10);

  // Handle invalid cloneId (e.g., not a number)
  if (isNaN(cloneId)) {
    return (
      <div className="mt-[50px] flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl">Invalid Clone ID</h1>
      </div>
    );
  }

  let clone = null;

  try {
    clone = await getClonebyId(cloneId);
  } catch (error) {
    console.error("Error fetching clone:", error);
  }

  // Handle case where no clone is found
  if (!clone) {
    return (
      <div className="mt-[50px] flex w-full flex-col items-center justify-center">
        <h1 className="text-3xl">Clone Not Found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="mt-[50px] flex w-full flex-col items-center justify-center md:h-[70vh]">
        <div className="mt-4 w-[95%]">
          <VisitSiteButton
            projectUrl={clone?.clone_url ?? ""}
            underConstruction={clone?.under_construction ?? false}
          />
        </div>
        <div className="flex h-[700px] w-[95%] flex-col rounded-xl bg-neutral-400/10 shadow-2xl md:mt-[100px] md:h-[500px] md:w-[60%] md:flex-row">
          <div className="relative h-[50%] w-full md:h-[100%] md:w-[50%]">
            <Image
              src={clone?.image_url ?? ""}
              alt={clone?.clone_title ?? ""}
              fill
              style={{ objectFit: "cover" }}
              className="h-full rounded-l-xl"
            />
          </div>
          <div className="flex w-full flex-col space-y-4 p-4 md:w-[50%]">
            <h2 className="text-3xl">{clone?.clone_title}</h2>
            <div className="max-h-[420px] overflow-auto rounded-xl bg-neutral-900/40 p-4 text-lg">
              <RichTextPreview content={clone?.clone_Description ?? ""} />
            </div>
          </div>
        </div>
      </div>
      {clone?.video_url && (
        <div
          id="presentation-video"
          className="flex h-auto w-full items-center justify-center"
        >
          <iframe
            className="rounded-2xl shadow-2xl"
            width="1160"
            height="715"
            src={clone?.video_url}
            title={clone?.clone_title || ""}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // referrerpolicy="strict-origin-when-cross-origin"
            // allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
