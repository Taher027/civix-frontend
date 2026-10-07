"use client";
import { Building2, ExternalLink, MapPin, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Complaint, ComplaintVolunteer } from "@/types/complaint.type";
import ApplyButton from "./applyButton";

const PRIORITY_STYLES: Record<Complaint["priority"], string> = {
  LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  HIGH: "bg-orange-100 text-orange-700 border-orange-200",
  CRITICAL: "bg-red-100 text-red-700 border-red-200",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
  RESOLVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function ComplaintCard({
  complaint,
  appliedComplaints,
}: {
  complaint: Complaint;
  appliedComplaints?: ComplaintVolunteer[];
}) {
  const {
    id,
    title,
    short_description,
    category,
    city,
    location,
    mapURL,
    priority,
    status,
    upvotes,
    initialImages,
    createdAt,
  } = complaint;
  const myApplication = appliedComplaints?.find(
    (item) => item?.complaintId === id,
  );
  const isApplied = !!myApplication;

  const coverImage = initialImages?.[0];
  const extraImages = (initialImages?.length ?? 0) - 1;
  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      {/* Cover image */}
      <div className="relative aspect-video w-full bg-muted">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        {extraImages > 0 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
            +{extraImages} more
          </span>
        )}

        <Badge
          variant="outline"
          className={cn(
            "absolute left-2 top-2 border",
            PRIORITY_STYLES[priority],
          )}
        >
          {priority}
        </Badge>
      </div>

      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{category.title}</Badge>
          <Badge
            variant="outline"
            className={cn(
              "border",
              STATUS_STYLES[status] ?? "bg-muted text-foreground",
            )}
          >
            {status.replace("_", " ")}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {short_description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 shrink-0" />
          <span>{capitalize(city)}</span>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span className="line-clamp-2">{location}</span>
        </div>

        {mapURL && (
          <a
            href={mapURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-primary hover:underline"
          >
            <ExternalLink className="size-3.5" />
            View on map
          </a>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 border-t pt-4">
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="size-3.5" />
            {upvotes} {upvotes === 1 ? "upvote" : "upvotes"}
          </span>
          <span>{formatDate(createdAt)}</span>
        </div>

        <ApplyButton
          complaintId={id}
          alreadyApplied={isApplied}
          applicationStatus={myApplication?.status}
        />
      </CardFooter>
    </Card>
  );
}
