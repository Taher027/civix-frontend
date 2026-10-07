import z from "zod";

export const verifySchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is missing")
    .email("Invalid email address"),
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
