import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getComplaints } from "@/app/(dashboard)/volunteer/_Action/getComplaints";
import ComplaintGrid from "@/components/complaints/ComplaintGrid";
import type { PaginatedComplaints } from "@/types/complaint.type";

export default async function TrendingIssues() {
  const result = await getComplaints({
    page: 1,
    limit: 3,
    sortBy: "upvotes",
    sortOrder: "desc",
  });
  if (!result.success) return null;

  const { data: complaints } = result.data as PaginatedComplaints;
  if (complaints.length === 0) return null;

  return (
    <section className="bg-muted/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Trending
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Most upvoted issues
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              These are the problems the community cares about the most.
            </p>
          </div>
          <Link
            href="/complaints"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ComplaintGrid complaints={complaints} />
      </div>
    </section>
  );
}
