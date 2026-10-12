import "server-only";
import { backend } from "@/lib/backend";

export const listClients = (query) => backend("/client", { query });
export const getClient = (id) => backend(`/client/${id}`);
export const createClient = (body) => backend("/client", { method: "POST", body });
export const updateClient = (id, body) => backend(`/client/${id}`, { method: "PUT", body });
export const deleteClient = (id) => backend(`/client/${id}`, { method: "DELETE" });
