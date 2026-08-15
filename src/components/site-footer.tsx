import Link from "next/link";

const COLUMNS = [
  {
    heading: "Market",
    links: [
      { href: "/compute", label: "Request compute" },
      { href: "/supply", label: "Supply compute" },
      { href: "/markets", label: "Compute markets" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/research", label: "Research" },
      { href: "/about", label: "About" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="label text-ink">Regenerative Computer</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              An independent compute-markets company. We source, compare, and
              execute GPU capacity across providers.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <p className="label text-ink-faint">{column.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-rule pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Regenerative Computer</p>
          <p className="max-w-md sm:text-right">
            Regenerative Computer acts as an agent in compute procurement. The
            provider remains the underlying compute counterparty.
          </p>
        </div>
      </div>
    </footer>
  );
}
