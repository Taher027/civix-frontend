"use server";
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

  return serverFetch(`/complaints${queryString ? `?${queryString}` : ""}`, {
    method: "GET",
    tags: ["complaints"],
  });
}
