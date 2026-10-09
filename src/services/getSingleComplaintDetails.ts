"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Complaint } from "@/types/complaint.type";

export const getSingleComplaint = async (id: string) => {
  return serverFetch<Complaint>(`/complaints/${id}`, {
    method: "GET",
    cache: "no-store",
  });
};
