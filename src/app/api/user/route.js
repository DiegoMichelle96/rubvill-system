import { readJson, route } from "@/lib/route";
import { userSchema } from "@/lib/schemas";
import { createUser, listUsers } from "@/lib/services/users";

export const GET = route(() => listUsers());
export const POST = route(async (request) => createUser(await readJson(request, userSchema)));
