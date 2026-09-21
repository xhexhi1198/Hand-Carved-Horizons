"use client";

import { useId } from "react";
import { Calendar, ChevronDown } from "lucide-react";

function formatDateDisplay(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

/**
 * Mobile-only field for a `select` or a native `date` input, used ONLY for
 * fields that pair with each other in a 2-column row (e.g. Family's
 * Relationship + Date of Birth). Real iPhone Safari renders
 * `<input type="date">` and `<select>` at meaningfully different intrinsic
 * heights/padding — CSS `height` on the date input itself doesn't reliably
 * override that (confirmed: a fixed height on the native controls looked
 * right in desktop responsive inspection but not on a real device). So the
 * outer `.inputWrapper` div — not either native control — owns the height
 * and the border-bottom underline. For `date`, the native input stays in
 * the DOM (so tapping still opens iOS's real date picker) but is fully
 * transparent; what the user actually sees is a plain text layer we
 * control, which also lets "dd/mm/yyyy" show before a date is picked
 * (iOS otherwise renders an empty date input as visually blank).
 */
export function MobileNativeField({
  label,
  type,
  value,
  onChange,
  onBlur,
  options,
  error,
  className = "",
}: {
  label: string;
  type: "select" | "date";
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options?: string[];
  error?: string;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`min-w-0 w-full ${className}`}>
      <label htmlFor={id} className="block text-[0.68rem] uppercase tracking-[0.14em] text-stone">
        {label}
      </label>

      <div className="relative mt-1.5 flex h-12 min-w-0 w-full items-center border-b border-hairline transition-colors duration-300 focus-within:border-brass">
        {type === "select" ? (
          <>
            <select
              id={id}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onBlur={onBlur}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              className="h-full w-full min-w-0 flex-1 appearance-none border-0 bg-transparent pr-6 font-sans text-sm text-ink outline-none [box-sizing:border-box] [-webkit-appearance:none]"
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
              className="pointer-events-none absolute right-0 text-stone"
            />
          </>
        ) : (
          <>
            <span
              className={`pointer-events-none flex-1 select-none font-sans text-sm ${
                value ? "text-ink" : "text-stone"
              }`}
            >
              {value ? formatDateDisplay(value) : "dd/mm/yyyy"}
            </span>
            <Calendar size={14} aria-hidden="true" className="pointer-events-none shrink-0 text-stone" />
            <input
              id={id}
              type="date"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onBlur={onBlur}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              // Invisible (opacity-0), but real and full-size — it's the
              // actual tap target, so iOS's native date picker still opens
              // exactly as it would for a normal date input. Kept at 16px
              // so focusing it doesn't trigger Safari's zoom-on-focus.
              className="absolute inset-0 h-full w-full min-w-0 border-0 bg-transparent p-0 text-base opacity-0 [box-sizing:border-box] [-webkit-appearance:none]"
            />
          </>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-[0.7rem] text-ink-soft">
          — {error}
        </p>
      )}
    </div>
  );
}
