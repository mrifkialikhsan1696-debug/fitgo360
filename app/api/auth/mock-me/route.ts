import { NextRequest } from "next/server";
import { jsonOk, jsonErr } from "@/lib/response";
import { getBearer, withCors } from "@/lib/security";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: withCors() });
}

export async function GET(req: NextRequest) {
  const headers = withCors();
  const token = getBearer(req);
  if (!token) return jsonErr("Missing bearer token", 401);

  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const payload = JSON.parse(raw) as { role?: string; iat?: number };
    if (!payload.role) return jsonErr("Invalid token payload", 401);
    return jsonOk({ user: { role: payload.role }, issuedAt: payload.iat }, { headers });
  } catch {
    return jsonErr("Invalid token", 401);
  }
}

