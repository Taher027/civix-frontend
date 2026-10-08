"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function acceptVolunteer(
  complaintId: string,
  volunteerId: string,
) {
  return serverFetch(
    `/volunteer/complaints/${complaintId}/accept/${volunteerId}`,
    {
      method: "PATCH",
    },
  );
}
