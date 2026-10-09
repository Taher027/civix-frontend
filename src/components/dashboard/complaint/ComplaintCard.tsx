import { Calendar, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Complaint } from "@/types/complaint.type";

const priorityStyles: Record<string, string> = {
  HIGH: "bg-red-100 text-red-700 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-slate-100 text-slate-700 border-slate-200",
  IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
  RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function ComplaintCard({
  complaint,
  userRole,
}: {
  complaint: Complaint;
  userRole: string;
}) {
  const {
    title,
    short_description,
    category,
    city,
    location,
    mapURL,
    priority,
    status,
    initialImages,
    resolvedImages,
    createdAt,
    resolvedAt,
  } = complaint;

  const cover = initialImages?.[0];
  const isResolved = status === "RESOLVED";

  return (
    <Card className="group flex h-full w-full max-w-sm flex-col gap-3 overflow-hidden py-0 pb-4 transition-shadow hover:shadow-md">
      {/* Cover image */}
      <div className="relative h-44 w-full bg-muted">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge
            variant="outline"
            className={cn(
              "h-5 px-2 text-xs backdrop-blur",
              priorityStyles[priority],
            )}
          >
            {priority}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "h-5 px-2 text-xs backdrop-blur",
              statusStyles[status],
            )}
          >
            {status.replace("_", " ")}
          </Badge>
        </div>

        {isResolved && resolvedImages.length > 0 && (
          <Badge className="absolute bottom-3 right-3 h-5 gap-1 bg-emerald-600 px-2 text-xs">
            <CheckCircle2 className="size-3" />
            Resolved
          </Badge>
        )}
      </div>

      <CardHeader className="space-y-1 px-4 py-0">
        <span className="text-xs font-medium text-muted-foreground">
          {category.title}
        </span>
        <h3 className="line-clamp-1 text-base font-semibold leading-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 px-4 py-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {short_description}
        </p>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">
              {location}, <span className="capitalize">{city}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0" />
            <span>
              {formatDate(createdAt)}
              {resolvedAt && ` · Resolved ${formatDate(resolvedAt)}`}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-t px-4 pt-4 [.border-t]:pt-4">
        <a
          href={mapURL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex-1",
          )}
        >
          View map
        </a>
        <Link
          href={`/${userRole}/my-complaints/${complaint.id}`}
          className={cn(buttonVariants({ size: "sm" }), "flex-1")}
        >
          Details
        </Link>
      </CardFooter>
    </Card>
  );
}
