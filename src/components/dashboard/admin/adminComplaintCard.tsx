"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { acceptVolunteer } from "@/app/(dashboard)/admin/_Action/acceptVolunteer";
import { deleteComplaint } from "@/app/(dashboard)/admin/_Action/deleteComplaint";
import { getComplaintApplications } from "@/app/(dashboard)/admin/_Action/getComplaintApplication";
import { resolveComplaint } from "@/app/(dashboard)/admin/_Action/resolveComplaint";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type {
  AdminComplaint,
  ComplaintStatus,
} from "@/types/adminComplaint.type";

type ApplicationStatus =
  | "APPLIED"
  | "ACCEPTED"
  | "SUBMITTED"
  | "REJECTED"
  | "RESOLVED";

type Application = {
  id: string;
  volunteerId: string;
  status: ApplicationStatus;
  message?: string | null;
  statusNote?: string | null;
  solutionImages?: string[] | null;
  appliedAt?: string | null;
  volunteer?: {
    user?: { name?: string | null; email?: string | null } | null;
  } | null;
};

// API-r asol field gulo (Prisma schema onujayi) support korar jonno
type ComplaintData = AdminComplaint & {
  initialImages?: string[] | null;
  short_description?: string | null;
};

const STATUS_STYLES: Record<ComplaintStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  REVIEWED: "bg-sky-100 text-sky-800 border-sky-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
  RESOLVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  DELETED: "bg-zinc-200 text-zinc-700 border-zinc-300",
};

const APPLICATION_STYLES: Record<ApplicationStatus, string> = {
  APPLIED: "bg-amber-100 text-amber-800 border-amber-200",
  ACCEPTED: "bg-blue-100 text-blue-800 border-blue-200",
  SUBMITTED: "bg-violet-100 text-violet-800 border-violet-200",
  RESOLVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

function formatDate(date?: string | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date(date));
}

