/**
 * Vitem — Site geneli SEO konfigürasyonu
 *
 * Tüm metadata, sitemap, robots ve yapısal veri (JSON-LD) üretimi için
 * tek kaynak. URL ve kurum bilgileri burada toplanır; environment değişken
 * yoksa üretim sitesinin canlı domaini fallback olarak kullanılır.
 */

export type Locale = "tr" | "en";
export const SUPPORTED_LOCALES: Locale[] = ["tr", "en"];
export const DEFAULT_LOCALE: Locale = "tr";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  "https://vitem.com.tr";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE = {
  name: "Vitem",
  legalName: "Vitem Mobilya",
  domain: SITE_URL.replace(/^https?:\/\//, ""),
  url: SITE_URL,
  defaultLocale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
  founded: "1997",
  twitter: "@vitemmobilya",
} as const;

export const ORGANIZATION = {
  name: "Vitem",
  legalName: "Vitem Mobilya Sanayi ve Ticaret",
  email: "info@vitem.com.tr",
  phone: "+90 326 221 88 01",
  phoneClean: "+903262218801",
  street: "Ürgen Paşa Mah. 75. Yıl Bulvarı",
  city: "Antakya",
  region: "Hatay",
  country: "TR",
  countryName: "Türkiye",
  postalCode: "31040",
  latitude: 36.2027,
  longitude: 36.1607,
  logo: `${SITE_URL}/icon.png`,
  socials: [
    "https://instagram.com/vitemmobilya",
    "https://www.linkedin.com/company/vitem",
  ],
  openingHours: [
    { day: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "18:00" },
    { day: ["Sa"], opens: "09:00", closes: "15:00" },
  ],
} as const;

const TR_KEYWORDS = [
  "lüks mutfak",
  "özel tasarım mutfak",
  "modüler mutfak",
  "banyo dolabı",
  "gardırop",
  "ankastre mutfak",
  "iç mimari",
  "Hatay mobilya",
  "Antakya mobilya",
  "Vitem",
  "premium mobilya",
  "yaşam alanı tasarımı",
  "ev dekorasyonu",
  "vestiyer",
  "CNC üretim",
];

const EN_KEYWORDS = [
  "luxury kitchen",
  "bespoke kitchen",
  "modular kitchen",
  "bathroom cabinet",
  "wardrobe",
  "built-in kitchen",
  "interior design",
  "Hatay furniture",
  "Antakya furniture",
  "Vitem",
  "premium furniture",
  "living space design",
  "home decor",
  "walk-in closet",
  "CNC production",
];

export const KEYWORDS: Record<Locale, string[]> = {
  tr: TR_KEYWORDS,
  en: EN_KEYWORDS,
};

/**
 * Lokalize edilmiş tam URL üretir.
 * - tr (default) → /path
 * - en           → /en/path
 * `localePrefix: 'as-needed'` davranışına uyumludur.
 */
export function buildLocalizedUrl(locale: Locale, path = "/"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalized = cleanPath === "/" ? "" : cleanPath.replace(/\/$/, "");
  if (locale === DEFAULT_LOCALE) {
    return `${SITE_URL}${normalized || "/"}`;
  }
  return `${SITE_URL}/${locale}${normalized}`;
}

/**
 * Bir sayfa için tüm dillerin alternates haritasını üretir
 * (hreflang etiketleri için kullanılır).
 */
export function buildLanguageAlternates(path = "/"): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    map[l] = buildLocalizedUrl(l, path);
  }
  // Google önerisi: x-default → kullanıcı dil tercihinden bağımsız landing
  map["x-default"] = buildLocalizedUrl(DEFAULT_LOCALE, path);
  return map;
}

/**
 * Varsayılan Open Graph görseli.
 *
 * 1. Önce `public/og-image.jpg` aranır (kullanıcı eklerse).
 * 2. Aksi halde mevcut hero görseli fallback olur (boyutu ideal değil ama vardır).
 *
 * Sayfa-bazlı metadata `images` alanı bu değeri override edebilir
 * (ürün featuredImage, makale image, vb.).
 */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  fallbackUrl: `${SITE_URL}/images/hero-fallback-1.jpg`,
  width: 1200,
  height: 630,
  alt: "Vitem — Premium İç Mimari ve Mobilya",
} as const;
