import { serverFetch } from "@/lib/serverFetch";

export const myComplaints = async () => {
  const result = serverFetch("/complaints/my-complaint", {
    method: "GET",
  });
  return result;
};
