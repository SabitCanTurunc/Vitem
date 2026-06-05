import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectDetailClient from "./ProjectDetailClient";
import JsonLd from "@/components/JsonLd";
import {
  buildLocalizedUrl,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  type Locale,
} from "@/lib/seo";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/jsonld";

const PROJECT_SLUGS = [
  "villa-bosphorus",
  "aegean-retreat",
  "urban-minimalist",
  "heritage-estate",
] as const;

const PROJECT_IMAGES: Record<string, string> = {
  "villa-bosphorus": "/images/hero-fallback-1.jpg",
  "aegean-retreat": "/images/hero-fallback-2.jpg",
  "urban-minimalist": "/images/interior.jpg",
  "heritage-estate": "/images/magazine-2.jpg",
};

export async function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tItems = await getTranslations({ locale, namespace: "projects.items" });

  let name: string;
  let description: string;
  try {
    name = tItems(`${slug}.name`);
    description = tItems(`${slug}.description`);
  } catch {
    return {};
  }

  const typedLocale = locale as Locale;
  const url = buildLocalizedUrl(typedLocale, `/projects/${slug}`);
  const image = PROJECT_IMAGES[slug] ?? DEFAULT_OG_IMAGE.url;

  return {
    title: name,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(`/projects/${slug}`),
    },
    openGraph: {
      type: "article",
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tItems = await getTranslations({ locale, namespace: "projects.items" });
  const typedLocale = locale as Locale;

  let name: string | null = null;
  let description: string | null = null;
  let location: string | null = null;
  let year: string | null = null;
  try {
    name = tItems(`${slug}.name`);
    description = tItems(`${slug}.description`);
    location = tItems(`${slug}.location`);
    year = tItems(`${slug}.year`);
  } catch {
    // çeviri yoksa Schema'yı atla
  }

  const url = buildLocalizedUrl(typedLocale, `/projects/${slug}`);
  const image = PROJECT_IMAGES[slug];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tCommon("home"), url: buildLocalizedUrl(typedLocale, "/") },
            { name: tNav("projects"), url: buildLocalizedUrl(typedLocale, "/projects") },
            ...(name ? [{ name, url }] : []),
          ]),
          ...(name
            ? [
                creativeWorkSchema({
                  name,
                  description,
                  image,
                  url,
                  location,
                  year,
                }),
              ]
            : []),
        ]}
      />
      <ProjectDetailClient slug={slug} />
    </>
  );
}
