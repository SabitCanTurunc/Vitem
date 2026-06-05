import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";

const PROJECT_SLUGS = [
  "villa-bosphorus",
  "aegean-retreat",
  "urban-minimalist",
  "heritage-estate",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const url = buildLocalizedUrl(locale as Locale, "/projects");

  return {
    title: t("projects_title"),
    description: t("projects_description"),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates("/projects"),
    },
    openGraph: {
      title: t("projects_title"),
      description: t("projects_description"),
      url,
      images: [DEFAULT_OG_IMAGE.url],
    },
    twitter: {
      card: "summary_large_image",
      title: t("projects_title"),
      description: t("projects_description"),
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function ProjectsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tItems = await getTranslations({ locale, namespace: "projects.items" });

  const projectsList = itemListSchema(
    locale === "en" ? "Projects" : "Projeler",
    PROJECT_SLUGS.map((slug) => ({
      name: tItems(`${slug}.name`),
      url: buildLocalizedUrl(locale as Locale, `/projects/${slug}`),
    })),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(locale as Locale, "/") },
            { name: tNav("projects"), url: buildLocalizedUrl(locale as Locale, "/projects") },
          ]),
          projectsList,
        ]}
      />
      {children}
    </>
  );
}
