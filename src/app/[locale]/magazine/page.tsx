import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Footer from "@/sections/Footer";
import { ArrowRight } from "lucide-react";
import { articles } from "./articles";
import JsonLd from "@/components/JsonLd";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const url = buildLocalizedUrl(locale as Locale, "/magazine");

  return {
    title: t("magazine_title"),
    description: t("magazine_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/magazine"),
    },
    openGraph: {
      title: t("magazine_title"),
      description: t("magazine_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("magazine_title"),
      description: t("magazine_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function MagazinePage() {
  const locale = await getLocale();
  const t = await getTranslations("magazine");
  const tCommon = await getTranslations("common");
  const typedLocale = locale as Locale;

  const list = itemListSchema(
    locale === "en" ? "Magazine" : "Dergi",
    articles.map((a) => ({
      name: locale === "en" ? a.titleEn : a.titleTr,
      url: buildLocalizedUrl(typedLocale, `/magazine/${a.slug}`),
      image: a.imageUrl.startsWith("http") ? a.imageUrl : `${SITE_URL}${a.imageUrl}`,
    })),
  );

  return (
    <main className="min-h-screen bg-white">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(typedLocale, "/") },
            { name: t("title"), url: buildLocalizedUrl(typedLocale, "/magazine") },
          ]),
          list,
        ]}
      />
      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white border-b border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
            {t("eyebrow")}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-vitem-900 tracking-tight">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article (first) */}
          <Link
            href={`/magazine/${articles[0].slug}` as any}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20 pb-20 border-b border-vitem-100"
          >
            <div className="aspect-[16/10] overflow-hidden bg-vitem-100">
              <img
                src={articles[0].imageUrl}
                alt={locale === "en" ? articles[0].titleEn : articles[0].titleTr}
                className="w-full h-full object-cover transition-transform duration-&lsqb;1200ms&rsqb; group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-vitem-500 mb-4">
                <span>{locale === "en" ? articles[0].categoryEn : articles[0].categoryTr}</span>
                <span className="w-4 h-[1px] bg-vitem-300" />
                <span>{locale === "en" ? articles[0].dateEn : articles[0].dateTr}</span>
                <span className="w-4 h-[1px] bg-vitem-300" />
                <span>{locale === "en" ? articles[0].readTimeEn : articles[0].readTimeTr}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-vitem-900 leading-snug mb-6 group-hover:text-vitem-500 transition-colors">
                {locale === "en" ? articles[0].titleEn : articles[0].titleTr}
              </h2>
              <p className="text-vitem-600 leading-relaxed mb-8">
                {locale === "en" ? articles[0].excerptEn : articles[0].excerptTr}
              </p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-vitem-900 font-medium group-hover:gap-3 transition-all">
                {t("read_article")}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Remaining articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={`/magazine/${article.slug}` as any}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-vitem-100 mb-6">
                  <img
                    src={article.imageUrl}
                    alt={locale === "en" ? article.titleEn : article.titleTr}
                    className="w-full h-full object-cover transition-transform duration-&lsqb;1200ms&rsqb; group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-vitem-500 mb-3">
                  <span>{locale === "en" ? article.categoryEn : article.categoryTr}</span>
                  <span className="w-4 h-[1px] bg-vitem-300" />
                  <span>{locale === "en" ? article.dateEn : article.dateTr}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-vitem-900 leading-snug mb-4 group-hover:text-vitem-500 transition-colors">
                  {locale === "en" ? article.titleEn : article.titleTr}
                </h3>
                <p className="text-vitem-600 leading-relaxed text-sm line-clamp-3">
                  {locale === "en" ? article.excerptEn : article.excerptTr}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
