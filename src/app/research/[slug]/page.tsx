import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/content/research";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    openGraph: { title: article.title, description: article.dek },
  };
}

export default async function ArticlePage({
  params,
}: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const index = ARTICLES.findIndex((a) => a.slug === slug);
  const next = ARTICLES[(index + 1) % ARTICLES.length];

  return (
    <>
      <article>
        <header className="border-b border-rule">
          <div className="mx-auto max-w-3xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
            <Link
              href="/research"
              className="label text-ink-faint transition-colors hover:text-ink"
            >
              ← Research
            </Link>
            <div className="label mt-10 flex flex-wrap gap-x-4 gap-y-2 text-ink-faint">
              <span>{article.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={article.date}>{article.displayDate}</time>
            </div>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] font-light tracking-[-0.015em] text-ink sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {article.dek}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
          {article.body.map((block, i) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2
                    key={i}
                    className="mt-14 mb-5 font-display text-2xl font-normal text-ink first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              case "p":
                return (
                  <p
                    key={i}
                    className="mb-6 text-[17px] leading-[1.75] text-ink-soft"
                  >
                    {block.text}
                  </p>
                );
              case "list":
                return (
                  <ul key={i} className="mb-8 border-t border-rule">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-rule py-4 text-[15px] leading-[1.7] text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              case "pull":
                return (
                  <p
                    key={i}
                    className="my-12 border-l-2 border-ink py-1 pl-6 font-display text-2xl leading-snug font-light text-ink"
                  >
                    {block.text}
                  </p>
                );
            }
          })}
        </div>
      </article>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="label text-ink-faint">Next</p>
          <Link href={`/research/${next.slug}`} className="group mt-4 block">
            <h2 className="font-display text-2xl leading-snug font-light text-ink group-hover:text-signal">
              {next.title}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{next.dek}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
