"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { donate } from "@/services/donate";

const PRESETS = [100, 500, 1000, 2000];

export default function DonateForm() {
  const [amount, setAmount] = useState<number | "">(500);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDonate = () => {
    if (!amount || amount < 10) {
      setError("Minimum amount is 10 BDT.");
      return;
    }
    setError("");

    startTransition(async () => {
      const result = await donate(Number(amount));

      if (!result.success) {
        toast.add({ title: "Payment failed", description: result.error });
        return;
      }

      // bKash payment page-e niye jabe
      window.location.href = result.url;
    });
  };

  return (
    <div className="mx-auto max-w-sm space-y-4 p-4">
      <h2 className="text-lg font-semibold">Donate with bKash</h2>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <Button
            key={p}
            type="button"
            size="sm"
            variant={amount === p ? "default" : "outline"}
            onClick={() => setAmount(p)}
            disabled={isPending}
          >
            ৳{p}
          </Button>
        ))}
      </div>

      <input
        type="number"
        min={10}
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
        placeholder="Enter amount"
        className="w-full rounded-md border bg-background p-2 text-sm"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button className="w-full" onClick={handleDonate} disabled={isPending}>
        {isPending ? "Redirecting..." : "Donate now"}
      </Button>
    </div>
  );
}
