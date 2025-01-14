import { testDatabaseConnection } from "@/lib/dbCalls";

export async function GET() {
  try {
    await testDatabaseConnection();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error testing database connection:", error);
    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 500,
    });
  }
}
