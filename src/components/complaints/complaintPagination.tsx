import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
  page: number;
  totalPages: number;
  searchTerm?: string;
  basePath?: string;
};

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const items: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) items.push("ellipsis");
    items.push(p);
    prev = p;
  }
  return items;
}

export default function ComplaintPagination({
  page,
  totalPages,
  searchTerm,
  basePath = "/",
}: Props) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const disabled = "pointer-events-none opacity-50";

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Link
            href={hrefFor(Math.max(page - 1, 1))}
            prefetch={false}
            aria-disabled={page <= 1}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              page <= 1 && disabled,
            )}
          >
            Previous
          </Link>
        </PaginationItem>

        {getPageItems(page, totalPages).map((item, i) => (
          <PaginationItem key={item === "ellipsis" ? `e-${i}` : item}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <Link
                href={hrefFor(item)}
                prefetch={false}
                aria-current={item === page ? "page" : undefined}
                className={buttonVariants({
                  variant: item === page ? "outline" : "ghost",
                  size: "icon",
                })}
              >
                {item}
              </Link>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <Link
            href={hrefFor(Math.min(page + 1, totalPages))}
            prefetch={false}
            aria-disabled={page >= totalPages}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              page >= totalPages && disabled,
            )}
          >
            Next
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
