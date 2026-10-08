"use server";

import { serverFetch } from "@/lib/serverFetch";
import type { VolunteerApplicationStatus } from "@/types/volunteer.type";

export async function reviewVolunteerApplication(
  userId: string,
  status: VolunteerApplicationStatus,
) {
  return serverFetch(`/volunteer/applications/${userId}/review`, {
    method: "PATCH",
    body: { status },
  });
}
