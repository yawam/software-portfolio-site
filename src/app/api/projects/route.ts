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
      project_title,
      project_url,
      image_url,
      project_Description,
      video_url,
      under_construction,
    } = body;

    const newProject = await prisma.project.create({
      data: {
        project_title: project_title ?? "",
        project_url: project_url ?? "",
        image_url: image_url ?? "",
        project_Description: project_Description ?? "",
        video_url: video_url ?? "",
        under_construction: Boolean(under_construction),
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Project creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
