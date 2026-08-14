import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let _sql: Sql | null = null;

/**
 * Lazy client. Constructing at module scope would throw during `next build`
 * before DATABASE_URL is provisioned.
 */
export function getSql(): Sql {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Provision Postgres (Neon) via the Vercel Marketplace, then run `vercel env pull .env.local`.",
      );
    }
    _sql = neon(url);
  }
  return _sql;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
