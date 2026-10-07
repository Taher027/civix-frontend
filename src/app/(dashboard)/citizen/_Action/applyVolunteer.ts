"use server";
import { serverFetch } from "@/lib/serverFetch";

type ApplyVolunteerInput = {
  bio: string;
  skills: string[];
};

export async function applyVolunteer(payload: ApplyVolunteerInput) {
  const result = await serverFetch("/volunteer/apply", {
    method: "POST",
    body: payload,
  });

  return result;
}
