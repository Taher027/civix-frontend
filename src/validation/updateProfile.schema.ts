import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s-]{7,20}$/, "Please enter a valid phone number"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(50, "City must be at most 50 characters"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be at most 200 characters"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
