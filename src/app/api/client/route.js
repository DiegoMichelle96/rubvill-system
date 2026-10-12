import { readJson, readQuery, route } from "@/lib/route";
import { clientSchema, searchQuerySchema } from "@/lib/schemas";
import { createClient, listClients } from "@/lib/services/clients";

export const GET = route((request) => listClients(readQuery(request, searchQuerySchema)));
export const POST = route(async (request) => createClient(await readJson(request, clientSchema)));
