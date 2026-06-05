import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const url = buildLocalizedUrl(locale as Locale, "/farkimiz");

  return {
    title: t("farkimiz_title"),
    description: t("farkimiz_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/farkimiz"),
    },
    openGraph: {
      title: t("farkimiz_title"),
      description: t("farkimiz_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("farkimiz_title"),
      description: t("farkimiz_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function FarkimizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const t = await getTranslations({ locale, namespace: "farkimiz" });

  // FAQ rich result için süreç adımlarını soru/cevap olarak modelliyoruz
  const faq = faqSchema([
    { question: t("step1_title"), answer: t("step1_desc") },
    { question: t("step2_title"), answer: t("step2_desc") },
    { question: t("step3_title"), answer: t("step3_desc") },
    { question: t("step4_title"), answer: t("step4_desc") },
  ]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(locale as Locale, "/") },
            { name: tNav("farkimiz"), url: buildLocalizedUrl(locale as Locale, "/farkimiz") },
          ]),
          faq,
        ]}
      />
      {children}
    </>
  );
}
