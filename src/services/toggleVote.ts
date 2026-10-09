"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

export async function toggleVote(complaintId: string) {
  const result = await serverFetch(
    `/complaints/update-complaint-vote/${complaintId}`,
    {
      method: "PATCH",
    },
  );

  if (result.success) {
    revalidatePath("/complaints");
    revalidatePath(`/complaints/${complaintId}`);
  }

  return result;
}
