export function jsonOk<T>(data: T, init?: ResponseInit) {
  return Response.json(
    { ok: true, data, ts: new Date().toISOString() },
    { status: 200, ...init }
  );
}

export function jsonErr(message: string, status = 400, extra?: Record<string, unknown>) {
  return Response.json(
    { ok: false, error: { message, ...extra }, ts: new Date().toISOString() },
    { status }
  );
}
