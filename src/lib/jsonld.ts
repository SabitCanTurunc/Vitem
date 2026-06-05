/**
 * Vitem — Schema.org JSON-LD üreticileri
 *
 * Google ve diğer arama motorlarının zengin sonuçlar (rich results)
 * üretebilmesi için kullanılan yapısal veri sözlüğü.
 *
 * Kullanım: JsonLd bileşeni ile sayfaya gömülür.
 */

import { ORGANIZATION, SITE, SITE_URL, type Locale, buildLocalizedUrl } from "./seo";

type Json = Record<string, unknown>;

/* ─── Organization & LocalBusiness ─────────────────────────────── */

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORGANIZATION.logo,
      width: 512,
      height: 512,
    },
    foundingDate: SITE.founded,
    sameAs: ORGANIZATION.socials,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ORGANIZATION.phone,
        email: ORGANIZATION.email,
        contactType: "customer service",
        areaServed: ["TR", "EU"],
        availableLanguage: ["Turkish", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.street,
      addressLocality: ORGANIZATION.city,
      addressRegion: ORGANIZATION.region,
      postalCode: ORGANIZATION.postalCode,
      addressCountry: ORGANIZATION.country,
    },
  };
}

export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["FurnitureStore", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: ORGANIZATION.name,
    url: SITE_URL,
    image: ORGANIZATION.logo,
    logo: ORGANIZATION.logo,
    telephone: ORGANIZATION.phone,
    email: ORGANIZATION.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.street,
      addressLocality: ORGANIZATION.city,
      addressRegion: ORGANIZATION.region,
      postalCode: ORGANIZATION.postalCode,
      addressCountry: ORGANIZATION.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ORGANIZATION.latitude,
      longitude: ORGANIZATION.longitude,
    },
    openingHoursSpecification: ORGANIZATION.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: ORGANIZATION.socials,
  };
}

/* ─── WebSite (SearchAction) ────────────────────────────────────── */

export function websiteSchema(locale: Locale): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/collections?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─── BreadcrumbList ────────────────────────────────────────────── */

export interface BreadcrumbItem {
  name: string;
  /** Lokalize URL (örn. /about veya /en/about) */
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/* ─── Product ───────────────────────────────────────────────────── */

export interface ProductSchemaInput {
  name: string;
  description?: string | null;
  image?: string | string[] | null;
  url: string;
  brand?: string;
  category?: string | null;
  sku?: string;
}

export function productSchema(p: ProductSchemaInput): Json {
  const images = Array.isArray(p.image) ? p.image : p.image ? [p.image] : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description ?? undefined,
    image: images,
    url: p.url,
    sku: p.sku,
    category: p.category ?? undefined,
    brand: {
      "@type": "Brand",
      name: p.brand ?? SITE.name,
    },
  };
}

/* ─── ItemList (collections / listing pages) ────────────────────── */

export interface ItemListEntry {
  name: string;
  url: string;
  image?: string | null;
}

export function itemListSchema(name: string, items: ItemListEntry[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      image: item.image ?? undefined,
    })),
  };
}

/* ─── Article ───────────────────────────────────────────────────── */

export interface ArticleSchemaInput {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  authorName?: string;
  inLanguage?: string;
}

export function articleSchema(a: ArticleSchemaInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: a.image,
    datePublished: a.datePublished,
    inLanguage: a.inLanguage,
    mainEntityOfPage: { "@type": "WebPage", "@id": a.url },
    author: {
      "@type": "Organization",
      name: a.authorName ?? SITE.name,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/* ─── FAQ ───────────────────────────────────────────────────────── */

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqEntry[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/* ─── ContactPage ───────────────────────────────────────────────── */

export function contactPageSchema(url: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url,
    name: `${SITE.name} — İletişim`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

/* ─── CreativeWork (projects portfolio) ─────────────────────────── */

export interface ProjectSchemaInput {
  name: string;
  description?: string | null;
  image?: string | null;
  url: string;
  location?: string | null;
  year?: string | null;
}

export function creativeWorkSchema(p: ProjectSchemaInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.description ?? undefined,
    image: p.image ?? undefined,
    url: p.url,
    creator: { "@id": `${SITE_URL}/#organization` },
    contentLocation: p.location
      ? { "@type": "Place", name: p.location }
      : undefined,
    dateCreated: p.year ?? undefined,
  };
}

/* ─── Helper: locale + path → absolute url ──────────────────────── */
export function absUrl(locale: Locale, path: string) {
  return buildLocalizedUrl(locale, path);
}
