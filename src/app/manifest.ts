import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Vitem — Web App Manifest (PWA)
 *
 * Mobil "Ana ekrana ekle" deneyimi ve tarayıcı meta görsellerini iyileştirir.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Premium İç Mimari ve Mobilya`,
    short_name: SITE.name,
    description:
      "Hatay'ın ustalığıyla dünya için tasarlanan lüks mutfak, banyo ve gardırop sistemleri.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#1a1a1a",
    lang: SITE.defaultLocale,
    categories: ["lifestyle", "shopping", "business"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
