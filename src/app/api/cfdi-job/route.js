import { readQuery, route } from "@/lib/route";
import { jobQuerySchema } from "@/lib/schemas";
import { listJobs } from "@/lib/services/cfdiJobs";

export const GET = route((request) => listJobs(readQuery(request, jobQuerySchema)));
