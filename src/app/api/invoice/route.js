import { readQuery, route } from "@/lib/route";
import { invoiceQuerySchema } from "@/lib/schemas";
import { listInvoices } from "@/lib/services/invoices";

export const GET = route((request) => listInvoices(readQuery(request, invoiceQuerySchema)));
