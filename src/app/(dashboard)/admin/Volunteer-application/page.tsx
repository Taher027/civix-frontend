import VolunteerApplicationCard from "@/components/dashboard/admin/volunteerApplicationReviewCard";
import { getVolunteerApplication } from "../_Action/getVolunteerApplication";
import type { VolunteerApplication } from "@/types/volunteer.type";

export default async function VolunteerApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams; // status na dile shob dekhabe
  const result = await getVolunteerApplication({ status });
  const applications: VolunteerApplication[] = result.success
    ? result.data
    : [];

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-xl font-semibold">Volunteer Applications</h1>

      {!result.success && (
        <p className="mb-4 text-sm text-red-600">{result.error}</p>
      )}

      {applications.length === 0 ? (
        <p className="text-muted-foreground">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {applications.map((app) => (
            <VolunteerApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}
