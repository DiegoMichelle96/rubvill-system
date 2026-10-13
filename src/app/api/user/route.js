import { readJson, readQuery, route } from "@/lib/route";
import { searchQuerySchema, userSchema } from "@/lib/schemas";
import { createUser, listUsers } from "@/lib/services/users";

export const GET = route((request) => listUsers(readQuery(request, searchQuerySchema)));
export const POST = route(async (request) => createUser(await readJson(request, userSchema)));
