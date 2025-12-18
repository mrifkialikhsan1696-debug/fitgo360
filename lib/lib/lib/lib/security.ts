import { NextRequest } from "next/server";

type Bucket = { tokens: number; updatedAt: number };
const memoryBuckets = new Map<string, Bucket>();

/**
 * Very small in-memory token bucket (good enough for demo / Vercel function cold starts).
 * For production: move to Upstash Redis / KV.
 */
export function rateLimit(req: NextRequest, opts?: { capacity?: number; refillPerSec?: number }) {
  const capacity = opts?.capacity ?? 30;
  const refillPerSec = opts?.refillPerSec ?? 1;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const bucket = memoryBuckets.get(ip) ?? { tokens: capacity, updatedAt: now };

  const elapsedSec = Math.max(0, (now - bucket.updatedAt) / 1000);
  const refill = elapsedSec * refillPerSec;

  bucket.tokens = Math.min(capacity, bucket.tokens + refill);
  bucket.updatedAt = now;

  if (bucket.tokens < 1) {
    memoryBuckets.set(ip, bucket);
    return { allowed: false, remaining: 0 };
  }

  bucket.tokens -= 1;
  memoryBuckets.set(ip, bucket);
  return { allowed: true, remaining: Math.floor(bucket.tokens) };
}

export function withCors(headers = new Headers()) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return headers;
}

export function getBearer(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m?.[1] ?? null;
}
