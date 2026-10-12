import "server-only";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";

export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

async function currentSessionId() {
  const token = await getToken({
    req: { headers: await headers() },
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (!token?.sessionId || token.expiresAt < Date.now()) throw new ApiError(401, "Authentication required");
  return token.sessionId;
}

function toError(status, data) {
  if (!data) return new ApiError(502, "Backend unavailable");
  if (status >= 500) {
    console.error("Backend error", status, data);
    return new ApiError(500, "Internal server error");
  }
  const fields = data.errors && Object.fromEntries(data.errors.map(({ path, msg }) => [path, msg]));
  return new ApiError(status, data.error ?? data.message ?? "Request failed", fields);
}

export async function backend(path, { method = "GET", query = {}, body, sessionId } = {}) {
  const url = new URL(path, process.env.API_URL);
  for (const [key, value] of Object.entries(query)) if (value != null) url.searchParams.set(key, value);
  const json = body && !(body instanceof FormData);
  const sid = sessionId === null ? null : (sessionId ?? (await currentSessionId()));
  const res = await fetch(url, {
    method,
    headers: {
      "ngrok-skip-browser-warning": "1",
      ...(json && { "Content-Type": "application/json" }),
      ...(sid && { Cookie: `sessionId=${sid}` }),
    },
    body: json ? JSON.stringify(body) : body,
  });
  if (res.status === 204) return null;
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json() : null;
  if (!res.ok || !data) throw toError(res.status, data);
  return data;
}
