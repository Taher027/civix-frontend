import z from "zod";

export const volunteerSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(1, "Bio is required")
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be at most 500 characters"),
  skills: z
    .array(z.string().trim().min(1).max(30))
    .min(1, "Add at least one skill")
    .max(10, "You can add up to 10 skills"),
});
