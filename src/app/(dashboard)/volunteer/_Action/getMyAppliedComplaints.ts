"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { ComplaintVolunteer } from "@/types/complaint.type";

export const getMyAppliedComplaints = async (
  status?: ComplaintVolunteer["status"],
): Promise<ComplaintVolunteer[]> => {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";

  const result = await serverFetch<ComplaintVolunteer[]>(
    `/complaints/my-applied-complaints${query}`,
    { method: "GET", cache: "no-store", tags: ["applied-complaints"] },
  );

  if (!result.success) {
    console.error("getMyAppliedComplaints failed:", result.error);
    return [];
  }

  return result.data ?? [];
};
