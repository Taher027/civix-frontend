"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateComplaintStatus } from "@/app/(dashboard)/admin/_Action/updateComplaintStatus";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

type Decision = "RESOLVED" | "REJECTED";

export default function ReviewActions({
  complaintId,
}: {
  complaintId: string;
}) {
  const router = useRouter();
  const [decision, setDecision] = useState<Decision>("RESOLVED");
  const [statusNote, setStatusNote] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await updateComplaintStatus(complaintId, {
        status: decision,
        ...(statusNote.trim() && { statusNote: statusNote.trim() }),
      });

      if (!result.success) {
        toast.add({ title: "Failed", description: result.error });
        return;
      }

      toast.add({
        title: decision === "RESOLVED" ? "Approved" : "Rejected",
        description: "Complaint status updated.",
      });
      router.push("/admin/review-submit");
      router.refresh();
    });
  };

  return (
    <div className="space-y-3 rounded-md border bg-muted/30 p-4">
      <h3 className="text-sm font-medium">Admin decision</h3>

      <div className="space-y-1.5">
        <label htmlFor="decision" className="text-xs text-muted-foreground">
          Status
        </label>
        <select
          id="decision"
          value={decision}
          onChange={(e) => setDecision(e.target.value as Decision)}
          disabled={isPending}
          className="w-full rounded-md border bg-background p-2 text-sm"
        >
          <option value="RESOLVED">Resolved (approve)</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="statusNote" className="text-xs text-muted-foreground">
          Note (optional)
        </label>
        <textarea
          id="statusNote"
          rows={3}
          value={statusNote}
          onChange={(e) => setStatusNote(e.target.value)}
          disabled={isPending}
          className="w-full rounded-md border bg-background p-2 text-sm"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        variant={decision === "REJECTED" ? "destructive" : "default"}
        className="w-full"
      >
        {isPending ? "Saving..." : "Update status"}
      </Button>
    </div>
  );
}
