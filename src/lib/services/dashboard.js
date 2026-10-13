import "server-only";
import { connection } from "next/server";
import { toIsoDay } from "@/lib/format";
import { listJobs } from "@/lib/services/cfdiJobs";
import { listClients } from "@/lib/services/clients";
import { listInvoices } from "@/lib/services/invoices";

const MEXICO_MIDNIGHT_UTC_HOUR = 6;

function lastMonths(count) {
  const [year, month] = toIsoDay().split("-").map(Number);
  return Array.from({ length: count }, (_, index) => {
    const offset = month - count + index;
    const start = new Date(Date.UTC(year, offset, 1, MEXICO_MIDNIGHT_UTC_HOUR));
    const end = new Date(Date.UTC(year, offset + 1, 1, MEXICO_MIDNIGHT_UTC_HOUR) - 1);
    return { startDate: start.toISOString(), endDate: end.toISOString() };
  });
}

const total = async (request) => (await request).meta.total;
const sum = async (requests) => (await Promise.all(requests.map(total))).reduce((a, b) => a + b, 0);
const countJobs = (statuses) => sum(statuses.map((status) => listJobs({ status, limit: 1 })));

export async function getDashboard() {
  await connection();
  const [invoicesByMonth, clients, activeJobs, failedJobs, recentJobs] = await Promise.all([
    Promise.all(lastMonths(6).map(async (range) => ({ month: range.startDate, total: await total(listInvoices({ ...range, limit: 1 })) }))),
    total(listClients({ limit: 1 })),
    countJobs(["PENDING", "PROCESSING"]),
    countJobs(["COMPLETED_WITH_ERRORS", "FAILED"]),
    listJobs({ limit: 5 }),
  ]);
  return { invoicesByMonth, clients, activeJobs, failedJobs, recentJobs: recentJobs.data };
}
