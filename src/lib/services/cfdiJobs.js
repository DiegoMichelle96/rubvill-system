import "server-only";
import { backend } from "@/lib/backend";

export const listJobs = (query) => backend("/cfdi-job", { query });
export const getJobDetail = (id, query) => backend(`/cfdi-job/detail/${id}`, { query });
