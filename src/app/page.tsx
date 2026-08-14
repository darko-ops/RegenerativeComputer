import Link from "next/link";
import { FlowDiagram } from "@/components/flow-diagram";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/ui";
import { ARTICLES } from "@/content/research";

const STEPS = [
  {
    n: "01",
    title: "Specify",
    body: "GPU type, quantity, topology, location, start date, duration, and workload requirements. One structured request, written down once.",
  },
  {
    n: "02",
    title: "Compare",
    body: "Comparable quotes across price, availability, infrastructure, and the performance characteristics that matter for the workload.",
  },
  {
    n: "03",
    title: "Execute",
    body: "Select the provider and terms that fit the workload. The provider remains the underlying compute counterparty.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <Eyebrow>Compute procurement</Eyebrow>
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[1.02] font-light tracking-[-0.02em] text-ink sm:text-7xl">
            The execution layer for compute.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Source, compare, and procure GPU capacity across providers.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/compute">Request compute</PrimaryLink>
            <SecondaryLink href="/supply">Supply compute</SecondaryLink>
          </div>

          <p className="label mt-16 text-ink-faint">
            Independent · Provider-agnostic · Built for AI infrastructure teams
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <Eyebrow>What Regenerative does</Eyebrow>
              <h2 className="mt-8 font-display text-4xl leading-[1.1] font-light tracking-[-0.015em] text-ink sm:text-5xl">
                One request.
                <br />
                Multiple compute markets.
              </h2>
              <div className="mt-8 space-y-5 text-[15px] leading-[1.75] text-ink-soft">
                <p>
                  Instead of checking individual GPU providers one at a time,
                  buyers submit their requirements once. Regenerative sources
                  competing capacity, normalizes the offers, and helps identify
                  the best execution for the workload.
                </p>
                <p>
                  We are provider-agnostic by construction. We do not own
                  capacity, and we are not incentivized to route you toward any
                  particular operator.
                </p>
              </div>
            </div>

            <FlowDiagram />
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <Eyebrow>How it works</Eyebrow>
          <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-paper p-8 sm:p-10">
                <p className="label text-ink-faint tnum">{step.n}</p>
                <h3 className="mt-6 font-display text-2xl font-normal text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-[1.7] text-ink-soft">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="border-b border-rule bg-paper-sunk">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
            <Eyebrow>The thesis</Eyebrow>
            <div className="max-w-2xl space-y-6 font-display text-xl leading-[1.6] font-light text-ink sm:text-2xl">
              <p>Compute is becoming a market.</p>
              <p className="text-[15px] leading-[1.75] font-sans text-ink-soft sm:text-base">
                But the infrastructure surrounding that market remains
                fragmented. Capacity is distributed across providers. Pricing is
                opaque. Performance varies by workload. Procurement remains
                largely manual.
              </p>
              <p className="text-[15px] leading-[1.75] font-sans text-ink-soft sm:text-base">
                Regenerative Computer is building infrastructure for
                discovering, comparing, and executing compute. We believe
                compute markets will eventually require the same things mature
                commodity and financial markets do: price discovery,
                standardized measurement, independent verification, and
                efficient execution.
              </p>
              <p>We&rsquo;re starting with execution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Eyebrow>Research</Eyebrow>
            <Link
              href="/research"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
            >
              All research
            </Link>
          </div>

          <ul className="mt-10 border-t border-rule">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/research/${article.slug}`}
                  className="group grid gap-2 border-b border-rule py-7 transition-colors hover:bg-paper-sunk sm:grid-cols-[160px_1fr] sm:gap-8"
                >
                  <p className="label pt-1.5 text-ink-faint">
                    {article.category}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl leading-snug font-normal text-ink">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{article.dek}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            <div className="bg-paper p-10 sm:p-14">
              <h2 className="font-display text-3xl font-light text-ink">
                Need capacity
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-[1.7] text-ink-soft">
                Submit one specification. Receive comparable offers across
                providers.
              </p>
              <PrimaryLink href="/compute" className="mt-8">
                Request compute
              </PrimaryLink>
            </div>
            <div className="bg-paper p-10 sm:p-14">
              <h2 className="font-display text-3xl font-light text-ink">
                Have capacity
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-[1.7] text-ink-soft">
                Register inventory and receive qualified compute requirements as
                they arrive.
              </p>
              <SecondaryLink href="/supply" className="mt-8">
                Become a supply partner
              </SecondaryLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
