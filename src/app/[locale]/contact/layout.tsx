import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import {
  breadcrumbSchema,
  contactPageSchema,
  localBusinessSchema,
} from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const url = buildLocalizedUrl(locale as Locale, "/contact");

  return {
    title: t("contact_title"),
    description: t("contact_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/contact"),
    },
    openGraph: {
      title: t("contact_title"),
      description: t("contact_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("contact_title"),
      description: t("contact_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function ContactLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const url = buildLocalizedUrl(locale as Locale, "/contact");

  return (
    <>
      <JsonLd
        data={[
          contactPageSchema(url),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(locale as Locale, "/") },
            { name: tNav("contact"), url },
          ]),
        ]}
      />
      {children}
    </>
  );
}
