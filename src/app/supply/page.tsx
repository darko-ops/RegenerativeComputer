import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { SupplyForm } from "./supply-form";

export const metadata: Metadata = {
  title: "For Compute Providers",
  description:
    "Bring us capacity. We bring you demand. Regenerative routes qualified compute requirements to participating infrastructure providers.",
};

const SUBMIT = [
  "Available GPU inventory",
  "Location",
  "Cluster configuration",
  "Networking",
  "Availability dates",
  "Minimum commitment",
  "Pricing",
  "Workload restrictions",
];

export default function SupplyPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Eyebrow>For compute providers</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] font-light tracking-[-0.02em] text-ink sm:text-6xl">
            Bring us capacity.
            <br />
            We bring you demand.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Regenerative sends qualified compute requirements to participating
            infrastructure providers.
          </p>
        </div>
      </section>

      <section className="border-b border-rule bg-paper-sunk">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-12">
            <Eyebrow>What we ask for</Eyebrow>
            <div>
              <p className="max-w-xl text-[15px] leading-[1.75] text-ink-soft">
                Requirements arrive already specified: hardware, quantity,
                topology, region, timing, and workload type. You quote against
                the specification. There is no integration work to do — quoting
                is manual at this stage, and that is deliberate.
              </p>
              <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
                {SUBMIT.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 bg-paper px-5 py-4"
                  >
                    <span className="label text-ink-faint tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <SupplyForm />
        </div>
      </section>
    </>
  );
}
