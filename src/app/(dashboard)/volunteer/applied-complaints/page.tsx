import AppliedComplaintCard, {
  type ComplaintSummary,
} from "@/components/dashboard/AppliedComplaintsCard";
import { getSingleComplaint } from "@/services/getSingleComplaintDetails";
import { getMyAppliedComplaints } from "../_Action/getMyAppliedComplaints";

function unwrap<T>(res: unknown): T | null {
  if (!res || typeof res !== "object") return null;
  const r = res as { success?: boolean; data?: unknown };
  if (r.success === false) return null;
  if ("data" in r) {
    const d = r.data;
    if (d && typeof d === "object" && "data" in d) {
      return (d as { data: T }).data;
    }
    return (d ?? null) as T | null;
  }
  return res as T;
}

export default async function MyApplied() {
  const appliedComplaints = await getMyAppliedComplaints();

  const details = await Promise.all(
    appliedComplaints.map(async (item) => {
      try {
        return unwrap<ComplaintSummary>(
          await getSingleComplaint(item.complaintId),
        );
      } catch {
        return null;
      }
    }),
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">My Applied Complaints</h1>

      {appliedComplaints.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t applied to any complaints yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {appliedComplaints.map((item, index) => (
            <AppliedComplaintCard
              key={item.id}
              item={item}
              complaint={details[index]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
