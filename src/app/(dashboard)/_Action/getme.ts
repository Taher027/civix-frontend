"use server";
import { cookies } from "next/headers";

export const getMe = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/getme`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: { tags: ["my-profile"] },
    },
  );

  if (!res.ok) return false;

  const result = await res.json();
  return result?.data ?? [];
};
