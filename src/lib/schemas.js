import { z } from "zod";

const page = z.coerce.number().int().min(1).optional();
const limit = z.coerce.number().int().min(1).max(100).optional();
const date = z.coerce.date({ error: "Invalid date" }).transform((value) => value.toISOString());
const dateRange = { page, limit, startDate: date.optional(), endDate: date.optional() };
const keyFile = (extension) =>
  z.file().max(1024 * 1024).refine(({ name }) => name.toLowerCase().endsWith(extension), `Must be a ${extension} file`);

export const jobStatuses = ["PENDING", "PROCESSING", "COMPLETED", "COMPLETED_WITH_ERRORS", "FAILED"];
export const jobSteps = ["CFDI_PROCESSING", "CFDI_ARCHIVING", "CLEANUP", "REMOVE_KEY_FROM_S3", "COMPLETED", "FAILED"];
export const jobItemStatuses = ["PENDING", "RETRY_PENDING", "PROCESSING", "CFDI_SAVED", "COMPLETED", "FAILED"];

export const loginSchema = z.object({ email: z.email(), password: z.string().min(1) });

export const clientSchema = z.object({
  name: z.string().trim().min(1),
  rfc: z.string().trim().toUpperCase().regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/, "Invalid RFC"),
});
export const clientUpdateSchema = clientSchema.partial();
export const clientQuerySchema = z.object({ page, limit, search: z.string().trim().optional() });

export const userSchema = z.object({ name: z.string().trim().min(1), email: z.email(), password: z.string().min(1) });
export const userUpdateSchema = userSchema.partial();

export const invoiceQuerySchema = z.object({ ...dateRange, clientId: z.uuid().optional(), tipoSolicitud: z.string().optional() });
export const invoiceUpdateSchema = z.object({ paidDate: date.nullable() });

export const downloadRequestSchema = z
  .object({
    clientId: z.uuid(),
    password: z.string().min(1),
    tipoSolicitud: z.string().min(1),
    fechaInicial: date,
    fechaFinal: date,
    certificate: keyFile(".cer"),
    privateKey: keyFile(".key"),
  })
  .refine(({ fechaInicial, fechaFinal }) => fechaInicial <= fechaFinal, {
    path: ["fechaFinal"],
    message: "Must be on or after fechaInicial",
  });

export const jobQuerySchema = z.object({
  ...dateRange,
  status: z.enum(jobStatuses).optional(),
  step: z.enum(jobSteps).optional(),
  satSolicitudId: z.string().optional(),
});
export const jobDetailQuerySchema = z.object({ status: z.enum(jobItemStatuses).optional() });
