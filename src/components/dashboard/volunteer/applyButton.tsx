"use client";

import { useState, useTransition } from "react";
import { applyComplaint } from "@/app/(dashboard)/volunteer/_Action/applyComplaint";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ApplyButton({
  complaintId,
  alreadyApplied = false,
  applicationStatus,
}: {
  complaintId: string;
  alreadyApplied?: boolean;
  applicationStatus?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [justApplied, setJustApplied] = useState(false);
  const isApplied = alreadyApplied || justApplied;

  const handleApply = () => {
    startTransition(async () => {
      const result = await applyComplaint(complaintId);

      if (result.success) {
        setJustApplied(true);
        toast.add({ title: "Applied successfully." });
      } else {
        toast.add({ title: result.error || "Something went wrong" });
      }
    });
  };

  const appliedLabel =
    applicationStatus === "ACCEPTED"
      ? "Accepted"
      : applicationStatus === "RESOLVED"
        ? "Resolved"
        : "Applied";

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        size="sm"
        variant={isApplied ? "secondary" : "default"}
        onClick={handleApply}
        disabled={isPending || isApplied}
      >
        {isPending ? "Applying..." : isApplied ? appliedLabel : "Apply"}
      </Button>
    </div>
  );
}
