"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-gray-500">
        {error.digest ? `Error ID: ${error.digest}` : error.message}
      </p>
      <Button
        onClick={() => reset()}
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Try again
      </Button>
    </div>
  );
}
