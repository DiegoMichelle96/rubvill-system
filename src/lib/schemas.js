import { z } from "zod";
import { jobItemStatuses, jobStatuses, jobSteps } from "@/lib/labels";

z.config(z.locales.es());

const page = z.coerce.number().int().min(1).optional();
const limit = z.coerce.number().int().min(1).max(100).optional();
const day = /^\d{4}-\d{2}-\d{2}$/;
const date = (time) =>
  z.preprocess(
    (value) => (typeof value === "string" && day.test(value) ? `${value}T${time}-06:00` : value),
    z.coerce.date({ error: "Fecha inválida" }).transform((value) => value.toISOString()),
  );
const startDate = date("00:00:00");
const endDate = date("23:59:59.999");
const dateRange = { page, limit, startDate: startDate.optional(), endDate: endDate.optional() };
const keyFile = (extension) =>
  z.file().max(1024 * 1024).refine(({ name }) => name.toLowerCase().endsWith(extension), `Debe ser un archivo ${extension}`);

export const idSchema = z.uuid();

export function parseSearchParams(schema, params) {
  const result = schema.safeParse(Object.fromEntries(Object.entries(params).filter(([, value]) => value !== "")));
  return result.success ? result.data : {};
}

export const loginSchema = z.object({ email: z.email(), password: z.string().min(1) });

export const clientSchema = z.object({
  name: z.string().trim().min(1),
  rfc: z.string().trim().toUpperCase().regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/, "RFC inválido"),
});
export const clientUpdateSchema = clientSchema.partial();
export const searchQuerySchema = z.object({ page, limit, search: z.string().trim().optional() });

export const userSchema = z.object({ name: z.string().trim().min(1), email: z.email(), password: z.string().min(1) });
export const userUpdateSchema = userSchema.partial();

export const invoiceQuerySchema = z.object({ ...dateRange, clientId: z.uuid().optional(), tipoSolicitud: z.string().optional() });
export const invoiceUpdateSchema = z.object({ paidDate: startDate.nullable() });

export const downloadRequestSchema = z
  .object({
    clientId: z.uuid(),
    password: z.string().min(1),
    tipoSolicitud: z.string().min(1),
    fechaInicial: startDate,
    fechaFinal: endDate,
    certificate: keyFile(".cer"),
    privateKey: keyFile(".key"),
  })
  .refine(({ fechaInicial, fechaFinal }) => fechaInicial <= fechaFinal, {
    path: ["fechaFinal"],
    message: "Debe ser igual o posterior a la fecha inicial",
  });

export const jobQuerySchema = z.object({
  ...dateRange,
  status: z.enum(jobStatuses).optional(),
  step: z.enum(jobSteps).optional(),
  satSolicitudId: z.string().optional(),
});
export const jobDetailQuerySchema = z.object({ status: z.enum(jobItemStatuses).optional() });
