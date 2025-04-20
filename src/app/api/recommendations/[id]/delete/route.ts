import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.recommendation.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
