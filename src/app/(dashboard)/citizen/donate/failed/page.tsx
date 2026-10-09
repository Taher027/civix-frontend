import Link from "next/link";

export default function DonationFailed() {
  return (
    <div className="mx-auto max-w-md space-y-3 py-16 text-center">
      <h1 className="text-2xl font-semibold text-red-600">Payment failed</h1>
      <p className="text-sm text-muted-foreground">
        Your payment was cancelled or could not be completed.
      </p>
      <Link href="/donate" className="text-primary underline">
        Try again
      </Link>
    </div>
  );
}
