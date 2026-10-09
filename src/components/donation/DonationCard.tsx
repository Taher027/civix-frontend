import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Donation } from "@/types/donation.type";

export const DONATION_STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  PAID: "bg-emerald-100 text-emerald-800 border-emerald-200",
  FAILED: "bg-red-100 text-red-800 border-red-200",
  CANCELLED: "bg-zinc-200 text-zinc-700 border-zinc-300",
};

export function formatDonationDate(date?: string | null) {
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

export default function DonationCard({
  donation,
  detailsHref,
}: {
  donation: Donation;
  detailsHref: string;
}) {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Badge
          variant="outline"
          className={cn(
            "w-fit font-medium",
            DONATION_STATUS_STYLES[donation.status] ?? "bg-muted",
          )}
        >
          {donation.status}
        </Badge>
        <CardTitle className="text-2xl">
          ৳{Number(donation.amount).toLocaleString()}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p className="truncate">Invoice: {donation.merchantInvoiceNumber}</p>
        <p>Date: {formatDonationDate(donation.createdAt)}</p>
      </CardContent>

      <CardFooter>
        <Link href={detailsHref} className="text-sm text-primary underline">
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
