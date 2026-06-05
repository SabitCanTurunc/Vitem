# Vitem — Premium İç Mimari ve Mobilya

Hatay merkezli **Vitem** markasının kurumsal web sitesi. 1997'den bu yana lüks
mutfak, banyo ve gardırop sistemleri üreten Vitem, 3.500 m² üretim tesisi,
80+ uzman ekibi ve 10.000+ tamamlanan projesiyle premium iç mimari sektörünün
öncülerinden biridir.

> **Domain:** [vitem.com.tr](https://vitem.com.tr) · **Diller:** TR · EN ·
> **Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v3 · next-intl · Drizzle ORM

---

## Özellikler

- **Çok dilli (TR/EN)** — `next-intl` ile tam i18n; URL: `/about` (TR) ↔ `/en/about` (EN).
- **Tam SEO altyapısı**
  - Dinamik `sitemap.xml` (TR + EN alternates dahil tüm sayfalar)
  - Dinamik `robots.txt`
  - Sayfa-bazlı `generateMetadata` (canonical, hreflang, OG, Twitter Card)
  - Yapısal veri / JSON-LD: `Organization`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Product`, `Article`, `ContactPage`, `FAQPage`, `ItemList`, `CreativeWork`, `AggregateRating`
  - Dinamik OG görsel üretimi (`@vercel/og` / `next/og`)
  - PWA `manifest.webmanifest`
  - `.well-known/security.txt`
- **Yönetim paneli (`/admin`)** — kategoriler, ürünler, projeler, hero slaytları, kampanyalar yönetimi
- **Veritabanı** — SQLite/Turso (LibSQL) · Drizzle ORM · migrate & seed
- **Görsel yönetimi** — Cloudinary entegrasyonu
- **Animasyonlar** — Framer Motion
- **Erişilebilirlik (a11y)** — semantic HTML, ARIA etiketleri, klavye navigasyonu

---

## Hızlı Başlangıç

### 1. Bağımlılıkları yükleyin

```bash
npm install
```

### 2. Ortam değişkenlerini oluşturun

`.env.example` dosyasını `.env` olarak kopyalayıp doldurun:

```bash
cp .env.example .env
```

| Değişken              | Açıklama                                                |
|-----------------------|--------------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL`| Canlı domain. Örn. `https://vitem.com.tr`              |
| `APP_ID`              | Uygulama kimliği                                       |
| `APP_SECRET`          | JWT imzalama anahtarı (admin oturumu için)             |
| `TURSO_DATABASE_URL`  | LibSQL/Turso bağlantısı (örn. `libsql://...`)          |
| `TURSO_AUTH_TOKEN`    | Turso JWT auth token                                   |

### 3. Veritabanını hazırlayın

```bash
npm run db:generate   # Şema migration üret
npm run db:migrate    # Migration'ları uygula
# (opsiyonel) npm run db:push tek adımda push
```

İlk veriler için: `db/seed.ts` dosyasındaki seed script'ini çalıştırın.

### 4. Geliştirme sunucusu

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000).

---

## Proje Yapısı

```
src/
├── app/
│   ├── [locale]/              # Çok dilli sayfa kökü
│   │   ├── layout.tsx         # Locale layout — metadata, JSON-LD, NextIntlProvider
│   │   ├── page.tsx           # Ana sayfa (Hero + öne çıkan koleksiyonlar/ürünler)
│   │   ├── about/             # Hakkımızda
│   │   ├── collections/       # Koleksiyonlar + dinamik [slug]/products/[productSlug]
│   │   ├── contact/           # İletişim
│   │   ├── farkimiz/          # Neden Vitem? + FAQ schema
│   │   ├── kampanyalar/       # Kampanyalar + güncel/teşhir alt sayfaları
│   │   ├── katalog/           # E-katalog
│   │   ├── magazine/          # Dergi + dinamik makaleler
│   │   ├── projects/          # Portföy
│   │   └── referanslar/       # Müşteri yorumları
│   ├── admin/                 # Admin paneli (oturum kontrollü)
│   ├── admin-login/           # Admin login
│   ├── api/                   # API rotaları
│   ├── robots.ts              # Dinamik robots.txt
│   ├── sitemap.ts             # Dinamik sitemap.xml
│   ├── manifest.ts            # PWA manifest
│   ├── opengraph-image.tsx    # Dinamik OG görsel (1200×630)
│   └── layout.tsx             # Root shell
├── components/
│   ├── JsonLd.tsx             # Schema.org enjektör bileşeni
│   ├── Navbar.tsx
│   ├── ImageUpload.tsx
│   ├── GalleryUpload.tsx
│   └── ui/                    # 50+ shadcn/ui bileşeni
├── lib/
│   ├── seo.ts                 # Site URL, kurum bilgileri, hreflang yardımcıları
│   ├── jsonld.ts              # JSON-LD üreticileri (Organization, Product, ...)
│   └── utils.ts               # cn() vb.
├── i18n/
│   ├── routing.ts             # Locale tanımı
│   └── request.ts             # next-intl request config
├── sections/                  # Sayfa bölümleri (Hero, Footer, ...)
├── server/
│   ├── actions/               # Server actions (admin, contact, auth, translate)
│   └── queries/               # DB sorguları (Drizzle)
└── middleware.ts              # i18n + admin auth middleware

db/
├── schema.ts                  # Drizzle şema
├── relations.ts               # İlişkiler
├── seed.ts                    # Başlangıç verileri
└── migrations/                # SQL migrationları

messages/
├── tr.json                    # Türkçe çeviriler (varsayılan)
└── en.json                    # İngilizce çeviriler

public/
├── og-image.jpg               # Sosyal paylaşım görseli (1200×630 önerilir)
├── icon.png                   # PWA + favicon (512×512 önerilir)
├── favicon.ico
├── images/                    # Statik proje görselleri
└── .well-known/security.txt   # Güvenlik iletişim bilgisi
```

