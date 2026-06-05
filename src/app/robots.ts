import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Vitem — Dinamik robots.txt
 *
 * Admin paneli, API ve oturum açma sayfaları arama motorlarına kapatılır.
 * Sitemap, ana domain altında otomatik olarak belirtilir.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/admin-login",
          "/api/",
          "/_next/",
          "/scripts/",
          "/*.json$",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
