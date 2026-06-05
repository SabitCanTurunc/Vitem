import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAllCategories, getCategoryBySlug } from "@api/queries/products";
import CollectionDetailClient from "./CollectionDetailClient";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  const typedLocale = locale as Locale;
  const name = locale === "en" && category.nameEn ? category.nameEn : category.name;
  const description =
    (locale === "en" && category.descriptionEn ? category.descriptionEn : category.description) ??
    (locale === "en"
      ? `Explore the ${name} collection by Vitem.`
      : `Vitem ${name} koleksiyonunu keşfedin.`);

  const url = buildLocalizedUrl(typedLocale, `/collections/${slug}`);
  const image = category.imageUrl ?? DEFAULT_OG_IMAGE.url;

  return {
    title: name,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(`/collections/${slug}`),
    },
    openGraph: {
      title: `${name} | Vitem`,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Vitem`,
      description,
      images: [image],
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const typedLocale = locale as Locale;
  const name = locale === "en" && category.nameEn ? category.nameEn : category.name;

  const products = (category as typeof category & { products?: { slug: string; name: string; nameEn?: string | null; featuredImage?: string | null }[] }).products ?? [];
  const productList = itemListSchema(
    name,
    products.map((p) => ({
      name: locale === "en" && p.nameEn ? p.nameEn : p.name,
      url: buildLocalizedUrl(typedLocale, `/collections/${slug}/products/${p.slug}`),
      image: p.featuredImage ?? null,
    })),
  );

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(typedLocale, "/") },
            { name: tNav("collections"), url: buildLocalizedUrl(typedLocale, "/collections") },
            { name, url: buildLocalizedUrl(typedLocale, `/collections/${slug}`) },
          ]),
          productList,
        ]}
      />
      <CollectionDetailClient category={category} />
      <Footer />
    </main>
  );
}
