import Hero from "@/sections/Hero";
import FeaturedCollections from "@/sections/FeaturedCollections";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Philosophy from "@/sections/Philosophy";
import Craftsmanship from "@/sections/Craftsmanship";
import Magazine from "@/sections/Magazine";
import Newsletter from "@/sections/Newsletter";
import Footer from "@/sections/Footer";

import { getActiveHeroSlides, getAllCategories, getFeaturedProducts } from "../../../api/queries/products";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  const [heroSlides, categories, featuredProducts, locale, t] = await Promise.all([
    getActiveHeroSlides(),
    getAllCategories(),
    getFeaturedProducts(),
    getLocale(),
    getTranslations("hero_fallback"),
  ]);

  const mappedSlides = heroSlides.map((s) => ({
    id: s.id,
    title: locale === "en" && s.titleEn ? s.titleEn : s.title,
    subtitle: locale === "en" && s.subtitleEn ? s.subtitleEn : (s.subtitle ?? ""),
    imageUrl: s.imageUrl,
    linkText: locale === "en" && s.linkTextEn ? s.linkTextEn : (s.linkText ?? t("s1_link")),
    linkHref: s.linkHref ?? "/collections",
  }));

  return (
    <main>
      <Hero slides={mappedSlides} />
      <FeaturedCollections categories={categories} />
      <Philosophy />
      <Craftsmanship />
      <FeaturedProducts products={featuredProducts} />
      <Magazine />
      <Newsletter />
      <Footer />
    </main>
  );
}
