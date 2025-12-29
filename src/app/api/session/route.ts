import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify(null), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // @ts-ignore - accessToken is added in the route handler
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Session error:", error);
    return new Response(JSON.stringify(null), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
