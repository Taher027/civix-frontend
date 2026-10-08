"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function resolveComplaint(
  complaintId: string,
  volunteerId: string,
) {
  return serverFetch(
    `/volunteer/complaints/${complaintId}/resolve/${volunteerId}`,
    {
      method: "PATCH", // backend e PUT/POST hole bodlao
    },
  );
}
