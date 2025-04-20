import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.recommendation.update({
      where: { id: Number(params.id) },
      data: { isApproved: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error approving recommendation:", error);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
