import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getComplaints } from "@/app/(dashboard)/volunteer/_Action/getComplaints";
import type { PaginatedComplaints } from "@/types/complaint.type";

export default async function ResolvedShowcase() {
  const result = await getComplaints({
    status: "RESOLVED",
  });

  if (!result.success || !result.data) return null;

  const { data } = result.data as PaginatedComplaints;

  // Shudhu jegulo-te before ar after duita photo-i ache
  const complaints = (data ?? []).flatMap((c) => {
    const before = c.initialImages?.[0];
    const after = c.resolvedImages?.[0];
    if (!before || !after) return [];
    return [
      {
        id: c.id,
        title: c.title,
        location: c.location,
        city: c.city,
        before,
        after,
      },
    ];
  });

  if (complaints.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Real results
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Problems that got fixed
        </h2>
        <p className="mt-3 text-muted-foreground">
          Before and after photos from issues resolved by our volunteers.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {complaints.map((c) => (
          <Link
            key={c.id}
            href={`/complaints/${c.id}`}
            className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
          >
            <div className="grid grid-cols-2">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={c.before}
                  alt={`${c.title} before`}
                  fill
                  sizes="(min-width: 1024px) 17vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 rounded bg-background/90 px-2 py-0.5 text-xs font-medium">
                  Before
                </span>
              </div>

              <div className="relative aspect-square bg-muted">
                <Image
                  src={c.after}
                  alt={`${c.title} after`}
                  fill
                  sizes="(min-width: 1024px) 17vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  After
                </span>
              </div>
            </div>

            <div className="space-y-1 p-5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                <CheckCircle2 className="size-4" />
                Resolved
              </div>
              <h3 className="line-clamp-1 font-semibold">
                {c.title || "Untitled"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {[c.location, c.city].filter(Boolean).join(", ") ||
                  "No location provided"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/complaints"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Browse all complaints
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
