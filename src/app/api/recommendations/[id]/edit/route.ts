import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { recommendation } = await req.json();

  try {
    const updated = await prisma.recommendation.update({
      where: { id: parseInt(params.id) },
      data: {
        recommendation,
        isApproved: false,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Edit error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
