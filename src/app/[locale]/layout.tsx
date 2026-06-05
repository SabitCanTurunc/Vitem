import React from "react";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  SITE,
  SITE_URL,
  KEYWORDS,
  DEFAULT_OG_IMAGE,
  buildLocalizedUrl,
  buildLanguageAlternates,
  type Locale,
} from "@/lib/seo";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { getAllCategories } from "@api/queries/products";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Locale-aware metadata.
 *
 * - metadataBase ile relative URL'ler otomatik çözümlenir.
 * - alternates.languages hreflang etiketlerini üretir.
 * - openGraph ve twitter, sosyal paylaşım önizlemelerini iyileştirir.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "seo" });
  const typedLocale = locale as Locale;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("default_title"),
      template: t("default_title_template"),
    },
    description: t("default_description"),
    applicationName: SITE.name,
    generator: "Next.js",
    keywords: KEYWORDS[typedLocale],
    authors: [{ name: SITE.name, url: SITE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: buildLocalizedUrl(typedLocale, "/"),
      languages: buildLanguageAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: typedLocale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: typedLocale === "tr" ? ["en_US"] : ["tr_TR"],
      url: buildLocalizedUrl(typedLocale, "/"),
      title: t("home_title"),
      description: t("home_description"),
      siteName: SITE.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE.url,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: t("og_alt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home_title"),
      description: t("home_description"),
      images: [DEFAULT_OG_IMAGE.url],
      creator: SITE.twitter,
      site: SITE.twitter,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/icon.png",
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    category: "Furniture",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // next-intl: bu istek için aktif lokali sabitler
  setRequestLocale(locale);

  const messages = await getMessages();
  const typedLocale = locale as Locale;
  const categories = await getAllCategories();

  return (
    <html lang={typedLocale}>
      <body>
        {/* Site geneli yapısal veri — Organization + WebSite + LocalBusiness */}
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(typedLocale),
            localBusinessSchema(),
          ]}
        />
        <NextIntlClientProvider messages={messages}>
          <Navbar categories={categories} />
          <div className="min-h-screen">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
