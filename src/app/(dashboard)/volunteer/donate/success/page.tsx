import Link from "next/link";

export default async function DonationSuccess({
  searchParams,
}: {
  searchParams: Promise<{ trxID?: string; paymentID?: string }>;
}) {
  const { trxID, paymentID } = await searchParams;

  return (
    <div className="mx-auto max-w-md space-y-3 py-16 text-center">
      <h1 className="text-2xl font-semibold text-emerald-600">
        Thank you for your donation!
      </h1>
      {(trxID || paymentID) && (
        <p className="text-sm text-muted-foreground">
          Transaction: {trxID ?? paymentID}
        </p>
      )}
      <Link href="/" className="text-primary underline">
        Back to home
      </Link>
    </div>
  );
}
