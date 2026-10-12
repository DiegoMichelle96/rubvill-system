import "server-only";
import { backend } from "@/lib/backend";

export const listInvoices = (query) => backend("/invoice", { query });
export const updateInvoice = (id, body) => backend(`/invoice/${id}`, { method: "PUT", body });

export function createDownloadRequest(data) {
  const body = new FormData();
  for (const [key, value] of Object.entries(data)) body.append(key, value);
  return backend("/invoice/download-request", { method: "POST", body });
}
