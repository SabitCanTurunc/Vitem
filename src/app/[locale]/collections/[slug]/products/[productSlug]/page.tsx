import type { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@api/queries/products";
import { getTranslations } from "next-intl/server";
import ProductDetailClient from "./ProductDetailClient";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema, productSchema } from "@/lib/jsonld";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ productSlug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; productSlug: string }>;
}): Promise<Metadata> {
  const { locale, slug, productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return {};

  const typedLocale = locale as Locale;
  const name = locale === "en" && product.nameEn ? product.nameEn : product.name;
  const description =
    (locale === "en" && product.shortDescriptionEn
      ? product.shortDescriptionEn
      : product.shortDescription) ??
    (locale === "en" && product.descriptionEn ? product.descriptionEn : product.description) ??
    (locale === "en" ? `${name} by Vitem.` : `Vitem ${name}.`);

  const url = buildLocalizedUrl(typedLocale, `/collections/${slug}/products/${productSlug}`);
  const image = product.featuredImage ?? DEFAULT_OG_IMAGE.url;

  return {
    title: name,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(`/collections/${slug}/products/${productSlug}`),
    },
    openGraph: {
      type: "website",
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; productSlug: string }>;
}) {
  const { locale, slug, productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const typedLocale = locale as Locale;
  const name = locale === "en" && product.nameEn ? product.nameEn : product.name;
  const description =
    (locale === "en" && product.descriptionEn ? product.descriptionEn : product.description) ?? null;
  const category = (product as typeof product & { category?: { name: string; nameEn?: string | null; slug: string } }).category;
  const categoryName = category
    ? locale === "en" && category.nameEn ? category.nameEn : category.name
    : null;

  const gallery = product.gallery ? safeJsonArray<string>(product.gallery) : [];
  const images = [product.featuredImage, ...gallery].filter(Boolean) as string[];

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(typedLocale, "/") },
            { name: tNav("collections"), url: buildLocalizedUrl(typedLocale, "/collections") },
            ...(categoryName && category
              ? [{ name: categoryName, url: buildLocalizedUrl(typedLocale, `/collections/${category.slug}`) }]
              : []),
            { name, url: buildLocalizedUrl(typedLocale, `/collections/${slug}/products/${productSlug}`) },
          ]),
          productSchema({
            name,
            description,
            image: images.length ? images : undefined,
            url: buildLocalizedUrl(typedLocale, `/collections/${slug}/products/${productSlug}`),
            category: categoryName,
            sku: `vitem-${product.id}`,
          }),
        ]}
      />
      <ProductDetailClient product={product} categorySlug={slug} />
      <Footer />
    </main>
  );
}

function safeJsonArray<T = unknown>(raw: string): T[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}
