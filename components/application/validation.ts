import type { ApplicationFieldConfig } from "@/content/application";
import type { MemberEntry } from "./types";

/** A row nobody has touched yet (the default starting row, or one added and left blank) — skipped from validation and submission alike. */
export function isMemberRowEmpty(member: MemberEntry): boolean {
  return Object.values(member.values).every((value) => !value || !value.trim());
}

/** Inline, advisory-only for format issues — only emptiness on a required field ever blocks Continue. */
export function fieldError(
  field: ApplicationFieldConfig,
  value: string,
  required: boolean
): string | undefined {
  const trimmed = value.trim();

  if (required && !trimmed) return "Required";
  if (!trimmed) return undefined;

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address";
  }
  if (field.type === "tel" && trimmed.replace(/\D/g, "").length < 7) {
    return "Enter a valid mobile number";
  }

  return undefined;
}
