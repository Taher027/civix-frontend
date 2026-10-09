"use client";

import { Loader2, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleVote } from "@/services/toggleVote";

type UpvoteButtonProps = {
  complaintId: string;
  initialUpvotes: number;
};

export default function UpvoteButton({
  complaintId,
  initialUpvotes,
}: UpvoteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [upvotes, setUpvotes] = useState(initialUpvotes);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    startTransition(async () => {
      setUpvotes((prev) => prev + 1);

      const res = await toggleVote(complaintId);

      if (!res.success) {
        setUpvotes((prev) => prev - 1);
        alert(res.error || "Failed to vote");
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleVote}
      disabled={isPending}
      className="h-8 gap-1.5 px-3 text-xs font-medium"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
      ) : (
        <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
      )}
      <span>{upvotes} upvotes</span>
    </Button>
  );
}
