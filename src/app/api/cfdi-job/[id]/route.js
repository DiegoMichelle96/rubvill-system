import { readId, readQuery, route } from "@/lib/route";
import { jobDetailQuerySchema } from "@/lib/schemas";
import { getJobDetail } from "@/lib/services/cfdiJobs";

export const GET = route(async (request, context) => getJobDetail(await readId(context), readQuery(request, jobDetailQuerySchema)));
