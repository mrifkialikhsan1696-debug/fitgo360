import { NextRequest } from "next/server";
import { CONTENT } from "@/lib/data";
import { jsonOk, jsonErr } from "@/lib/response";
import { rateLimit, withCors } from "@/lib/security";
import { Role } from "@/lib/types";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: withCors() });
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ role: string }> }) {
  const rl = rateLimit(req);
  const headers = withCors();
  headers.set("X-RateLimit-Remaining", String(rl.remaining));
  if (!rl.allowed) return jsonErr("Rate limit exceeded", 429);

  const { role } = await ctx.params;
  const key = role as Role;

  const content = (CONTENT as any)[key];
  if (!content) {
    return jsonErr("Unknown role", 404, { allowed: Object.keys(CONTENT) });
  }

  return jsonOk(content, { headers });
}

