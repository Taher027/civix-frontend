import Link from "next/link";
import { notFound } from "next/navigation";
import ComplaintDetailsView from "@/components/complaints/complaintsDetailsView";
import { getSingleComplaint } from "@/services/getSingleComplaintDetails";

export default async function ComplaintDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getSingleComplaint(id);

  if (!res.success) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 md:p-6">
      <Link href="/complaints" className="text-sm text-primary underline">
        ← Back to complaints
      </Link>
      <ComplaintDetailsView complaint={res.data} />
    </div>
  );
}
