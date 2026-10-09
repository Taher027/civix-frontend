import { Inbox } from "lucide-react";
import Link from "next/link";
import { getComplaints } from "@/app/(dashboard)/volunteer/_Action/getComplaints";
import ComplaintGrid from "@/components/complaints/ComplaintGrid";
import ComplaintPagination from "@/components/complaints/complaintPagination";
import { Button } from "@/components/ui/button";
import type { PaginatedComplaints } from "@/types/complaint.type";

const PAGE_SIZE = 3;

export default async function Complaints({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm?: string; page?: string }>;
}) {
  const { searchTerm, page } = await searchParams;
  const currentPage = Math.max(Number(page) || 1, 1);

  const result = await getComplaints({
    searchTerm,
    page: currentPage,
    limit: PAGE_SIZE,
  });

  if (!result.success) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center p-6">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-4 text-center">
          <p className="text-sm font-medium text-destructive">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{result.error}</p>
        </div>
      </div>
    );
  }

  const { data: complaints, meta } = result.data as PaginatedComplaints;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 md:px-6">
      {/* Cards area grows to fill the space */}
      <div className="flex-1">
        {complaints.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-background px-6 py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Inbox className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No complaints found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              There are no complaints to show right now.
            </p>
            {searchTerm && (
              <Link href="/complaints" className="mt-5">
                <Button variant="outline">View all complaints</Button>
              </Link>
            )}
          </div>
        ) : (
          <ComplaintGrid complaints={complaints} />
        )}
      </div>

      {/* Pagination stays pinned at the bottom */}
      {meta.totalPages > 1 && (
        <div className="mt-8 flex justify-center border-t pt-6">
          <ComplaintPagination
            page={meta.page}
            totalPages={meta.totalPages}
            searchTerm={searchTerm}
            basePath="/complaints"
          />
        </div>
      )}
    </main>
  );
}
