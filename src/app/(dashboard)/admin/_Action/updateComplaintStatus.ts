"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

export type UpdateComplaintStatusPayload = {
  status: "RESOLVED" | "REJECTED";
  statusNote?: string;
};

export const updateComplaintStatus = async (
  id: string,
  payload: UpdateComplaintStatusPayload,
) => {
  const result = await serverFetch(
    `/complaints/update-complaint-status/${id}`,
    {
      method: "PATCH",
      body: payload,
    },
  );

  if (result.success) {
    revalidateTag("complaints", { expire: 0 });
    revalidateTag(`complaint-${id}`, { expire: 0 });
  }

  return result;
};
