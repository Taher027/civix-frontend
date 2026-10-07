"use server";

import { serverFetch } from "@/lib/serverFetch";

export const allCategories = async () => {
  const result = await serverFetch("/category/categories", {
    method: "GET",
    tags: ["categories"],
  });
  return result;
};
