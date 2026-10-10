// getComplaints.ts: prothom line "use server" MUCHE dao
import { serverFetch } from "@/lib/serverFetch";

type ComplaintParams = Record<string, string | number | undefined>;

export async function getComplaints(params: ComplaintParams = {}) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  }

  const queryString = query.toString();
  const endpoint = `/complaints${queryString ? `?${queryString}` : ""}`;

  return serverFetch(endpoint, { method: "GET", cache: "no-store" });
}
