import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const url = buildLocalizedUrl(locale as Locale, "/referanslar");

  return {
    title: t("referanslar_title"),
    description: t("referanslar_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/referanslar"),
    },
    openGraph: {
      title: t("referanslar_title"),
      description: t("referanslar_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("referanslar_title"),
      description: t("referanslar_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function ReferanslarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(locale as Locale, "/") },
            { name: tNav("referanslar"), url: buildLocalizedUrl(locale as Locale, "/referanslar") },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            ratingValue: "5",
            bestRating: "5",
            ratingCount: "10000",
            reviewCount: "10000",
            itemReviewed: {
              "@type": "Organization",
              name: "Vitem",
              url: buildLocalizedUrl(locale as Locale, "/"),
            },
          },
        ]}
      />
      {children}
    </>
  );
}
