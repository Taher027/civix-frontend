import AppliedComplaintCard from "@/components/dashboard/AppliedComplaintsCard";
import type { AppliedComplaint } from "@/types/complaint.type";
import { getMyAppliedComplaints } from "../_Action/getMyAppliedComplaints";

export default async function AcceptedComponent() {
  const status = "ACCEPTED";
  const appliedComplaints = await getMyAppliedComplaints(status);
  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">Accepted Complaints</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {appliedComplaints.map((item: AppliedComplaint) => (
          <AppliedComplaintCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
