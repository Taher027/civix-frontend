"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

type UploadAvatarData = { avatar: string };

export async function uploadProfileImage(formData: FormData) {
  const file = formData.get("profileImage");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false as const, error: "Please select an image." };
  }
  if (!file.type.startsWith("image/")) {
    return { success: false as const, error: "Only image files are allowed." };
  }

  const result = await serverFetch<UploadAvatarData>("/user/profile-image", {
    method: "PATCH",
    body: formData,
  });
  console.log(result);
  if (result.success) {
    revalidatePath("/profile");
  }

  return result;
}
