"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Reviewed", value: "REVIEWED" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Deleted", value: "DELETED" },
];

export default function ComplaintFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "";
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateParam("search", value.trim()), 400);
  };

  return (
    <div className="mb-6 space-y-3">
      <Input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search complaints..."
        className="max-w-md"
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const active = currentStatus === tab.value;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => updateParam("status", tab.value)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
