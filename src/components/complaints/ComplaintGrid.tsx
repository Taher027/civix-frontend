import type { Complaint } from "@/types/complaint.type";
import ComplaintCard from "./complaintCard";

export default function ComplaintGrid({
  complaints,
}: {
  complaints: Complaint[];
}) {
  if (complaints.length === 0) {
    return <p className="text-muted-foreground">No complaints found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {complaints.map((c) => (
        <ComplaintCard key={c.id} complaint={c} />
      ))}
    </div>
  );
}
