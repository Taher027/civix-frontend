"use server";
import { serverFetch } from "@/lib/serverFetch";

type ApplicationParams = {
  status?: string;
};

export async function getVolunteerApplication(params: ApplicationParams = {}) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  }

  const queryString = query.toString();

  return serverFetch(
    `/volunteer/applications${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      tags: ["volunteer-applications"],
    },
  );
}
