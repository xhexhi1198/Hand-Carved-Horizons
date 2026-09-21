"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import type { ApplicationFieldType } from "@/content/application";

/**
 * The editorial input treatment for the application form — underline only,
 * no boxed/shadowed field, matching the site's existing minimal aesthetic
 * (Pill, Button) rather than a generic boxed SaaS control.
 */
export function FormField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  required = false,
  error,
  options,
  autoComplete,
  className = "",
}: {
  label: string;
  type?: ApplicationFieldType;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  options?: string[];
  autoComplete?: string;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const fieldClasses =
    "mt-2 w-full border-0 border-b border-hairline bg-transparent py-2 font-display text-lg text-ink outline-none transition-colors duration-300 focus:border-brass";

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.68rem] uppercase tracking-[0.14em] text-stone">
        {label}
        {required && (
          <span className="text-brass" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {type === "select" ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`${fieldClasses} appearance-none pr-6`}
          >
            <option value="" disabled>
              Select…
            </option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-stone"
          />
        </div>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={fieldClasses}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-[0.7rem] text-ink-soft">
          — {error}
        </p>
      )}
    </div>
  );
}
