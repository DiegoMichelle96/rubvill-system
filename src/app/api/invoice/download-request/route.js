import { readForm, route } from "@/lib/route";
import { downloadRequestSchema } from "@/lib/schemas";
import { createDownloadRequest } from "@/lib/services/invoices";

export const POST = route(async (request) => createDownloadRequest(await readForm(request, downloadRequestSchema)));
