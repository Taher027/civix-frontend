"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { updateProfile } from "@/services/updateProfile";
import { updateProfileSchema } from "@/validation/updateProfile.schema";

type UserData = {
  name: string;
  email: string;
  role: string;
  phone: string;
  city: string;
  address: string;
};

export function UpdateProfileForm({ user }: { user: UserData }) {
  const router = useRouter();

  const defaultValues = {
    name: user.name ?? "",
    phone: user.phone ?? "",
    city: user.city ?? "",
    address: user.address ?? "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: updateProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await updateProfile({
        name: value.name.trim(),
        phone: value.phone.trim(),
        city: value.city.trim(),
        address: value.address.trim(),
      });

      if (!result?.success) {
        toast.add({
          title: "Update Failed",
          description:
            (result?.error as string) ||
            "Something went wrong please try again.",
        });
        return;
      }

      toast.add({
        title: "Profile Updated",
        description: "Your information has been saved.",
      });
      router.push(`/${user.role.toLowerCase()}/profile-details`);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Edit profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your personal information below
        </p>
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
          {/* Read-only: email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              readOnly
              className="cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed.
            </p>
          </Field>

          {/* Read-only: role */}
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Input
              id="role"
              type="text"
              value={user.role}
              disabled
              readOnly
              className="cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Role cannot be changed.
            </p>
          </Field>

          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    placeholder="+880 1712 345678"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="tel"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="city">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>City Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Dhaka"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="address-level2"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="123 Main Street"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="street-address"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Subscribe
            selector={(state) => ({
              isSubmitting: state.isSubmitting,
              isDirty: state.isDirty,
            })}
          >
            {({ isSubmitting, isDirty }) => (
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => form.reset()}
                  disabled={!isDirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!isDirty || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </div>
  );
}
