import type { Metadata } from "next";
import Link from "next/link";
import { getSql, isDatabaseConfigured } from "@/lib/db";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { logOut } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Internal",
  robots: { index: false, follow: false },
};

type Row = Record<string, unknown>;

const RFQ_FIELDS: [string, string][] = [
  ["gpu_model", "GPU"],
  ["gpu_model_other", "GPU (other)"],
  ["gpu_quantity", "Quantity"],
  ["workload", "Workload"],
  ["workload_other", "Workload (other)"],
  ["node_config", "Nodes"],
  ["interconnect", "Interconnect"],
  ["storage", "Storage"],
  ["region", "Region"],
  ["earliest_start", "Earliest start"],
  ["deadline", "Deadline"],
  ["duration", "Duration"],
  ["interruptible", "Interruptible"],
  ["flexible_schedule", "Flexible schedule"],
  ["current_provider", "Current provider"],
  ["current_price_per_gpu_hour", "Current $/GPU-hr"],
  ["max_budget", "Max budget"],
  ["notes", "Notes"],
];

const SUPPLY_FIELDS: [string, string][] = [
  ["company_website", "Website"],
  ["gpu_inventory", "Inventory"],
  ["locations", "Locations"],
  ["cluster_config", "Cluster"],
  ["networking", "Networking"],
  ["availability_dates", "Availability"],
  ["min_commitment", "Min commitment"],
  ["pricing", "Pricing"],
  ["workload_restrictions", "Restrictions"],
  ["notes", "Notes"],
];

function render(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function formatTimestamp(value: unknown) {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

function Record({
  row,
  fields,
}: {
  row: Row;
  fields: [string, string][];
}) {
  const entries = fields
    .map(([key, label]) => [label, render(row[key])] as const)
    .filter(([, value]) => value !== null);

  return (
    <article className="border border-rule bg-paper-raised">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule px-6 py-4">
        <div>
          <p className="text-sm font-medium text-ink">
            {render(row.name)}
            {row.company ? (
              <span className="text-ink-muted"> · {render(row.company)}</span>
            ) : null}
          </p>
          <a
            href={`mailto:${render(row.email)}`}
            className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink"
          >
            {render(row.email)}
          </a>
        </div>
        <p className="label text-ink-faint tnum">
          {formatTimestamp(row.created_at)}
        </p>
      </header>
      <dl className="grid gap-x-8 gap-y-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([label, value]) => (
          <div key={label}>
            <dt className="label text-ink-faint">{label}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed break-words text-ink-soft">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-rule-strong bg-paper-sunk p-6 text-sm leading-relaxed text-ink-soft">
      {children}
    </div>
  );
}

export default async function InternalPage({
  searchParams,
}: PageProps<"/internal">) {
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Notice>
          <code className="font-mono text-xs">ADMIN_PASSWORD</code> is not set.
          Add it with{" "}
          <code className="font-mono text-xs">
            vercel env add ADMIN_PASSWORD
          </code>{" "}
          and pull it locally before using this page.
        </Notice>
      </div>
    );
  }

  if (!(await isAuthenticated())) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <LoginForm />
      </div>
    );
  }

  const { view } = await searchParams;
  const tab = view === "supply" ? "supply" : "rfq";

  if (!isDatabaseConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Notice>
          <code className="font-mono text-xs">DATABASE_URL</code> is not set.
          Provision Postgres through the Vercel Marketplace, then run{" "}
          <code className="font-mono text-xs">
            vercel env pull .env.local
          </code>
          .
        </Notice>
      </div>
    );
  }

  const sql = getSql();
  const [rfqs, partners] = await Promise.all([
    sql`select * from rfq order by created_at desc limit 200` as Promise<Row[]>,
    sql`select * from supply_partner order by created_at desc limit 200` as Promise<
      Row[]
    >,
  ]);

  const rows = tab === "supply" ? partners : rfqs;
  const fields = tab === "supply" ? SUPPLY_FIELDS : RFQ_FIELDS;

  const tabs = [
    { key: "rfq", label: "Compute requests", count: rfqs.length },
    { key: "supply", label: "Supply partners", count: partners.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-light text-ink">
          Submissions
        </h1>
        <form action={logOut}>
          <button
            type="submit"
            className="label text-ink-muted transition-colors hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </div>

      <nav className="mt-8 flex gap-px border-b border-rule">
        {tabs.map((item) => (
          <Link
            key={item.key}
            href={`/internal?view=${item.key}`}
            aria-current={tab === item.key ? "page" : undefined}
            className={`label -mb-px border-b-2 px-4 py-3 transition-colors ${
              tab === item.key
                ? "border-ink text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {item.label}{" "}
            <span className="tnum text-ink-faint">{item.count}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 space-y-4">
        {rows.length === 0 ? (
          <Notice>No submissions yet.</Notice>
        ) : (
          rows.map((row) => (
            <Record key={String(row.id)} row={row} fields={fields} />
          ))
        )}
      </div>
    </div>
  );
}
