import { serverFetch } from "@/lib/serverFetch";
import { success } from "zod";

export const complaintDetails = async (id: string) => {
  const result = await serverFetch(`/complaints/${id}`, {
    method: "GET",
    tags: ["complaints", `complaint-${id}`],
    cache: "force-cache",
  });
  return result;
};
