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
          <Link href={clone?.clone_url ?? ""}>
            <button className="float-right h-16 w-32 rounded bg-sky-950 px-4 py-2 text-lg text-white shadow-xl transition-all hover:scale-105 hover:bg-sky-800">
              Visit Site
            </button>
          </Link>
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
            <p className="text-lg">{clone?.clone_Description}</p>
            <p>
              The purpose of the clone was to server as a proof of concept. I
              spent a lot of time finishing the entire clone. The visit link
              might however not work because of limited funds to keep my
              database afloat.
            </p>
            <p className="text-sm">
              Credit:
              <a
                className="text-lg underline"
                href="https://www.youtube.com/@codewithantonio"
                target="_blank"
              >
                Antonio Erdeljac
              </a>
            </p>
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
