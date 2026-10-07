"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";
import { UpdateProfileInput } from "@/types/auth.type";

export async function updateProfile(data: UpdateProfileInput) {
  const result = await serverFetch("/user/update-user", {
    method: "PATCH",
    body: data,
  });

  return result;
}
