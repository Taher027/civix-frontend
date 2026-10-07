import z from "zod";

const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;
const MAX_DESCRIPTION = 1000;

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
export const complaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(PRIORITIES, { message: "Please select a priority" }),
  short_description: z
    .string()
    .trim()
    .min(1, "Short description is required")
    .min(10, "Short description must be at least 10 characters")
    .max(150, "Short description must be at most 150 characters"),
  description: z
    .string()
    .trim()
    .max(
      MAX_DESCRIPTION,
      `Description must be at most ${MAX_DESCRIPTION} characters`,
    ),
  city: z.string().trim().min(1, "City is required"),
  location: z
    .string()
    .trim()
    .min(1, "Location is required")
    .min(5, "Location must be at least 5 characters"),
  mapURL: z
    .string()
    .trim()
    .refine((v) => v === "" || isValidUrl(v), "Please enter a valid URL"),
  complaintImage: z
    .array(
      z.custom<File>((f) => typeof File !== "undefined" && f instanceof File),
    )
    .max(MAX_FILES, `You can upload up to ${MAX_FILES} files`)
    .refine(
      (files) => files.every((f) => f.type.startsWith("image/")),
      "Only image files are allowed",
    )
    .refine(
      (files) => files.every((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024),
      `Each file must be smaller than ${MAX_FILE_SIZE_MB} MB`,
    ),
});
