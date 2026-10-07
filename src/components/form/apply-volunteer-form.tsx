"use client";

import { useForm } from "@tanstack/react-form";
import { Sparkles, Type, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { applyVolunteer } from "@/app/(dashboard)/citizen/_Action/applyVolunteer";
import { toast } from "../ui/toast";

export default function VolunteerApplyForm() {
  const [skillInput, setSkillInput] = useState("");

  const form = useForm({
    defaultValues: {
      bio: "",
      skills: [] as string[],
    },

    onSubmit: async ({ value }) => {
      const volunteerData = {
        bio: value.bio.trim(),
        skills: value.skills,
      };
      const result = await applyVolunteer(volunteerData);
      if (result.success) {
        toast.add({
          title: "You are successfully applied for volunteer.",
          description: "PLease wait for admin approval.",
        });
      } else {
        toast.add({
          title: `${result.error}` || "Something went wrong",
          description: "Plese apply again after some time",
        });
      }
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply as a volunteer
        </h1>
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
          {/* BIO */}
          <form.Field
            name="bio"
            validators={{
              onChange: ({ value }) =>
                !value.trim() ? { message: "Bio is required" } : undefined,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>BIO</FieldLabel>
                  <div className="relative">
                    <Type className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Write something about you"
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

          {/* SKILLS */}
          <form.Field
            name="skills"
            mode="array"
            validators={{
              onChange: ({ value }) =>
                value.length === 0
                  ? { message: "Add at least one skill" }
                  : undefined,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const addSkill = () => {
                const skill = skillInput.trim();
                if (!skill) return;

                const exists = field.state.value.some(
                  (s) => s.toLowerCase() === skill.toLowerCase(),
                );
                if (!exists) field.pushValue(skill);

                setSkillInput("");
              };

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Skills</FieldLabel>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Sparkles className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Type a skill and press Enter"
                        value={skillInput}
                        onBlur={field.handleBlur}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // ফর্ম submit হওয়া আটকায়
                            addSkill();
                          }
                        }}
                        aria-invalid={isInvalid}
                        className="pl-9"
                        autoComplete="off"
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={addSkill}>
                      Add
                    </Button>
                  </div>

                  {field.state.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {field.state.value.map((skill, i) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => field.removeValue(i)}
                            aria-label={`Remove ${skill}`}
                            className="rounded-full p-0.5 hover:bg-background"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <div className="mt-5 flex w-full justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
