import type { ComponentProps, ReactNode } from "react";

const CONTROL =
  "w-full border border-rule-strong bg-paper-raised px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-ink focus:outline-none";

export function FieldGroup({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-t border-rule pt-8">
      <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <legend className="contents">
          <div>
            <p className="label text-ink-faint tnum">{step}</p>
            <h2 className="mt-3 font-display text-2xl font-normal text-ink">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            )}
          </div>
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">{children}</div>
      </div>
    </fieldset>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  full,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={htmlFor}
        className="label flex items-baseline gap-1.5 text-ink-soft"
      >
        {label}
        {!required && <span className="text-ink-faint">(optional)</span>}
      </label>
      <div className="mt-2.5">{children}</div>
      {hint && !error && (
        <p className="mt-2 text-xs leading-relaxed text-ink-faint">{hint}</p>
      )}
      {error && (
        <p className="mt-2 text-xs text-signal" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  invalid,
  className = "",
  ...props
}: ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`${CONTROL} ${invalid ? "border-signal" : ""} ${className}`}
    />
  );
}

export function TextArea({
  invalid,
  className = "",
  ...props
}: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={`${CONTROL} min-h-24 resize-y leading-relaxed ${invalid ? "border-signal" : ""} ${className}`}
    />
  );
}

export function Select({
  invalid,
  className = "",
  children,
  ...props
}: ComponentProps<"select"> & { invalid?: boolean }) {
  return (
    <select
      {...props}
      aria-invalid={invalid || undefined}
      className={`${CONTROL} appearance-none bg-[length:10px] bg-[right_0.9rem_center] bg-no-repeat pr-10 ${invalid ? "border-signal" : ""} ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237c786f'/%3E%3C/svg%3E\")",
      }}
    >
      {children}
    </select>
  );
}

export function OptionRow({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: readonly string[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-wrap gap-px bg-rule-strong">
      {options.map((option) => (
        <label
          key={option}
          className="label grow cursor-pointer bg-paper-raised px-4 py-3 text-center text-ink-muted transition-colors has-[input:checked]:bg-ink has-[input:checked]:text-paper"
        >
          <input
            type="radio"
            name={name}
            value={option}
            defaultChecked={defaultValue === option}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export function Toggle({
  name,
  label,
  description,
}: {
  name: string;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border border-rule-strong bg-paper-raised p-4 transition-colors has-[input:checked]:border-ink">
      <input
        type="checkbox"
        name={name}
        className="mt-0.5 size-4 shrink-0 accent-[#14140f]"
      />
      <span>
        <span className="label block text-ink">{label}</span>
        {description && (
          <span className="mt-1.5 block text-xs leading-relaxed text-ink-muted">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export function FormNotice({
  status,
  message,
}: {
  status: "success" | "error";
  message: string;
}) {
  const success = status === "success";
  return (
    <div
      role="status"
      className={`border p-5 text-sm leading-relaxed ${
        success
          ? "border-signal bg-signal-soft text-signal"
          : "border-rule-strong bg-paper-sunk text-ink-soft"
      }`}
    >
      {message}
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="label inline-flex items-center justify-center bg-ink px-8 py-4 text-paper transition-colors hover:bg-signal disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Submitting…" : children}
    </button>
  );
}
