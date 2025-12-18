import { NextRequest } from "next/server";
import { jsonOk } from "@/lib/response";
import { rateLimit, withCors } from "@/lib/security";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: withCors() });
}

export async function GET(req: NextRequest) {
  const rl = rateLimit(req);
  const headers = withCors();
  headers.set("X-RateLimit-Remaining", String(rl.remaining));
  return jsonOk({ status: "up" }, { headers });
}