---

## SEO Mimarisi

Vitem sitesi, modern arama motoru kuralları ve sosyal medya optimizasyonu
gözetilerek hazırlanmıştır:

### 1. Yapısal Veri (Schema.org)

| Sayfa Tipi          | Kullanılan Schema'lar                                              |
|---------------------|--------------------------------------------------------------------|
| Tüm sayfalar (root) | `Organization`, `LocalBusiness`, `WebSite` + `SearchAction`        |
| Ana Sayfa           | `ItemList` (öne çıkan koleksiyonlar) + `BreadcrumbList`            |
| Koleksiyon listesi  | `BreadcrumbList` + `ItemList`                                      |
| Koleksiyon detay    | `BreadcrumbList` + `ItemList` (kategorideki ürünler)               |
| Ürün detay          | `BreadcrumbList` + `Product`                                       |
| Proje detay         | `BreadcrumbList` + `CreativeWork`                                  |
| Makale detay        | `BreadcrumbList` + `Article`                                       |
| Farkımız            | `BreadcrumbList` + `FAQPage` (süreç adımları)                      |
| Referanslar         | `BreadcrumbList` + `AggregateRating`                               |
| İletişim            | `BreadcrumbList` + `ContactPage` + `LocalBusiness`                 |
| Kampanya detay      | `BreadcrumbList`                                                   |

Tümünü tek noktadan yönetmek için `src/lib/jsonld.ts` içindeki üreticileri
kullanın. Yeni sayfa eklerken `<JsonLd data={...} />` bileşenini sayfa
ağacına gömerek genişletin.

### 2. Hreflang & Canonical

Her sayfa, `src/lib/seo.ts` içindeki `buildLanguageAlternates(path)` ile
otomatik `tr`, `en` ve `x-default` hreflang etiketleri üretir. Canonical URL,
varsayılan locale TR olduğu için `/path` (TR) ve `/en/path` (EN) şeklindedir.

### 3. Sitemap & Robots

- `sitemap.xml` derleme zamanında dinamik üretilir; statik sayfalar +
  veritabanından gelen kategoriler, ürünler, kampanyalar ve sabit projeler/
  makaleler dahil edilir.
- `robots.txt` admin paneli ve API'leri index dışı bırakır; `GPTBot`'a
  içerik kapalıdır (gerekirse açabilirsiniz).

### 4. OpenGraph & Twitter

- Statik fallback: `public/og-image.jpg` (1200×630).
- Dinamik OG: `src/app/opengraph-image.tsx` (`@vercel/og` / Edge runtime).
- Sayfa-bazlı override: ürün/koleksiyon/makale sayfalarında ilgili görsel
  otomatik OG image olarak yayılır.

### 5. Performans (Core Web Vitals)

`next.config.ts` üzerinden:

- `compress: true` — Gzip/Brotli yanıt sıkıştırma
- `images.formats`: AVIF + WebP otomatik dönüşüm
- 30 günlük image cache TTL
- HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy başlıkları

---

## Komutlar

| Komut                  | Açıklama                                  |
|------------------------|-------------------------------------------|
| `npm run dev`          | Geliştirme sunucusu (port 3000)           |
| `npm run dev:turbo`    | Turbopack ile geliştirme                  |
| `npm run build`        | Üretim derlemesi                          |
| `npm run start`        | Üretim sunucusu                           |
| `npm run lint`         | ESLint çalıştır                           |
| `npm run format`       | Prettier ile biçimlendir                  |
| `npm run db:generate`  | Drizzle migration üret                    |
| `npm run db:migrate`   | Migration'ları uygula                     |
| `npm run db:push`      | Şemayı doğrudan DB'ye push et             |

---

## Deployment

Proje Vercel / Docker / kendi sunucu üzerinde sorunsuz çalışır.

### Vercel

`NEXT_PUBLIC_SITE_URL`, `APP_ID`, `APP_SECRET`, `TURSO_DATABASE_URL`,
`TURSO_AUTH_TOKEN`, `CLOUDINARY_*` değişkenlerini Vercel projesine ekleyin
ve `npm run build` build komutu olarak ayarlayın.

### Docker

```bash
docker build -t vitem-web .
docker run -p 3000:3000 --env-file .env vitem-web
```

### SEO doğrulamaları (deploy sonrası)

1. `https://vitem.com.tr/sitemap.xml` → Tüm sayfalar listelenmeli
2. `https://vitem.com.tr/robots.txt` → Sitemap referansı görünmeli
3. [Rich Results Test](https://search.google.com/test/rich-results) → Schema'lar geçerli olmalı
4. [PageSpeed Insights](https://pagespeed.web.dev/) → CWV skorları yeşil
5. [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) → OG görsel görünmeli
6. [Twitter Card Validator](https://cards-dev.twitter.com/validator) → Card "summary_large_image"
7. Google Search Console → sitemap submit, ilk index istemi

---

## Lisans

© Vitem Mobilya — Tüm hakları saklıdır.
