"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { Donation } from "@/types/donation.type";

export const getMyDonations = async (): Promise<Donation[]> => {
  const result = await serverFetch<Donation[]>("/donation/my-donations", {
    method: "GET",
    cache: "no-store",
    tags: ["donations"],
  });

  if (!result.success) {
    return [];
  }

  return result.data ?? [];
};
