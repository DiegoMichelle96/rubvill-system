import { unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { ApiError } from "@/lib/backend";

export function route(handler) {
  return async (request, context) => {
    try {
      const data = await handler(request, context);
      return data == null ? new Response(null, { status: 204 }) : Response.json(data);
    } catch (error) {
      unstable_rethrow(error);
      if (error instanceof ApiError) return Response.json({ error: error.message, fields: error.fields }, { status: error.status });
      if (error instanceof z.ZodError) {
        const fields = Object.fromEntries(error.issues.map(({ path, message }) => [path.join("."), message]));
        return Response.json({ error: "Datos inválidos", fields }, { status: 400 });
      }
      console.error(error);
      return Response.json({ error: "Error interno del servidor" }, { status: 500 });
    }
  };
}

export const readId = async (context) => z.object({ id: z.uuid() }).parse(await context.params).id;

export const readQuery = (request, schema) =>
  schema.parse(Object.fromEntries([...request.nextUrl.searchParams].filter(([, value]) => value !== "")));

export const readJson = async (request, schema) => schema.parse(await request.json().catch(() => null));

export const readForm = async (request, schema) =>
  schema.parse(Object.fromEntries(await request.formData().catch(() => new FormData())));
