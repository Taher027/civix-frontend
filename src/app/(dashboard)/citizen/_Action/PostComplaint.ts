"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

export const postComplaintAction = async (formData: FormData) => {
  console.log(formData);
  const result = await serverFetch("/complaints/create-complaint", {
    method: "POST",
    body: formData,
  });
  if (result.success) {
    revalidateTag("complaints", { expire: 0 });
  }
  return result;
};
