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

const STATUS_STYLES: Record<string, string> = {
  APPLIED: "bg-amber-100 text-amber-800 border-amber-200",
  ACCEPTED: "bg-blue-100 text-blue-800 border-blue-200",
  RESOLVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
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
}: {
  item: AppliedComplaint;
}) {
  const images = item.solutionImages ?? [];
  const extra = images.length - 1;

  const timeline = [
    { label: "Applied", value: item.appliedAt },
    { label: "Accepted", value: item.acceptedAt },
    { label: "Resolved", value: item.resolvedAt },
  ];

  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      {/* Solution image */}
      {images.length > 0 && (
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={images[0]}
            alt="Solution proof"
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          {extra > 0 && (
            <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
              +{extra} more
            </span>
          )}
        </div>
      )}

      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              STATUS_STYLES[item.status] ?? "bg-muted text-foreground",
            )}
          >
            {item.status}
          </Badge>
          <span className="truncate text-xs text-muted-foreground">
            #{item.complaintId.slice(0, 8)}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-base leading-snug">
          {item.message}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {item.statusNote && (
          <p className="line-clamp-4 text-sm text-muted-foreground">
            {item.statusNote}
          </p>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex-col items-stretch gap-1.5 pt-4 text-xs">
        {timeline.map((t) => (
          <div key={t.label} className="flex justify-between gap-2">
            <span className="text-muted-foreground">{t.label}</span>
            <span className="font-medium">{formatDate(t.value)}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
