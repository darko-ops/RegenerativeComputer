import type { Metadata } from "next";
import { Eyebrow, PrimaryLink, SecondaryLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Compute Markets",
  description:
    "Indicative GPU pricing and availability, derived from Regenerative RFQs. Published only where permitted and only where the sample supports it.",
};

const ROWS = ["H100", "H200", "B200", "GB200"];

const METHOD = [
  {
    heading: "Observed, not indicated",
    body: "Values are derived from dated, firm offers received against written specifications — not from indicative opinion or survey submissions.",
  },
  {
    heading: "Specified",
    body: "Every observation carries the specification it was quoted against: hardware, node count, interconnect, region, availability class, and term.",
  },
  {
    heading: "Withheld when thin",
    body: "Where the sample is too small to support a defensible value, or where disclosure is not permitted, nothing is published. A benchmark that always prints is a benchmark that eventually prints something indefensible.",
  },
];

export default function MarketsPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Eyebrow>Market intelligence</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] font-light tracking-[-0.02em] text-ink sm:text-6xl">
            Compute markets.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Price discovery is downstream of transactions. As requests move
            through Regenerative, we publish aggregated, anonymized observations
            where we are permitted to do so.
          </p>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="label text-ink">Indicative pricing</h2>
            <p className="label text-ink-faint">USD per GPU-hour</p>
          </div>

          <div className="mt-6 overflow-x-auto border border-rule bg-paper-raised">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-rule">
                  {["GPU", "Indicative price", "Range", "Availability"].map(
                    (head) => (
                      <th
                        key={head}
                        scope="col"
                        className="label px-5 py-4 font-normal text-ink-faint"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((gpu) => (
                  <tr
                    key={gpu}
                    className="border-b border-rule last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-sm font-medium text-ink"
                    >
                      {gpu}
                    </th>
                    {[0, 1, 2].map((i) => (
                      <td
                        key={i}
                        className="px-5 py-4 text-sm text-ink-faint tnum"
                      >
                        —
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border border-rule-strong bg-paper-sunk px-5 py-4">
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-signal"
            />
            <p className="text-sm text-ink-soft">
              Market data coming from Regenerative RFQs.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-paper-sunk">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-12">
            <Eyebrow>Methodology</Eyebrow>
            <div>
              <p className="max-w-xl text-[15px] leading-[1.75] text-ink-soft">
                We would rather publish nothing than publish a number we cannot
                defend. Three commitments govern this page.
              </p>
              <div className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                {METHOD.map((item) => (
                  <div key={item.heading} className="bg-paper p-7">
                    <h3 className="font-display text-xl font-normal text-ink">
                      {item.heading}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.7] text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h2 className="max-w-xl font-display text-3xl leading-snug font-light text-ink">
            Every request makes the market more legible.
          </h2>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryLink href="/compute">Request compute</PrimaryLink>
            <SecondaryLink href="/research/the-compute-futures-oracle-problem">
              On benchmark integrity
            </SecondaryLink>
          </div>
        </div>
      </section>
    </>
  );
}
