import { Suspense } from "react";
import VerifyAccountForm from "@/components/form/otp-verification";

export default function VerifyAccountPage() {
  return (
    <div className=" flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <Suspense fallback={<p>Loading...</p>}>
          <VerifyAccountForm />
        </Suspense>
      </div>
    </div>
  );
}
