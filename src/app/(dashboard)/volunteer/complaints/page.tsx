import ComplaintCard from "@/components/dashboard/volunteer/applyCompliantCard";
import type { Complaint } from "@/types/complaint.type";
import { getComplaints } from "../_Action/getComplaints";
import { getMyAppliedComplaints } from "../_Action/getMyAppliedComplaints";

export default async function Complaints() {
  const result = await getComplaints({ status: "PENDING" });
  const appliedComplaints = await getMyAppliedComplaints();

  if (!result.success) {
    return <p className="text-destructive">{result.error}</p>;
  }

  return (
    <div className="grid p-10 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {result.data.map((complaint: Complaint) => (
        <ComplaintCard
          key={complaint.id}
          complaint={complaint}
          appliedComplaints={appliedComplaints}
        />
      ))}
    </div>
  );
}
