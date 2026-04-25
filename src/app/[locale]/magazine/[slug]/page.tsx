export const dynamic = "force-dynamic";

import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { articles, getArticle } from "../articles";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(slug);

  if (!article) notFound();

  const title = locale === "en" ? article.titleEn : article.titleTr;
  const category = locale === "en" ? article.categoryEn : article.categoryTr;
  const excerpt = locale === "en" ? article.excerptEn : article.excerptTr;
  const body = locale === "en" ? article.bodyEn : article.bodyTr;

  const otherArticles = articles.filter((a) => a.slug !== slug);

  return (
    <main className="min-h-screen bg-white">
      {/* Back */}
      <div className="pt-28 sm:pt-32 pb-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/magazine"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-vitem-500 hover:text-vitem-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {locale === "en" ? "All Articles" : "Tüm Makaleler"}
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-vitem-500 mb-6">
          <span className="flex items-center gap-1.5"><Tag className="w-3 h-3" />{category}</span>
          <span className="w-4 h-[1px] bg-vitem-300" />
          <span>{article.date}</span>
          <span className="w-4 h-[1px] bg-vitem-300" />
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{article.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-vitem-900 tracking-tight leading-tight max-w-4xl mb-8">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-vitem-600 font-light leading-relaxed max-w-3xl border-l-2 border-vitem-200 pl-6">
          {excerpt}
        </p>
      </section>

      {/* Featured Image */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="aspect-[21/9] overflow-hidden bg-vitem-100">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-6">
          {body.map((paragraph, i) => (
            <p key={i} className="text-vitem-700 leading-[1.9] text-base sm:text-lg font-light">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Other Articles */}
      {otherArticles.length > 0 && (
        <section className="border-t border-vitem-100 py-16 sm:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xs tracking-[0.3em] uppercase text-vitem-500 font-medium mb-10">
              {locale === "en" ? "More Articles" : "Diğer Makaleler"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {otherArticles.map((a) => (
                <Link key={a.slug} href={`/magazine/${a.slug}` as any} className="group flex gap-5 items-start">
                  <div className="w-24 h-16 shrink-0 overflow-hidden bg-vitem-100">
                    <img src={a.imageUrl} alt={locale === "en" ? a.titleEn : a.titleTr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-vitem-400 mb-1">
                      {locale === "en" ? a.categoryEn : a.categoryTr}
                    </p>
                    <h3 className="text-sm font-medium text-vitem-900 group-hover:text-vitem-500 transition-colors leading-snug">
                      {locale === "en" ? a.titleEn : a.titleTr}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
