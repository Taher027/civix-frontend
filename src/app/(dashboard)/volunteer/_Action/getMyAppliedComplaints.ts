"use server";
import { serverFetch } from "@/lib/serverFetch";

export async function getMyAppliedComplaints() {
  const result = await serverFetch("/complaints/my-applied-complaints", {
    method: "GET",
    tags: ["applied-complaints"],
  });

  if (result.success) {
    return result.data;
  } else {
    return [];
  }
}
