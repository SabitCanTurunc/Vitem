import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { articles, getArticle } from "../articles";
import JsonLd from "@/components/JsonLd";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  SITE_URL,
  type Locale,
} from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function articleDateToISO(dateString: string): string {
  const trMonths: Record<string, string> = {
    "Ocak": "01", "Şubat": "02", "Mart": "03", "Nisan": "04", "Mayıs": "05",
    "Haziran": "06", "Temmuz": "07", "Ağustos": "08", "Eylül": "09",
    "Ekim": "10", "Kasım": "11", "Aralık": "12",
  };
  const enMonths: Record<string, string> = {
    "January": "01", "February": "02", "March": "03", "April": "04",
    "May": "05", "June": "06", "July": "07", "August": "08",
    "September": "09", "October": "10", "November": "11", "December": "12",
  };
  const parts = dateString.trim().split(/\s+/);
  if (parts.length !== 3) return new Date().toISOString();
  const day = parts[0].padStart(2, "0");
  const month = trMonths[parts[1]] ?? enMonths[parts[1]] ?? "01";
  const year = parts[2];
  return `${year}-${month}-${day}T00:00:00+03:00`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const typedLocale = locale as Locale;
  const title = locale === "en" ? article.titleEn : article.titleTr;
  const description = locale === "en" ? article.excerptEn : article.excerptTr;
  const url = buildLocalizedUrl(typedLocale, `/magazine/${slug}`);
  const image = article.imageUrl.startsWith("http")
    ? article.imageUrl
    : `${SITE_URL}${article.imageUrl}`;
  const datePublished = articleDateToISO(
    locale === "en" ? article.dateEn : article.dateTr,
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(`/magazine/${slug}`),
    },
    openGraph: {
      type: "article",
      title: `${title} | Vitem`,
      description,
      url,
      images: [image],
      publishedTime: datePublished,
      authors: ["Vitem"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Vitem`,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("magazine");
  const tCommon = await getTranslations("common");
  const article = getArticle(slug);

  if (!article) notFound();

  const typedLocale = locale as Locale;
  const title = locale === "en" ? article.titleEn : article.titleTr;
  const category = locale === "en" ? article.categoryEn : article.categoryTr;
  const excerpt = locale === "en" ? article.excerptEn : article.excerptTr;
  const body = locale === "en" ? article.bodyEn : article.bodyTr;
  const dateString = locale === "en" ? article.dateEn : article.dateTr;
  const url = buildLocalizedUrl(typedLocale, `/magazine/${slug}`);
  const image = article.imageUrl.startsWith("http")
    ? article.imageUrl
    : `${SITE_URL}${article.imageUrl}`;

  const otherArticles = articles.filter((a) => a.slug !== slug);

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(typedLocale, "/") },
            { name: t("title"), url: buildLocalizedUrl(typedLocale, "/magazine") },
            { name: title, url },
          ]),
          articleSchema({
            title,
            description: excerpt,
            image,
            url,
            datePublished: articleDateToISO(dateString),
            inLanguage: typedLocale,
          }),
        ]}
      />
      {/* Back */}
      <div className="pt-28 sm:pt-32 pb-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/magazine"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-vitem-500 hover:text-vitem-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t("all_articles")}
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-vitem-500 mb-6">
          <span className="flex items-center gap-1.5"><Tag className="w-3 h-3" />{category}</span>
          <span className="w-4 h-[1px] bg-vitem-300" />
          <span>{dateString}</span>
          <span className="w-4 h-[1px] bg-vitem-300" />
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{locale === "en" ? article.readTimeEn : article.readTimeTr}</span>
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
              {t("more_articles")}
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
