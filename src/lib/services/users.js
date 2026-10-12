import "server-only";
import { backend } from "@/lib/backend";

const toUser = ({ id, name, email, createdAt, updatedAt, deletedAt }) => ({ id, name, email, createdAt, updatedAt, deletedAt });

export async function listUsers(query) {
  const { data, meta } = await backend("/user", { query });
  return { data: data.map(toUser), meta };
}
export const getUser = async (id) => toUser(await backend(`/user/${id}`));
export const createUser = async (body) => toUser(await backend("/user", { method: "POST", body }));
export const updateUser = async (id, body) => toUser(await backend(`/user/${id}`, { method: "PUT", body }));
export const deleteUser = (id) => backend(`/user/${id}`, { method: "DELETE" });
