import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const url = buildLocalizedUrl(locale as Locale, "/kampanyalar");

  return {
    title: t("kampanyalar_title"),
    description: t("kampanyalar_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/kampanyalar"),
    },
    openGraph: {
      title: t("kampanyalar_title"),
      description: t("kampanyalar_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("kampanyalar_title"),
      description: t("kampanyalar_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default function KampanyalarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
