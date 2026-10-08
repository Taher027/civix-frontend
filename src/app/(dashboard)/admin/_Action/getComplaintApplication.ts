"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function getComplaintApplications(complaintId: string) {
  return serverFetch(`/volunteer/complaints/${complaintId}/applications`, {
    method: "GET",
  });
}
