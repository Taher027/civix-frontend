"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { VerifyOtp } from "@/app/(public)/(auth)/_Action/VerifyOtp";
import { verifySchema } from "@/validation/verifyAccount.schema";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120;

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const email = searchParams.get("email") || "";
  const isInvalid = !!errorMessage;

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOTP = async () => {
    const parsed = verifySchema.safeParse({ email, otp });

    if (!parsed.success) {
      setErrorMessage(parsed.error.issues[0].message);
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const verifyResult = await VerifyOtp(parsed.data);

      if (verifyResult.success) {
        toast.add({
          title: "Email verification successfull",
          description: "Please login to visit your profile.",
        });
        router.push("/login");
        return;
      }

      toast.add({
        title: verifyResult.error,
        description: verifyResult.message || "something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we send you in your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
          noValidate
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (errorMessage) {
                  setErrorMessage(null);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
              aria-invalid={isInvalid}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} aria-invalid={isInvalid} />
                <InputOTPSlot index={1} aria-invalid={isInvalid} />
                <InputOTPSlot index={2} aria-invalid={isInvalid} />
                <InputOTPSlot index={3} aria-invalid={isInvalid} />
                <InputOTPSlot index={4} aria-invalid={isInvalid} />
                <InputOTPSlot index={5} aria-invalid={isInvalid} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && <FieldError errors={[{ message: errorMessage }]} />}
            <FieldDescription>
              {resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "You can resend the code now"}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="gap-2">
        <Button type="button" variant="outline" disabled={resendTimer > 0}>
          Resend
        </Button>
        <Button type="submit" form="otp-form" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
