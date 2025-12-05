import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdmin } from "@/lib/dbCalls";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const adminCheck = await isAdmin(session?.user?.email ?? null);

    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const {
      clone_title,
      clone_url,
      image_url,
      clone_Description,
      video_url,
      under_construction,
    } = body;

    const newClone = await prisma.clone.create({
      data: {
        clone_title: clone_title ?? "",
        clone_url: clone_url ?? "",
        image_url: image_url ?? "",
        clone_Description: clone_Description ?? "",
        video_url: video_url ?? "",
        under_construction: Boolean(under_construction),
      },
    });

    return NextResponse.json(newClone);
  } catch (error) {
    console.error("Clone creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create clone" },
      { status: 500 },
    );
  }
}
