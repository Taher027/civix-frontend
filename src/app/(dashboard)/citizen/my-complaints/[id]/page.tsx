import { notFound } from "next/navigation";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import ComplaintDetailsCard from "@/components/complaints/complaintsDetailsView";
import { getSingleComplaint } from "@/services/getSingleComplaintDetails";

export default async function ComplaintDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, result] = await Promise.all([getMe(), getSingleComplaint(id)]);

  if (!result.success) notFound();

  const userRole: string | undefined = user
    ? user.role?.toLowerCase()
    : undefined;

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6">
      <ComplaintDetailsCard complaint={result.data} user={userRole} />
    </div>
  );
}
