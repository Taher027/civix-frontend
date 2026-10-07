"use client";

import { useForm } from "@tanstack/react-form";
import {
  Building2,
  Flag,
  Link2,
  MapPin,
  Plus,
  Tag,
  Text,
  Type,
  X,
} from "lucide-react";
import { z } from "zod";

import { postComplaintAction } from "@/app/(dashboard)/citizen/_Action/PostComplaint";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/types/category.type";
import { complaintSchema } from "@/validation/postComplaint.schema";
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 5;
const MAX_DESCRIPTION = 1000;
export default function PostComplaintForm({
  categories,
}: {
  categories: Category[];
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      category: "",
      city: "",
      location: "",
      mapURL: "",
      priority: "MEDIUM" as string,
      complaintImage: [] as File[],
    },
    validators: {
      onChange: complaintSchema,
    },

    onSubmit: async ({ value }) => {
      const complaintData = {
        title: value.title.trim(),
        short_description: value.short_description.trim(),
        description: value.description.trim(),
        categoryId: value.category,
        city: value.city.trim(),
        location: value.location.trim(),
        mapURL: value.mapURL.trim() ? value.mapURL.trim() : undefined,
        priority: value.priority,
      };
      const complaintImage = value.complaintImage;

      const formData = new FormData();
      formData.append("data", JSON.stringify(complaintData));
      for (const file of complaintImage) {
        formData.append("complaintImage", file);
      }
      const result = await postComplaintAction(formData);
      console.log(result);
    },
  });

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Post a complaint</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <div className="relative">
                      <Type className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Broken street light"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="category">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <div className="relative">
                      <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-8 w-full rounded-lg border border-input bg-transparent pl-9 pr-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
                      >
                        <option value="">Select a category</option>
                        {categories?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="priority">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Priority</FieldLabel>
                    <div className="relative">
                      <Flag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="h-8 w-full rounded-lg border border-input bg-transparent pl-9 pr-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="short_description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Short description
                  </FieldLabel>
                  <div className="relative">
                    <Text className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="One line summary of the problem"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pl-9"
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Description{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="Explain the problem in detail: when it started, who it affects..."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <FieldDescription>
                      Helps the authorities understand the problem faster.
                    </FieldDescription>
                    <span
                      className={
                        field.state.value.length > MAX_DESCRIPTION
                          ? "text-xs text-destructive"
                          : "text-xs text-muted-foreground"
                      }
                    >
                      {field.state.value.length}/{MAX_DESCRIPTION}
                    </span>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="city">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Dhaka"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="address-level2"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="location">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="House 12, Road 5, Dhanmondi"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="street-address"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="mapURL">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Map link{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <div className="relative">
                    <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      placeholder="https://maps.google.com/..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pl-9"
                      autoComplete="off"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="complaintImage">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="additional-file-field">
                    Additional Files{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional, up to {MAX_FILES} images)
                    </span>
                  </FieldLabel>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      // biome-ignore lint/a11y/noLabelWithoutControl: label is bound to the input via htmlFor
                      render={<label htmlFor="additional-file-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <Plus className="size-4" />
                      Add Files
                    </Button>
                    <input
                      id="additional-file-field"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);

                        if (incoming.length === 0) {
                          return;
                        }

                        field.handleChange([...files, ...incoming]);
                        field.handleBlur(); // সাথে সাথে error দেখানোর জন্য
                        e.target.value = "";
                      }}
                    />
                  </div>

                  {/* নির্বাচিত ফাইলের তালিকা */}
                  {files.length > 0 && (
                    <ul className="flex flex-col gap-2 pt-1">
                      {files.map((file, i) => (
                        <li
                          key={`${file.name}-${file.size}-${i}`}
                          className="flex items-center justify-between gap-2 rounded-md border px-3 py-1.5 text-sm"
                        >
                          <span className="min-w-0 truncate">{file.name}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            onClick={() =>
                              field.handleChange(
                                files.filter((_, idx) => idx !== i),
                              )
                            }
                            className="shrink-0 rounded-full p-0.5 hover:bg-muted"
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <div className="mt-5 flex w-full justify-end">
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
