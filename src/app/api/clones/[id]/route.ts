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
    const cloneId = Number(params.id);

    if (Number.isNaN(cloneId)) {
      return NextResponse.json({ error: "Invalid clone id" }, { status: 400 });
    }

    const updatedClone = await prisma.clone.update({
      where: { id: cloneId },
      data: {
        clone_title: body.clone_title ?? "",
        clone_url: body.clone_url ?? "",
        image_url: body.image_url ?? "",
        clone_Description: body.clone_Description ?? "",
        video_url: body.video_url ?? "",
        under_construction: Boolean(body.under_construction),
      },
    });

    return NextResponse.json(updatedClone);
  } catch (error) {
    console.error("Clone update failed:", error);
    return NextResponse.json(
      { error: "Failed to update clone" },
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

    const cloneId = Number(params.id);

    if (Number.isNaN(cloneId)) {
      return NextResponse.json({ error: "Invalid clone id" }, { status: 400 });
    }

    await prisma.clone.delete({
      where: { id: cloneId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Clone deletion failed:", error);
    return NextResponse.json(
      { error: "Failed to delete clone" },
      { status: 500 },
    );
  }
}
