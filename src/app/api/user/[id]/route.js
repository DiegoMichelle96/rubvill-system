import { readId, readJson, route } from "@/lib/route";
import { userUpdateSchema } from "@/lib/schemas";
import { deleteUser, getUser, updateUser } from "@/lib/services/users";

export const GET = route(async (_, context) => getUser(await readId(context)));
export const PUT = route(async (request, context) => updateUser(await readId(context), await readJson(request, userUpdateSchema)));
export const DELETE = route(async (_, context) => deleteUser(await readId(context)));
