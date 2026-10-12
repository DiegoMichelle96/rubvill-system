import { readId, readJson, route } from "@/lib/route";
import { invoiceUpdateSchema } from "@/lib/schemas";
import { updateInvoice } from "@/lib/services/invoices";

export const PUT = route(async (request, context) => updateInvoice(await readId(context), await readJson(request, invoiceUpdateSchema)));
