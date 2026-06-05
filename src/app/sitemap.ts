import type { MetadataRoute } from "next";
import { buildLocalizedUrl, buildLanguageAlternates } from "@/lib/seo";
import {
  getAllCategories,
  getAllProducts,
  getActiveCampaigns,
} from "@api/queries/products";
import { articles } from "@/app/[locale]/magazine/articles";

/**
 * Vitem — Dinamik sitemap.xml
 *
 * Her URL için TR/EN alternates dahil tam haritayı döndürür.
 * Admin/api/giriş sayfaları sitemap'a eklenmez.
 */

type StaticEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_PAGES: StaticEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/farkimiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "/collections", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/referanslar", changeFrequency: "monthly", priority: 0.7 },
  { path: "/magazine", changeFrequency: "weekly", priority: 0.7 },
  { path: "/katalog", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kampanyalar", changeFrequency: "weekly", priority: 0.8 },
  { path: "/kampanyalar/guncel", changeFrequency: "weekly", priority: 0.7 },
  { path: "/kampanyalar/teshir", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified?: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: buildLocalizedUrl("tr", path),
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: buildLanguageAlternates(path),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const list: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    list.push(entry(page.path, page.changeFrequency, page.priority));
  }

  // Veritabanına bağlı dinamik sayfalar — derleme zamanında DB yoksa
  // fail-soft davranır ve yalnızca statik sayfaları yayınlar.
  try {
    const [categories, products, campaigns] = await Promise.all([
      getAllCategories().catch(() => []),
      getAllProducts().catch(() => []),
      getActiveCampaigns().catch(() => []),
    ]);

    for (const c of categories ?? []) {
      list.push(
        entry(`/collections/${c.slug}`, "weekly", 0.8, c.createdAt ?? undefined),
      );
    }

    for (const p of products ?? []) {
      const category = (p as { category?: { slug?: string } }).category;
      const categorySlug = category?.slug;
      if (!categorySlug) continue;
      list.push(
        entry(
          `/collections/${categorySlug}/products/${p.slug}`,
          "monthly",
          0.7,
          p.createdAt ?? undefined,
        ),
      );
    }

    for (const camp of campaigns ?? []) {
      if (!camp.slug) continue;
      list.push(
        entry(
          `/kampanyalar/${camp.slug}`,
          "weekly",
          0.6,
          camp.createdAt ?? undefined,
        ),
      );
    }
  } catch {
    // DB bağlantı hatası — yalnızca statik sayfalar döner
  }

  // Magazine makaleleri (statik dosyada)
  for (const article of articles) {
    list.push(entry(`/magazine/${article.slug}`, "monthly", 0.6));
  }

  // Sabit projeler (i18n mesajlardan üretiliyor)
  for (const slug of [
    "villa-bosphorus",
    "aegean-retreat",
    "urban-minimalist",
    "heritage-estate",
  ]) {
    list.push(entry(`/projects/${slug}`, "monthly", 0.7));
  }

  return list;
}
