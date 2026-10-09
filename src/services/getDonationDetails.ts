"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Donation } from "@/types/donation.type";

export const getDonationDetails = async (id: string) => {
  const result = await serverFetch<Donation>(`/donation/${id}`, {
    method: "GET",
    cache: "no-store",
    tags: ["donations", `donation-${id}`],
  });

  return result;
};
