import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ComplaintVolunteer } from "@/types/complaint.type";
import AppliedForResolvedComplaint from "./AppliedForResolvedComplaint";

export type AppliedComplaint = {
  id: string;
  complaintId: string;
  volunteerId: string;
  status: string;
  message: string;
  statusNote?: string | null;
  solutionImages?: string[];
  appliedAt: string;
  acceptedAt?: string | null;
  resolvedAt?: string | null;
  updatedAt: string;
};

export type ComplaintSummary = {
  id: string;
  title?: string | null;
  short_description?: string | null;
  description?: string | null;
  city?: string | null;
  location?: string | null;
  priority?: string | null;
  status?: string | null;
  upvotes?: number | null;
  initialImages?: string[] | null;
  category?: { name?: string | null } | null;
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  REVIEWED: "bg-sky-100 text-sky-800 border-sky-200",
  APPLIED: "bg-amber-100 text-amber-800 border-amber-200",
  ACCEPTED: "bg-blue-100 text-blue-800 border-blue-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
  SUBMITTED: "bg-violet-100 text-violet-800 border-violet-200",
  RESOLVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  DELETED: "bg-zinc-200 text-zinc-700 border-zinc-300",
};

const PRIORITY_STYLES: Record<string, string> = {
  LOW: "bg-zinc-100 text-zinc-700 border-zinc-200",
  MEDIUM: "bg-amber-100 text-amber-800 border-amber-200",
  HIGH: "bg-orange-100 text-orange-800 border-orange-200",
  CRITICAL: "bg-red-100 text-red-800 border-red-200",
};

function formatDate(date?: string | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
}

export default function AppliedComplaintCard({
  item,
  complaint,
}: {
  item: ComplaintVolunteer;
  complaint?: ComplaintSummary | null;
}) {
  const solutionImages = item.solutionImages ?? [];
  const cover = complaint?.initialImages?.[0] ?? solutionImages[0];
  const place = [complaint?.location, complaint?.city]
    .filter(Boolean)
    .join(", ");
  const summary = complaint?.short_description ?? complaint?.description;

  const timeline = [
    { label: "Applied", value: item.appliedAt },
    { label: "Accepted", value: item.acceptedAt },
    { label: "Resolved", value: item.resolvedAt },
  ];

  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      {cover && (
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={cover}
            alt={complaint?.title ?? "Complaint image"}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              STATUS_STYLES[item.status] ?? "bg-muted text-foreground",
            )}
          >
            My application: {item.status}
          </Badge>
          {complaint?.priority && (
            <Badge
              variant="outline"
              className={cn(
                "font-medium",
                PRIORITY_STYLES[complaint.priority] ??
                  "bg-muted text-foreground",
              )}
            >
              {complaint.priority}
            </Badge>
          )}
        </div>

        <CardTitle className="line-clamp-2 text-base leading-snug">
          {complaint?.title ?? "Complaint details unavailable"}
        </CardTitle>

        {(place || complaint?.category?.name) && (
          <p className="truncate text-xs text-muted-foreground">
            {[place, complaint?.category?.name].filter(Boolean).join(" • ")}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {summary && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {summary}
          </p>
        )}

        {complaint?.status && (
          <p className="text-xs text-muted-foreground">
            Complaint status:{" "}
            <Badge
              variant="outline"
              className={cn(
                "ml-1 font-medium",
                STATUS_STYLES[complaint.status] ?? "bg-muted text-foreground",
              )}
            >
              {complaint.status.replace("_", " ")}
            </Badge>
          </p>
        )}

        {/* Volunteer-er nijer application */}
        <div className="space-y-1.5 rounded-md bg-muted/50 p-2">
          <p className="text-xs font-medium">My message</p>
          <p className="line-clamp-2 text-sm">{item.message}</p>
          {item.statusNote && (
            <p className="line-clamp-3 text-xs text-muted-foreground">
              Note: {item.statusNote}
            </p>
          )}
          {solutionImages.length > 0 && (
            <div className="flex gap-2 pt-1">
              {solutionImages.slice(0, 3).map((src) => (
                <div
                  key={src}
                  className="relative size-12 overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={src}
                    alt="Solution proof"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ))}
              {solutionImages.length > 3 && (
                <span className="self-end text-xs text-muted-foreground">
                  +{solutionImages.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex-col items-stretch gap-1.5 pt-4 text-xs">
        {timeline.map((t) => (
          <div key={t.label} className="flex justify-between gap-2">
            <span className="text-muted-foreground">{t.label}</span>
            <span className="font-medium">{formatDate(t.value)}</span>
          </div>
        ))}

        {item.status === "ACCEPTED" && (
          <div className="pt-2">
            <AppliedForResolvedComplaint complaintId={item.complaintId} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
