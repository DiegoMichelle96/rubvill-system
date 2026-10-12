import { signOut } from "next-auth/react";

export async function api(path, { method = "GET", body } = {}) {
  const json = body && !(body instanceof FormData);
  const res = await fetch(`/api${path}`, {
    method,
    headers: json ? { "Content-Type": "application/json" } : undefined,
    body: json ? JSON.stringify(body) : body,
  });
  if (res.status === 401) return signOut({ redirectTo: "/login" });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error(data?.error ?? "Error de conexión"), { fields: data?.fields ?? {} });
  return data;
}
