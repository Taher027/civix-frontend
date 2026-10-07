"use server";
import { serverFetch } from "@/lib/serverFetch";

export async function applyComplaint(id: string) {
  const result = serverFetch(`/volunteer/complaints/${id}/apply`, {
    method: "POST",
    tags: ["apply-volunteer"],
  });
  return result;
}
