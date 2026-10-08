"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { reviewVolunteerApplication } from "@/app/(dashboard)/admin/_Action/reviewVolunteerApplication";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type {
  VolunteerApplication,
  VolunteerApplicationStatus,
} from "@/types/volunteer.type";

const STATUSES: VolunteerApplicationStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED",
];

const STATUS_STYLES: Record<VolunteerApplicationStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  APPROVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
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

export default function VolunteerApplicationCard({
  application,
}: {
  application: VolunteerApplication;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<VolunteerApplicationStatus>(
    application.status,
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const unchanged = selected === application.status;

  const handleUpdate = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await reviewVolunteerApplication(
        application.userId,
        selected,
      );

      if (result.success) {
        setMessage({ type: "success", text: "Status updated" });
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    });
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="truncate text-base">
              {application.user.name}
            </CardTitle>
            <p className="truncate text-sm text-muted-foreground">
              {application.user.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {application.user.phone}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn("font-medium", STATUS_STYLES[application.status])}
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="line-clamp-3 text-sm">{application.bio}</p>

        <div className="flex flex-wrap gap-1.5">
          {application.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          Total resolved:{" "}
          <span className="font-medium text-foreground">
            {application.totalResolved}
          </span>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex-col items-stretch gap-3 pt-4">
        <div className="space-y-1 text-xs">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Applied</span>
            <span className="font-medium">
              {formatDate(application.appliedAt)}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">Reviewed</span>
            <span className="font-medium">
              {formatDate(application.reviewedAt)}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Select
            value={selected}
            onValueChange={(v) => setSelected(v as VolunteerApplicationStatus)}
            disabled={isPending}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleUpdate} disabled={unchanged || isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>

        {message && (
          <p
            className={cn(
              "text-xs",
              message.type === "success" ? "text-emerald-600" : "text-red-600",
            )}
          >
            {message.text}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
