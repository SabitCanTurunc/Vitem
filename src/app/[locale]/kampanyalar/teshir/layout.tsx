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
  const url = buildLocalizedUrl(locale as Locale, "/kampanyalar/teshir");

  return {
    title: t("kampanyalar_exhibition_title"),
    description: t("kampanyalar_exhibition_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/kampanyalar/teshir"),
    },
    openGraph: {
      title: t("kampanyalar_exhibition_title"),
      description: t("kampanyalar_exhibition_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("kampanyalar_exhibition_title"),
      description: t("kampanyalar_exhibition_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function TeshirLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tCamp = await getTranslations({ locale, namespace: "kampanyalar" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: tCommon("home"), url: buildLocalizedUrl(locale as Locale, "/") },
          { name: tNav("kampanyalar"), url: buildLocalizedUrl(locale as Locale, "/kampanyalar") },
          { name: tCamp("exhibition_title"), url: buildLocalizedUrl(locale as Locale, "/kampanyalar/teshir") },
        ])}
      />
      {children}
    </>
  );
}
