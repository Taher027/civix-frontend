export type DonationStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export type Donation = {
  id: string;
  merchantInvoiceNumber: string;
  amount: number | string;
  currency: string;
  paymentGateway: string;
  status: DonationStatus;
  bkashPaymentId?: string | null;
  bkashTrxId?: string | null;
  payerReference?: string | null;
  paidAt?: string | null;
  createdAt: string;
};
