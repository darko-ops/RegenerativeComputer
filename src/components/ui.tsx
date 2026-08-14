import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="label flex items-center gap-3 self-start text-ink-faint">
      <span aria-hidden className="h-px w-6 bg-rule-strong" />
      {children}
    </p>
  );
}

type LinkProps = ComponentProps<typeof Link>;

export function PrimaryLink({ className = "", children, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={`label inline-flex items-center justify-center bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-signal ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
  className = "",
  children,
  ...props
}: LinkProps) {
  return (
    <Link
      {...props}
      className={`label inline-flex items-center justify-center border border-rule-strong px-6 py-3.5 text-ink transition-colors hover:border-ink ${className}`}
    >
      {children}
    </Link>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5 text-[15px] leading-[1.75] text-ink-soft">
      {children}
    </div>
  );
}
