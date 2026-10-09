"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { appliedForResolveComplaint } from "@/app/(dashboard)/volunteer/_Action/appliedForResolveComplaint";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";

const MAX_IMAGES = 5;

export default function ResolveComplaintDialog({
  complaintId,
}: {
  complaintId: string;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [statusNote, setStatusNote] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const reset = () => {
    setStatusNote("");
    setFiles([]);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!statusNote.trim()) {
      setError("Status note is required.");
      return;
    }
    if (files.length === 0) {
      setError("Please add at least one image.");
      return;
    }
    setError("");

    const formData = new FormData();
    for (const file of files) {
      formData.append("solutionImages", file);
    }
    formData.append("data", JSON.stringify({ statusNote: statusNote.trim() }));

    startTransition(async () => {
      const result = await appliedForResolveComplaint(complaintId, formData);

      if (!result.success) {
        toast.add({ title: "Failed", description: result.error });
        return;
      }

      toast.add({
        title: "Submitted",
        description: "Resolution submitted successfully.",
      });
      setOpen(false);
      reset();
      router.refresh();
    });
  };

  return (
    <>
      <Button size="sm" className="w-full" onClick={() => setOpen(true)}>
        Mark as resolved
      </Button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (isPending) return;
          setOpen(v);
          if (!v) reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit resolution</DialogTitle>
            <DialogDescription>
              Add proof images and a short note about what you did.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="solutionImages" className="text-sm font-medium">
                Solution images (max {MAX_IMAGES})
              </label>
              <input
                ref={fileRef}
                id="solutionImages"
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-muted file:px-3 file:py-1.5"
                onChange={(e) =>
                  setFiles(
                    Array.from(e.target.files ?? []).slice(0, MAX_IMAGES),
                  )
                }
              />
              {files.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {files.length} image(s) selected
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="statusNote" className="text-sm font-medium">
                Status note
              </label>
              <textarea
                id="statusNote"
                rows={4}
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="The issue has been inspected and fixed..."
                className="w-full rounded-md border bg-background p-2 text-sm"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
