import { NextRequest } from "next/server";
import { jsonOk, jsonErr } from "@/lib/response";
import { withCors } from "@/lib/security";
import { ROLES } from "@/lib/data";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: withCors() });
}

export async function POST(req: NextRequest) {
  const headers = withCors();
  const body = await req.json().catch(() => null) as null | { role?: string };

  const role = body?.role;
  const found = ROLES.find(r => r.role === role);
  if (!found) return jsonErr("Invalid role", 400, { allowed: ROLES.map(r => r.role) });

  // super simple demo token
  const token = Buffer.from(JSON.stringify({ role, iat: Date.now() })).toString("base64url");
  return jsonOk({ token, role }, { headers });
}

