import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { isAdmin } from "@/lib/dbCalls";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const adminCheck = await isAdmin(session?.user?.email ?? null);

    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const projectId = Number(params.id);

    if (Number.isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        project_title: body.project_title ?? "",
        project_url: body.project_url ?? "",
        image_url: body.image_url ?? "",
        project_Description: body.project_Description ?? "",
        video_url: body.video_url ?? "",
        under_construction: Boolean(body.under_construction),
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Project update failed:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const adminCheck = await isAdmin(session?.user?.email ?? null);

    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const projectId = Number(params.id);

    if (Number.isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project deletion failed:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
