export type AdminLang = "tr" | "en";

export const ADMIN_LANG_COOKIE = "admin_lang";

export const adminLabels = {
  panel: { tr: "Yonetim Paneli", en: "Management Panel" },
  dashboard: { tr: "Gosterge Paneli", en: "Dashboard" },
  categories: { tr: "Kategoriler", en: "Categories" },
  products: { tr: "Urunler", en: "Products" },
  hero: { tr: "Hero Slaytlari", en: "Hero Slides" },
  campaigns: { tr: "Kampanyalar", en: "Campaigns" },
  projects: { tr: "Projeler", en: "Projects" },
  inbox: { tr: "Gelen Kutusu", en: "Inbox" },
  visit_site: { tr: "Siteye Git", en: "Visit Site" },
  logout: { tr: "Cikis Yap", en: "Sign Out" },
  close: { tr: "Kapat", en: "Close" },
  open_menu: { tr: "Menuyu Ac", en: "Open menu" },
  language: { tr: "Dil", en: "Language" },
  dashboard_overview: { tr: "Gosterge Ozeti", en: "Dashboard Overview" },
  total_products: { tr: "Toplam Urun", en: "Total Products" },
  hero_slides: { tr: "Hero Slaytlari", en: "Hero Slides" },
  inbox_messages: { tr: "Gelen Mesajlar", en: "Inbox Messages" },
  quick_setup: { tr: "Hizli Kurulum Rehberi", en: "Quick Setup Guide" },
  setup_1: {
    tr: "Once Kategoriler bolumunu doldurun. Ingilizce aciklamalari da ekleyin.",
    en: "Start by populating Categories and include English descriptions.",
  },
  setup_2: {
    tr: "Urunleri ilgili kategorilere ekleyin ve one cikan durumunu ayarlayin.",
    en: "Add Products to categories and set featured status as needed.",
  },
  setup_3: {
    tr: "Ana sayfa karsilamasi icin Hero ayarlarini guncelleyin.",
    en: "Update Hero settings to customize homepage welcome content.",
  },
  setup_4: {
    tr: "Musteri taleplerini Gelen Kutusu ekranindan duzenli takip edin.",
    en: "Monitor the Inbox regularly for customer and project inquiries.",
  },
  no_submissions: { tr: "Henuz gonderim yok.", en: "No submissions yet." },
  login_title: { tr: "Yonetim Paneli", en: "Management Panel" },
  password: { tr: "Sifre", en: "Password" },
  login: { tr: "Giris Yap", en: "Sign In" },
  logging_in: { tr: "Giris yapiliyor...", en: "Signing in..." },
  wrong_password: { tr: "Hatali sifre. Lutfen tekrar deneyin.", en: "Incorrect password. Please try again." },
} as const;

export function getAdminLang(value?: string | null): AdminLang {
  return value === "en" ? "en" : "tr";
}

export function tAdmin<K extends keyof typeof adminLabels>(lang: AdminLang, key: K) {
  return adminLabels[key][lang];
}

export function getAdminLangFromBrowser(): AdminLang {
  if (typeof window === "undefined") return "tr";
  const fromStorage = window.localStorage.getItem(ADMIN_LANG_COOKIE);
  if (fromStorage === "tr" || fromStorage === "en") return fromStorage;
  const cookieMatch = document.cookie.match(new RegExp(`(?:^|; )${ADMIN_LANG_COOKIE}=([^;]+)`));
  return getAdminLang(cookieMatch?.[1] ?? null);
}
