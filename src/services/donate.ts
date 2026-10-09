"use server";

import { serverFetch } from "@/lib/serverFetch";

type DonateData = {
  bkashURL?: string;
  paymentUrl?: string;
  paymentURL?: string;
  callbackURL?: string;
  url?: string;
};

export const donate = async (amount: number) => {
  const result = await serverFetch<DonateData>("/donation", {
    method: "POST",
    body: { amount },
  });

  if (!result.success) {
    return { success: false as const, error: result.error };
  }

  const d = result.data;
  const url =
    d?.bkashURL ?? d?.paymentUrl ?? d?.paymentURL ?? d?.callbackURL ?? d?.url;

  if (!url) {
    console.error("donate: payment url not found in response", d);
    return { success: false as const, error: "Payment URL not found." };
  }

  return { success: true as const, url };
};
