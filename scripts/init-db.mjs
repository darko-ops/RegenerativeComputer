// Creates the tables the site writes to. Idempotent.
// Run with: npm run db:init   (loads .env.local via node --env-file)

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "DATABASE_URL is not set. Provision Postgres via `vercel integration add neon`, then `vercel env pull .env.local`.",
  );
  process.exit(1);
}

const sql = neon(url);

const STATEMENTS = [
  `create table if not exists rfq (
     id                          uuid primary key default gen_random_uuid(),
     created_at                  timestamptz not null default now(),
     status                      text        not null default 'new',

     name                        text        not null,
     email                       text        not null,
     company                     text,

     gpu_model                   text        not null,
     gpu_model_other             text,
     gpu_quantity                integer     not null,

     workload                    text        not null,
     workload_other              text,

     node_config                 text        not null,
     interconnect                text,
     storage                     text,
     region                      text,

     earliest_start              date,
     deadline                    date,
     duration                    text,
     interruptible               boolean     not null default false,
     flexible_schedule           boolean     not null default false,

     current_provider            text,
     current_price_per_gpu_hour  numeric(12,4),
     max_budget                  numeric(14,2),

     notes                       text
   )`,

  `create table if not exists supply_partner (
     id                     uuid primary key default gen_random_uuid(),
     created_at             timestamptz not null default now(),
     status                 text        not null default 'new',

     name                   text        not null,
     email                  text        not null,
     company                text        not null,
     company_website        text,

     gpu_inventory          text        not null,
     locations              text        not null,
     cluster_config         text,
     networking             text,
     availability_dates     text,
     min_commitment         text,
     pricing                text,
     workload_restrictions  text,

     notes                  text
   )`,

  `create index if not exists rfq_created_at_idx on rfq (created_at desc)`,
  `create index if not exists supply_partner_created_at_idx on supply_partner (created_at desc)`,
];

for (const statement of STATEMENTS) {
  await sql.query(statement);
}

const [{ rfq }] = await sql.query("select count(*)::int as rfq from rfq");
const [{ partners }] = await sql.query(
  "select count(*)::int as partners from supply_partner",
);

console.log("Schema ready.");
console.log(`  rfq:             ${rfq} row(s)`);
console.log(`  supply_partner:  ${partners} row(s)`);
