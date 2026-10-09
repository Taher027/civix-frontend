import { cn } from "cn";
import Link from "next/link";
import { type Button, buttonVariants } from "../ui/button";

export function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: React.ComponentProps<typeof Link> & {
  isActive?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
}) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      prefetch={false}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}
