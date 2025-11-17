"use client";

import { useState } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

// Visit button that optionally warns when a project site isn't live yet
interface VisitSiteButtonProps {
  projectUrl: string;
  underConstruction?: boolean;
}

export default function VisitSiteButton({
  projectUrl,
  underConstruction,
}: VisitSiteButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {underConstruction ? (
        <button
          onClick={() => setShowModal(true)}
          className="float-right h-16 w-32 rounded bg-sky-950 px-4 py-2 text-lg text-white shadow-xl transition-all hover:scale-105 hover:bg-sky-800"
        >
          Visit Site
        </button>
      ) : (
        <Link href={projectUrl} passHref>
          <button className="float-right h-16 w-32 rounded bg-sky-950 px-4 py-2 text-lg text-white shadow-xl transition-all hover:scale-105 hover:bg-sky-800">
            Visit Site
          </button>
        </Link>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="animate-slide-in w-[90%] max-w-md space-y-4 rounded bg-amber-100 p-6 text-center shadow-xl">
            <div className="flex items-center justify-center space-x-2">
              <TriangleAlert color="gold" />
              <h3 className="text-xl font-semibold text-amber-400">
                Under Construction
              </h3>
              <TriangleAlert color="gold" />
            </div>

            <p className="text-amber-500">
              This project site is currently under construction. Sometimes it
              costs a little extra resources to get the projects up and running.
            </p>
            <p className="text-sm text-amber-600">
              Please watch the video presentation instead.
            </p>
            <div className="flex justify-around">
              <Link href="#presentation-video">
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-2 w-36 rounded bg-sky-900 p-2 text-white hover:bg-sky-700"
                >
                  Watch Video
                </button>
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 w-36 rounded bg-sky-900 p-2 text-white hover:bg-sky-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
