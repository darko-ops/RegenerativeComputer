import type { Metadata } from "next";
import { Eyebrow, PrimaryLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Regenerative Computer is an independent compute-markets company.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-8 font-display text-4xl leading-[1.1] font-light tracking-[-0.02em] text-ink sm:text-5xl">
            Regenerative Computer is an independent compute-markets company.
          </h1>
          <div className="mt-10 space-y-6 text-[17px] leading-[1.75] text-ink-soft">
            <p>
              We source, compare, and execute GPU capacity across providers. We
              do not own compute and we do not resell it. The provider you
              select remains the underlying counterparty.
            </p>
            <p>
              We&rsquo;re starting with execution, because price discovery is
              downstream of transactions and transactions are downstream of
              standardized requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            <div className="bg-paper p-7">
              <dt className="label text-ink-faint">Contact</dt>
              <dd className="mt-3 text-sm text-ink-soft">
                <a
                  href="mailto:hello@regenerativecomputer.com"
                  className="underline underline-offset-4 transition-colors hover:text-ink"
                >
                  hello@regenerativecomputer.com
                </a>
              </dd>
            </div>
            <div className="bg-paper p-7">
              <dt className="label text-ink-faint">Compute requests</dt>
              <dd className="mt-3 text-sm text-ink-soft">
                <a
                  href="mailto:rfq@regenerativecomputer.com"
                  className="underline underline-offset-4 transition-colors hover:text-ink"
                >
                  rfq@regenerativecomputer.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <PrimaryLink href="/compute">Request compute</PrimaryLink>
        </div>
      </section>
    </>
  );
}
