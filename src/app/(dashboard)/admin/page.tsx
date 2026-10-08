import { Suspense } from "react";
import AdminComplaintCard from "@/components/dashboard/admin/adminComplaintCard";
import ComplaintFilters from "@/components/dashboard/admin/complaintFilter";
import type { AdminComplaint } from "@/types/adminComplaint.type";
import { getComplaints } from "../volunteer/_Action/getComplaints";

export default async function Complaints({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const { status, search } = await searchParams;

  const result = await getComplaints({
    status,
    searchTerm: search,
  });

  const complaints: AdminComplaint[] = result.success
    ? Array.isArray(result.data)
      ? result.data
      : (result.data?.data ?? [])
    : [];

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">Complaints</h1>

      <Suspense>
        <ComplaintFilters />
      </Suspense>

      {!result.success && (
        <p className="mb-4 text-sm text-red-600">{result.error}</p>
      )}

      {complaints.length === 0 ? (
        <p className="text-muted-foreground">No complaints found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {complaints.map((complaint) => (
            <AdminComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}
