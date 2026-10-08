"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { AppliedComplaint } from "@/types/complaint.type";

export const getMyAppliedComplaints = async (
  status?: string,
): Promise<AppliedComplaint[]> => {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";

  const result = await serverFetch<AppliedComplaint[]>(
    `/complaints/my-applied-complaints${query}`,
    { method: "GET", cache: "no-store" },
  );

  if (!result.success) {
    console.error("getMyAppliedComplaints failed:", result.error);
    return [];
  }

  return result.data ?? [];
};
