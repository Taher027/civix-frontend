import { ArrowRight, Flame, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { getComplaints } from "@/app/(dashboard)/volunteer/_Action/getComplaints";
import ComplaintGrid from "@/components/complaints/ComplaintGrid";
import type { PaginatedComplaints } from "@/types/complaint.type";
import Reveal from "./Reveal";

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
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-size-[28px_28px] opacity-50 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 -z-10 size-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        {/* Heading */}
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
                <Flame className="size-3.5" />
                Trending
              </span>

              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Most{" "}
                <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  upvoted
                </span>{" "}
                issues
              </h2>

              <p className="mt-3 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
                These are the problems the community cares about the most.
              </p>

              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <ThumbsUp className="size-4 text-primary" />
                Ranked by community upvotes
              </p>
            </div>

            <Link
              href="/complaints"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg border bg-background px-5 text-sm font-semibold shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:self-auto"
            >
              View all complaints
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        {/* Complaints */}
        <Reveal className="mt-10 md:mt-14" delay={0.1}>
          <ComplaintGrid complaints={complaints} />
        </Reveal>
      </div>
    </section>
  );
}
