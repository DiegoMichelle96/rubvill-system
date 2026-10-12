import { readJson, readQuery, route } from "@/lib/route";
import { clientQuerySchema, clientSchema } from "@/lib/schemas";
import { createClient, listClients } from "@/lib/services/clients";

export const GET = route((request) => listClients(readQuery(request, clientQuerySchema)));
export const POST = route(async (request) => createClient(await readJson(request, clientSchema)));
