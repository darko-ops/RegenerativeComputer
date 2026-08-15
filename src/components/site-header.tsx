"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/compute", label: "Compute" },
  { href: "/supply", label: "Supply" },
  { href: "/markets", label: "Markets" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="label shrink-0 text-ink transition-opacity hover:opacity-60"
          onClick={() => setOpen(false)}
        >
          Regenerative Computer
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/compute"
            className="label bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-signal"
          >
            Request Compute
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="label -mr-2 px-2 py-2 text-ink-muted md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-rule bg-paper md:hidden">
          <div className="mx-auto max-w-6xl px-6 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-rule py-3 text-sm text-ink-soft last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/compute"
              onClick={() => setOpen(false)}
              className="label my-3 block bg-ink px-4 py-3 text-center text-paper"
            >
              Request Compute
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
