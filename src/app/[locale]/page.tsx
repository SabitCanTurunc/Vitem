import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import FeaturedCollections from "@/sections/FeaturedCollections";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Philosophy from "@/sections/Philosophy";
import Craftsmanship from "@/sections/Craftsmanship";
import Magazine from "@/sections/Magazine";
import Footer from "@/sections/Footer";
import JsonLd from "@/components/JsonLd";

import { getActiveHeroSlides, getAllCategories, getFeaturedProducts } from "@api/queries/products";
import { getLocale, getTranslations } from "next-intl/server";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const typedLocale = locale as Locale;

  const url = buildLocalizedUrl(typedLocale, "/");
  return {
    title: t("home_title"),
    description: t("home_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/"),
    },
    openGraph: {
      title: t("home_title"),
      description: t("home_description"),
      url,
      images: [
        {
          url: DEFAULT_OG_IMAGE.url,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: t("og_alt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home_title"),
      description: t("home_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function Home() {
  const [heroSlides, categories, featuredProducts, locale, t, tNav] = await Promise.all([
    getActiveHeroSlides(),
    getAllCategories(),
    getFeaturedProducts(),
    getLocale(),
    getTranslations("hero_fallback"),
    getTranslations("nav"),
  ]);

  const typedLocale = locale as Locale;

  const mappedSlides = heroSlides.map((s) => ({
    id: s.id,
    title: locale === "en" && s.titleEn ? s.titleEn : s.title,
    subtitle: locale === "en" && s.subtitleEn ? s.subtitleEn : (s.subtitle ?? ""),
    imageUrl: s.imageUrl,
    linkText: locale === "en" && s.linkTextEn ? s.linkTextEn : (s.linkText ?? t("s1_link")),
    linkHref: s.linkHref ?? "/collections",
  }));

  // Ana sayfada öne çıkan koleksiyonlar için yapısal veri
  const collectionsList = itemListSchema(
    locale === "en" ? "Collections" : "Koleksiyonlar",
    categories.map((c) => ({
      name: locale === "en" && c.nameEn ? c.nameEn : c.name,
      url: buildLocalizedUrl(typedLocale, `/collections/${c.slug}`),
      image: c.imageUrl ?? null,
    })),
  );

  const breadcrumb = breadcrumbSchema([
    { name: tNav("collections"), url: buildLocalizedUrl(typedLocale, "/") },
  ]);

  return (
    <main>
      <JsonLd data={[collectionsList, breadcrumb]} />
      <Hero slides={mappedSlides} />
      <FeaturedCollections categories={categories} />
      <Philosophy />
      <Craftsmanship />
      <FeaturedProducts products={featuredProducts} />
      <Magazine />
      <Footer />
    </main>
  );
}