export default function AdminComplaintCard({
  complaint,
}: {
  complaint: ComplaintData;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [loadingApps, setLoadingApps] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const isClosed =
    complaint.status === "RESOLVED" ||
    complaint.status === "REJECTED" ||
    complaint.status === "DELETED";
  const cover = complaint.initialImages?.[0] ?? complaint.images?.[0];
  const description = complaint.description ?? complaint.short_description;
  // List API te complaintVolunteers na thakle count dialog khola porjonto jana jabe na
  const applicationCount: number | null =
    applications?.length ?? complaint.complaintVolunteers?.length ?? null;
  // Ekhono accept/reject hoyni emon applicant
  const waitingCount =
    applications?.filter((a) => a.status === "APPLIED").length ?? 0;

  const loadApplications = useCallback(async () => {
    setLoadingApps(true);
    const result = await getComplaintApplications(complaint.id);
    if (result.success) {
      const raw = result.data as
        | Application[]
        | { data?: Application[] }
        | undefined;
      setApplications(Array.isArray(raw) ? raw : (raw?.data ?? []));
    } else {
      setError(result.error);
    }
    setLoadingApps(false);
  }, [complaint.id]);

  // Card load hoyei application gulo ene nei, jate keu apply korle sathe sathe dekha jay
  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  const run = (
    key: string,
    action: () => ReturnType<typeof resolveComplaint>,
  ) => {
    setError(null);
    setActiveKey(key);
    startTransition(async () => {
      const result = await action();
      if (result.success) {
        await loadApplications();
        router.refresh();
      } else {
        setError(result.error);
      }
      setActiveKey(null);
    });
  };

  const handleAccept = (volunteerId: string) =>
    run(`accept-${volunteerId}`, () =>
      acceptVolunteer(complaint.id, volunteerId),
    );

  const handleResolve = (volunteerId: string) =>
    run(`resolve-${volunteerId}`, () =>
      resolveComplaint(complaint.id, volunteerId),
    );

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteComplaint(complaint.id);
      if (result.success) router.refresh();
      else setError(result.error);
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      {cover && (
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={cover}
            alt={complaint.title ?? "Complaint image"}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className={cn("font-medium", STATUS_STYLES[complaint.status])}
          >
            {complaint.status.replace("_", " ")}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(complaint.createdAt)}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-base leading-snug">
          {complaint.title ?? "Untitled complaint"}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        {description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {description}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Upvotes:{" "}
          <span className="font-medium text-foreground">
            {complaint.upvotes ?? 0}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          Volunteers applied:{" "}
          <span className="font-medium text-foreground">
            {applicationCount ?? "..."}
          </span>
          {waitingCount > 0 && (
            <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800">
              {waitingCount} waiting for review
            </span>
          )}
        </p>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </CardContent>

      <CardFooter className="gap-2">
        {/* Volunteer applications */}
        <Dialog
          onOpenChange={(open) => {
            if (open) {
              setError(null);
              void loadApplications();
            }
          }}
        >
          <DialogTrigger
            render={
              <Button
                variant={waitingCount > 0 ? "default" : "outline"}
                size="sm"
                className="flex-1"
                disabled={applicationCount === 0}
              />
            }
          >
            {applicationCount === null
              ? "Applications"
              : `Applications (${applicationCount})`}
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Volunteer applications</DialogTitle>
              <DialogDescription>
                {complaint.title ?? "Complaint"}
              </DialogDescription>
            </DialogHeader>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {loadingApps && applications === null ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : !applications || applications.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No volunteer has applied yet.
              </p>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => {
                  const showSolution =
                    app.status === "SUBMITTED" || app.status === "RESOLVED";
                  const images = app.solutionImages ?? [];

                  return (
                    <div
                      key={app.id}
                      className="space-y-2 rounded-lg border p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {app.volunteer?.user?.name ?? "Volunteer"}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {app.volunteer?.user?.email}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={APPLICATION_STYLES[app.status]}
                        >
                          {app.status}
                        </Badge>
                      </div>

                      {app.message && (
                        <p className="text-sm">
                          <span className="text-xs text-muted-foreground">
                            Application message:{" "}
                          </span>
                          {app.message}
                        </p>
                      )}

                      {showSolution && (
                        <div className="space-y-2 rounded-md bg-muted/50 p-2">
                          <p className="text-xs font-medium">
                            Submitted solution
                          </p>
                          {app.statusNote ? (
                            <p className="text-sm">{app.statusNote}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              No note provided.
                            </p>
                          )}
                          {images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {images.map((src) => (
                                <a
                                  key={src}
                                  href={src}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="relative size-20 overflow-hidden rounded-md bg-muted"
                                >
                                  <Image
                                    src={src}
                                    alt="Solution proof"
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">
                          Applied {formatDate(app.appliedAt)}
                        </span>

                        {app.status === "APPLIED" && !isClosed && (
                          <Button
                            size="sm"
                            disabled={isPending}
                            onClick={() => handleAccept(app.volunteerId)}
                          >
                            {activeKey === `accept-${app.volunteerId}`
                              ? "Accepting..."
                              : "Accept"}
                          </Button>
                        )}

                        {app.status === "ACCEPTED" && (
                          <span className="text-xs text-muted-foreground">
                            Waiting for volunteer to submit solution
                          </span>
                        )}

                        {app.status === "SUBMITTED" && !isClosed && (
                          <Button
                            size="sm"
                            disabled={isPending}
                            onClick={() => handleResolve(app.volunteerId)}
                          >
                            {activeKey === `resolve-${app.volunteerId}`
                              ? "Resolving..."
                              : "Verify & resolve"}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete */}
        {complaint.status !== "DELETED" && (
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" size="sm" disabled={isPending} />
              }
            >
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this complaint?</AlertDialogTitle>
                <AlertDialogDescription>
                  Complaint ta delete hoye jabe. Eta ar undo kora jabe na.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
