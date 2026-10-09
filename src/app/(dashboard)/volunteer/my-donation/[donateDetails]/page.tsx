import { cn } from "cn";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMe } from "@/app/(dashboard)/_Action/getme";
import {
  DONATION_STATUS_STYLES,
  formatDonationDate,
} from "@/components/donation/DonationCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRolePath } from "@/lib/rolePath";
import { getDonationDetails } from "@/services/getDonationDetails";

export default async function DonationDetailsPage({
  params,
}: {
  params: Promise<{ donateDetails: string }>;
}) {
  const { donateDetails: id } = await params;
  const result = await getDonationDetails(id);
  const me = await getMe();
  const rolePath = getRolePath(me?.role);

  if (!result.success) notFound();
  const d = result.data;

  const rows = [
    { label: "Invoice number", value: d.merchantInvoiceNumber },
    { label: "Payment gateway", value: d.paymentGateway },
    { label: "bKash payment ID", value: d.bkashPaymentId },
    { label: "bKash transaction ID", value: d.bkashTrxId },
    { label: "Payer reference", value: d.payerReference?.trim() },
    { label: "Created", value: formatDonationDate(d.createdAt) },
    { label: "Paid at", value: formatDonationDate(d.paidAt) },
  ];

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4 md:p-6">
      <Link
        href={`/${rolePath}/my-donation`}
        className="text-sm text-primary underline"
      >
        ← Back to my donations
      </Link>

      <Card>
        <CardHeader className="gap-2">
          <Badge
            variant="outline"
            className={cn(
              "w-fit font-medium",
              DONATION_STATUS_STYLES[d.status] ?? "bg-muted",
            )}
          >
            {d.status}
          </Badge>
          <CardTitle className="text-3xl">
            ৳{Number(d.amount).toLocaleString()} {d.currency}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="break-all text-right font-medium">
                {r.value || "—"}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
