"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchForm({
  className,
  onSubmitted,
}: {
  className?: string;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = value.trim();
    router.push(
      term
        ? `/complaints?searchTerm=${encodeURIComponent(term)}`
        : "/complaints",
    );
    setValue("");
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search complaints..."
        aria-label="Search complaints"
        className="h-9 w-full rounded-full border bg-muted/50 pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring/30"
      />
    </form>
  );
}
