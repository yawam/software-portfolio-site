// app/api/recommendation/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  const newRecommendation = await prisma.recommendation.create({
    data: {
      recommender_name: body.recommender_name,
      recommender_title: body.recommender_title,
      recommendation: body.recommendation,
      image_url: body.image_url,
      isApproved: false, // default
    },
  });

  return NextResponse.json(newRecommendation);
}
