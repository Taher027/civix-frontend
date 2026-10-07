import { redirect } from "next/navigation";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import { complaintDetails } from "@/complaint/getSingleCompliantDetails";
import ComplaintDetailsCard from "@/components/complaints/complaintDetailsCard";

export default async function ComplaintDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getMe();
  const { id } = await params;
  const result = await complaintDetails(id);
  if (!result.success) {
    return "NO Data Found";
  }
  const userRole = user?.role.toLowerCase();

  return (
    <div>
      <ComplaintDetailsCard complaint={result?.data} user={userRole} />
    </div>
  );
}
