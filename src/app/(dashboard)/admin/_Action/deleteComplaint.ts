"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function deleteComplaint(complaintId: string) {
  return serverFetch(`/complaints/delete-complaint/${complaintId}`, {
    method: "DELETE",
  });
}
