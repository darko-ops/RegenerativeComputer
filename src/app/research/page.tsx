import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";
import { ARTICLES } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Writing on compute market structure, measurement, and benchmark integrity.",
};

export default function ResearchPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
          <Eyebrow>Research</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] font-light tracking-[-0.02em] text-ink sm:text-6xl">
            Market structure,
            <br />
            measurement, integrity.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Compute is becoming a market. These are the problems that market
            will have to solve.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <ul className="border-t border-rule">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/research/${article.slug}`}
                  className="grid gap-3 border-b border-rule py-10 transition-colors hover:bg-paper-sunk sm:grid-cols-[180px_1fr] sm:gap-10"
                >
                  <div className="flex gap-4 sm:block">
                    <p className="label text-ink-faint">{article.category}</p>
                    <p className="label text-ink-faint sm:mt-2">
                      {article.displayDate}
                    </p>
                  </div>
                  <div className="max-w-2xl">
                    <h2 className="font-display text-3xl leading-snug font-light text-ink">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {article.dek}
                    </p>
                    <p className="label mt-6 text-ink-muted">Read →</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
