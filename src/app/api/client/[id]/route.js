import { readId, readJson, route } from "@/lib/route";
import { clientUpdateSchema } from "@/lib/schemas";
import { deleteClient, getClient, updateClient } from "@/lib/services/clients";

export const GET = route(async (_, context) => getClient(await readId(context)));
export const PUT = route(async (request, context) => updateClient(await readId(context), await readJson(request, clientUpdateSchema)));
export const DELETE = route(async (_, context) => deleteClient(await readId(context)));
