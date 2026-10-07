"use client";

import { useForm } from "@tanstack/react-form";
import { Sparkles, Type, X } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { volunteerSchema } from "@/validation/applyvolunteer.schema";

const MAX_SKILLS = 10;
const MAX_SKILL_LENGTH = 30;

export default function VolunteerApplyForm() {
  const [skillInput, setSkillInput] = useState("");
  const [skillError, setSkillError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      bio: "",
      skills: [] as string[],
    },
    validators: {
      onChange: volunteerSchema,
    },

    onSubmit: async ({ value }) => {
      const volunteerData = {
        bio: value.bio.trim(),
        skills: value.skills,
      };
      console.log(volunteerData);
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
          <form.Field name="bio">
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
          <form.Field name="skills" mode="array">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const addSkill = () => {
                const skill = skillInput.trim();
                if (!skill) return;

                if (skill.length > MAX_SKILL_LENGTH) {
                  setSkillError(
                    `Each skill must be at most ${MAX_SKILL_LENGTH} characters`,
                  );
                  return;
                }
                if (field.state.value.length >= MAX_SKILLS) {
                  setSkillError(`You can add up to ${MAX_SKILLS} skills`);
                  return;
                }

                const exists = field.state.value.some(
                  (s) => s.toLowerCase() === skill.toLowerCase(),
                );
                if (exists) {
                  setSkillError("This skill is already added");
                  return;
                }

                setSkillError(null);
                field.pushValue(skill);
                setSkillInput("");
              };

              return (
                <Field data-invalid={isInvalid || !!skillError}>
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
                        onChange={(e) => {
                          setSkillInput(e.target.value);
                          if (skillError) setSkillError(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        aria-invalid={isInvalid || !!skillError}
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

                  {skillError && (
                    <FieldError errors={[{ message: skillError }]} />
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="mt-5 flex w-full justify-center">
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
