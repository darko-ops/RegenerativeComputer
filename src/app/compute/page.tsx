import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { RfqForm } from "./rfq-form";

export const metadata: Metadata = {
  title: "Request Compute",
  description:
    "Submit one specification. Regenerative sources competing GPU capacity across providers and returns comparable offers.",
};

export default function ComputePage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Eyebrow>Request for quote</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] font-light tracking-[-0.02em] text-ink sm:text-6xl">
            Request compute.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            One structured specification. Competing offers across providers,
            normalized so they can actually be compared.
          </p>
          <p className="label mt-12 text-ink-faint">
            No fee to submit · Offers sourced and normalized by hand
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <RfqForm />
        </div>
      </section>
    </>
  );
}
