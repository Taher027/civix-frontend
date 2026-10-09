"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

export const appliedForResolveComplaint = async (
  complaintId: string,
  formData: FormData, // string na, FormData
) => {
  const result = await serverFetch(
    `/volunteer/complaints/${complaintId}/status`,
    { method: "PATCH", body: formData },
  );

  if (result.success) {
    revalidateTag("applied-complaints", { expire: 0 });
    revalidateTag(`complaint-${complaintId}`, { expire: 0 });
  }

  return result;
};
