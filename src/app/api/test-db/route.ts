// app/api/test-db/route.ts
import { getClones } from "@/lib/dbCalls";

export async function GET() {
  try {
    const clones = await getClones();
    console.log("Database connection success. Clones:", clones);
    return new Response(JSON.stringify(clones), { status: 200 });
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500 },
    );
  }
}
