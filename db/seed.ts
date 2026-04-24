import { getDb } from "../api/queries/connection";
import { categories, products, heroSlides, campaigns, projects } from "./schema";

async function seed() {
  const db = getDb();

  // ── Kategoriler ────────────────────────────────────────────────
  const categoryData = [
    {
      name: "Mutfak",
      nameEn: "Kitchens",
      slug: "mutfak",
      description: "Hatay ustalığı ile hayat bulan özel mutfak tasarımları. Modern minimalizm ile zamansız klasikler arasında gidip gelen koleksiyonlarımız, evinizin kalbini yeniden tanımlıyor.",
      descriptionEn: "Bespoke kitchen designs crafted with Hatay mastery. Our collections ranging from modern minimalism to timeless classics redefine the heart of your home.",
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
      sortOrder: 1,
    },
    {
      name: "Banyo",
      nameEn: "Bathrooms",
      slug: "banyo",
      description: "Her sabah ritüelinizi özel kılan banyo mobilyaları. Ferah tasarımlar ve kaliteli malzemelerle banyonuzu bir spa deneyimine dönüştürün.",
      descriptionEn: "Bathroom furniture that makes your morning ritual special. Transform your bathroom into a spa experience with airy designs and quality materials.",
      imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
      sortOrder: 2,
    },
    {
      name: "Ankastre",
      nameEn: "Built-in Appliances",
      slug: "ankastre",
      description: "Mutfağınızla bütünleşen ankastre ürünler. Estetik ve fonksiyonelliği bir arada sunan yerleşik cihazlarla pişirme deneyiminizi üst seviyeye taşıyın.",
      descriptionEn: "Built-in appliances that integrate seamlessly with your kitchen. Elevate your cooking experience with built-in devices that offer both aesthetics and functionality.",
      imageUrl: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=1200&q=80",
      sortOrder: 3,
    },
    {
      name: "Yaşam Alanları",
      nameEn: "Living Spaces",
      slug: "yasam-alanlari",
      description: "Dolap sistemlerinden TV ünitelerine, yaşam alanlarınızı düzenleyen özel çözümler. Depolama sorunlarına estetik ve akıllı yanıtlar.",
      descriptionEn: "Custom solutions organizing your living spaces from wardrobe systems to TV units. Aesthetic and smart answers to storage problems.",
      imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&q=80",
      sortOrder: 4,
    },
  ];

  for (const cat of categoryData) {
    await db.insert(categories).values(cat).onConflictDoNothing({ target: categories.slug });
  }

  // Get category IDs
  const cats = await db.select().from(categories);
  const getCatId = (slug: string) => cats.find((c) => c.slug === slug)?.id ?? 1;

  // ── Ürünler ────────────────────────────────────────────────────
  const productData = [
    {
      name: "Modena Mutfak",
      nameEn: "Modena Kitchen",
      slug: "modena-mutfak",
      description: "Kulpsuz kapak tasarımı, entegre ankastre ürünler ve şelale quartz ada ile çağdaş bir başyapıt. Modena, temiz çizgileri ve sofistike malzeme paleti ile modern mutfak tasarımının zirvesini temsil eder.",
      descriptionEn: "A contemporary masterpiece featuring handleless cabinetry, integrated appliances, and a waterfall quartz island. The Modena represents the pinnacle of modern kitchen design with its clean lines and sophisticated material palette.",
      shortDescription: "Quartz adalı çağdaş kulpsuz mutfak",
      shortDescriptionEn: "Contemporary handleless kitchen with quartz island",
      categoryId: getCatId("mutfak"),
      featuredImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      ]),
      details: JSON.stringify({ malzeme: "Meşe, Kuvars, Paslanmaz Çelik", yüzey: "Mat / Parlak", garanti: "10 yıl" }),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Tuscany Mutfak",
      nameEn: "Tuscany Kitchen",
      slug: "tuscany-mutfak",
      description: "Sıcak ahşap tonları ile endüstriyel çelik aksesuarların bir araya geldiği bu geçiş tarzı mutfak tasarımında Akdeniz sıcaklığı modern mekânlara taşınıyor.",
      descriptionEn: "Warm wood tones meet industrial steel accents in this transitional kitchen design. The Tuscany collection brings Mediterranean warmth to contemporary spaces.",
      shortDescription: "Sıcak ahşap ve çelik aksesuarlı Akdeniz mutfak",
      shortDescriptionEn: "Transitional kitchen with warm wood and steel accents",
      categoryId: getCatId("mutfak"),
      featuredImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
        "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      ]),
      details: JSON.stringify({ malzeme: "Ceviz, Pirinç, Mermer", yüzey: "Doğal Yağlı", garanti: "10 yıl" }),
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Lazio Mutfak",
      nameEn: "Lazio Kitchen",
      slug: "lazio-mutfak",
      description: "Monokromatik tonlarda minimalist mükemmellik. Lazio mutfak gereksiz olanı soyarak saf mimari formu ortaya çıkarır, dingin güzellikte mekânlar yaratır.",
      descriptionEn: "Minimalist perfection in monochromatic tones. The Lazio kitchen strips away the unnecessary to reveal pure architectural form, creating spaces of serene beauty.",
      shortDescription: "Monokromatik minimalist mutfak tasarımı",
      shortDescriptionEn: "Monochromatic minimalist kitchen design",
      categoryId: getCatId("mutfak"),
      featuredImage: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      ]),
      details: JSON.stringify({ malzeme: "Lake, Corian, Alüminyum", yüzey: "Süper Mat", garanti: "10 yıl" }),
      isFeatured: false,
      sortOrder: 3,
    },
    {
      name: "Ocean Banyo",
      nameEn: "Ocean Bathroom",
      slug: "ocean-banyo",
      description: "Okyanus mavisiyle ilham alan bu banyo koleksiyonu, akrilik lake yüzeyler ve modern donanımıyla banyonuzu ferah bir deniz atmosferine dönüştürüyor.",
      descriptionEn: "Inspired by the ocean blue, this bathroom collection transforms your bathroom into a fresh sea atmosphere with acrylic lacquered surfaces and modern fixtures.",
      shortDescription: "Okyanus temalı modern banyo mobilyası",
      shortDescriptionEn: "Ocean-themed modern bathroom furniture",
      categoryId: getCatId("banyo"),
      featuredImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
      ]),
      details: JSON.stringify({ malzeme: "MDF, Akrilik Lake", yüzey: "Parlak", garanti: "10 yıl" }),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Walk-In Gardrop",
      nameEn: "Walk-In Luxe",
      slug: "walk-in-gardrop",
      description: "Entegre aydınlatma, yumuşak kapanan çekmeceler ve özelleştirilebilir askılık konfigürasyonlarıyla eksiksiz bir giyinme odası sistemi. Günlük rutininizi lüks bir deneyime dönüştürmek için tasarlandı.",
      descriptionEn: "A complete walk-in wardrobe system with integrated lighting, soft-close drawers, and customizable hanging configurations. Designed to transform your daily routine into a luxurious experience.",
      shortDescription: "Eksiksiz giyinme odası sistemi",
      shortDescriptionEn: "Complete walk-in wardrobe system",
      categoryId: getCatId("yasam-alanlari"),
      featuredImage: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      ]),
      details: JSON.stringify({ malzeme: "Meşe, Kadife, LED", yüzey: "Özelleştirilebilir", garanti: "10 yıl" }),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Kompakt Akıllı Gardrop",
      nameEn: "Compact Smart",
      slug: "kompakt-gardrop",
      description: "Kompakt yaşam alanları için akıllı depolama çözümleri. Her santimetre, çekme mekanizmaları, döner köşe üniteleri ve dikey askılık sistemleriyle optimize edilmiştir.",
      descriptionEn: "Intelligent storage solutions for compact spaces. Every inch is optimized with pull-out mechanisms, rotating corner units, and vertical hanging systems.",
      shortDescription: "Kompakt alanlar için akıllı depolama",
      shortDescriptionEn: "Smart storage for compact spaces",
      categoryId: getCatId("yasam-alanlari"),
      featuredImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      ]),
      details: JSON.stringify({ malzeme: "Laminat, Alüminyum", yüzey: "Mat", garanti: "10 yıl" }),
      isFeatured: false,
      sortOrder: 2,
    },
  ];

  for (const prod of productData) {
    await db.insert(products).values(prod).onConflictDoNothing({ target: products.slug });
  }

  // ── Hero Slaytları ─────────────────────────────────────────────
  // Mevcut slaytları temizle ve yeniden ekle
  await db.delete(heroSlides);

  const heroData = [
    {
      title: "Hatay'da Üretildi. Dünya İçin Tasarlandı.",
      titleEn: "Crafted in Hatay. Designed for the World.",
      subtitle: "Anadolu mirasını çağdaş lüksle harmanlayan özel iç mekan tasarımları",
      subtitleEn: "Bespoke interiors that blend Anatolian heritage with contemporary luxury",
      imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
      linkText: "Koleksiyonu Keşfet",
      linkTextEn: "Explore Collection",
      linkHref: "/collections",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Mimari ile Yaşamın Buluştuğu Yer",
      titleEn: "Where Architecture Meets Living",
      subtitle: "Özenle işlenmiş mutfaklar, banyolar ve yaşam alanları",
      subtitleEn: "Premium kitchens, bathrooms and living spaces crafted with meticulous attention",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      linkText: "Daha Fazla Keşfet",
      linkTextEn: "Discover More",
      linkHref: "/collections",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "Evinizin Her Köşesinde Vitem Kalitesi",
      titleEn: "Vitem Quality in Every Corner of Your Home",
      subtitle: "35 yılı aşkın deneyimle üstün malzeme ve işçilik",
      subtitleEn: "Superior materials and craftsmanship with over 35 years of experience",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
      linkText: "Hakkımızda",
      linkTextEn: "About Us",
      linkHref: "/about",
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const hero of heroData) {
    await db.insert(heroSlides).values(hero);
  }

  // ── Kampanyalar ────────────────────────────────────────────────
  await db.delete(campaigns);

  const campaignData = [
    // Teşhir Ürünleri
    {
      title: "Antioch Mutfak",
      titleEn: "Antioch Kitchen",
      slug: "antioch-mutfak",
      description: "CNC kapak işlemeli ipek mat lake bej modeli. Kalkma nedeni: Standart ürün imalat detay ve yöntemleri değişmiştir.",
      descriptionEn: "CNC door processed silk matte lacquered beige model. Reason for discontinuation: Standard product manufacturing details and methods have changed.",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      ]),
      type: "exhibition" as const,
      branch: "İskenderun Mağaza",
      modelColor: "CNC kapak işlemeli ipek mat lake bej",
      details: "Kalkma nedeni: Standart ürün imalat detay ve yöntemleri değişmiştir",
      shippingInfo: "Nakliye ve montaj dahil",
      originalPrice: "Detaylar için mağazamızla iletişime geçiniz",
      discountedPrice: "Detaylar için mağazamızla iletişime geçiniz",
      badge: "Teşhir",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Time Box Mutfak",
      titleEn: "Time Box Kitchen",
      slug: "time-box-mutfak",
      description: "Akrilik bazlı parlak lake cappicino modeli. Kalkma nedeni: Standart ürün imalat detay ve yöntemleri değişmiştir.",
      descriptionEn: "Acrylic-based high gloss lacquered cappuccino model. Reason for discontinuation: Standard product manufacturing details and methods have changed.",
      imageUrl: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
        "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      ]),
      type: "exhibition" as const,
      branch: "İskenderun Mağaza",
      modelColor: "Akrilik bazlı parlak lake cappicino",
      details: "Kalkma nedeni: Standart ürün imalat detay ve yöntemleri değişmiştir",
      shippingInfo: "Nakliye ve montaj dahil",
      originalPrice: "Detaylar için mağazamızla iletişime geçiniz",
      discountedPrice: "Detaylar için mağazamızla iletişime geçiniz",
      badge: "Teşhir",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "Ocean Banyo",
      titleEn: "Ocean Bathroom",
      slug: "ocean-banyo-teshir",
      description: "Akrilik bazlı parlak lake turkuaz modeli. Kalkma nedeni: Standart ürün gamından kalkmıştır.",
      descriptionEn: "Acrylic-based high gloss lacquered turquoise model. Reason for discontinuation: Discontinued from standard product range.",
      imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
      ]),
      type: "exhibition" as const,
      branch: "İskenderun Mağaza",
      modelColor: "Akrilik bazlı parlak lake turkuaz",
      details: "Kalkma nedeni: Standart ürün gamından kalkmıştır",
      shippingInfo: "Nakliye ve montaj dahil",
      originalPrice: "Detaylar için mağazamızla iletişime geçiniz",
      discountedPrice: "Detaylar için mağazamızla iletişime geçiniz",
      badge: "Teşhir",
      sortOrder: 3,
      isActive: true,
    },
    {
      title: "Rosse Banyo",
      titleEn: "Rosse Bathroom",
      slug: "rosse-banyo",
      description: "Akrilik bazlı parlak lake bordo modeli. Kalkma nedeni: Standart ürün imalat şekli görsel ve teknik detay farklılıkları.",
      descriptionEn: "Acrylic-based high gloss lacquered burgundy model. Reason for discontinuation: Standard product manufacturing style, visual and technical detail differences.",
      imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80",
      ]),
      type: "exhibition" as const,
      branch: "İskenderun Mağaza",
      modelColor: "Akrilik bazlı parlak lake bordo",
      details: "Kalkma nedeni: Standart ürün imalat şekli görsel ve teknik detay farklılıkları",
      shippingInfo: "Nakliye ve montaj dahil",
      originalPrice: "Detaylar için mağazamızla iletişime geçiniz",
      discountedPrice: "Detaylar için mağazamızla iletişime geçiniz",
      badge: "Teşhir",
      sortOrder: 4,
      isActive: true,
    },
    // Güncel Kampanyalar
    {
      title: "%20 Mutfak İndirimi",
      titleEn: "20% Kitchen Discount",
      slug: "yuzde-20-mutfak",
      description: "Seçili mutfak modellerinde geçerli özel indirim fırsatı. Hızlı davranın, stoklar sınırlıdır!",
      descriptionEn: "Special discount on selected kitchen models. Act fast, stocks are limited!",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      type: "current" as const,
      badge: "%20 İndirim",
      discount: "20",
      validUntil: "31 Mayıs 2026",
      originalPrice: "150.000 ₺",
      discountedPrice: "120.000 ₺",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Banyo Yenileme Kampanyası",
      titleEn: "Bathroom Renovation Campaign",
      slug: "banyo-yenileme",
      description: "Tüm banyo mobilyalarında ücretsiz montaj ve %15 indirim fırsatı. Bu ay sipariş verenlere özel!",
      descriptionEn: "Free installation and 15% discount on all bathroom furniture. Exclusive for orders placed this month!",
      imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      type: "current" as const,
      badge: "Ücretsiz Montaj",
      discount: "15",
      validUntil: "30 Nisan 2026",
      originalPrice: "80.000 ₺",
      discountedPrice: "68.000 ₺",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "Ankastre Paket Fırsatı",
      titleEn: "Built-in Appliance Package Deal",
      slug: "ankastre-paket",
      description: "Ankastre set alımlarında cazip paket fiyatları. Fırın + Davlumbaz + Ocak kombo fiyatlarını kaçırmayın!",
      descriptionEn: "Attractive package prices on built-in appliance sets. Don't miss the Oven + Hood + Hob combo prices!",
      imageUrl: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      type: "current" as const,
      badge: "Paket Fiyat",
      discount: "25",
      validUntil: "15 Mayıs 2026",
      originalPrice: "45.000 ₺",
      discountedPrice: "33.750 ₺",
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const campaign of campaignData) {
    await db.insert(campaigns).values(campaign);
  }

  // ── Projeler ───────────────────────────────────────────────────
  await db.delete(projects);

  const projectData = [
    {
      name: "Antakya Rezidans",
      nameEn: "Antakya Residence",
      slug: "antakya-rezidans",
      location: "Antakya, Hatay",
      year: "2024",
      category: "Mutfak & Banyo",
      categoryEn: "Kitchen & Bathroom",
      description: "Modern ve minimalist tasarım anlayışıyla hayata geçirilen bu projede, açık plan mutfak ve oturma alanı arasındaki geçirgenlik ön plana çıkarılmıştır. Beyaz lake kapaklar ve siyah metal aksesuarların kombinasyonu mekanı çarpıcı kılmaktadır.",
      descriptionEn: "In this project brought to life with a modern and minimalist design approach, the permeability between the open-plan kitchen and living area is highlighted. The combination of white lacquered doors and black metal accessories makes the space striking.",
      scope: JSON.stringify(["Mutfak Tasarımı", "Banyo Mobilyası", "Yaşam Alanı Dolabı", "Montaj"]),
      scopeEn: JSON.stringify(["Kitchen Design", "Bathroom Furniture", "Living Space Cabinet", "Installation"]),
      featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
      ]),
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "İskenderun Villa",
      nameEn: "İskenderun Villa",
      slug: "iskenderun-villa",
      location: "İskenderun, Hatay",
      year: "2023",
      category: "Mutfak",
      categoryEn: "Kitchen",
      description: "Deniz manzaralı bu villada ahşap dokular ve mat lake yüzeyler bir araya getirildi. Ada konsepti ile tasarlanan mutfak, geniş aile kullanımına uygun pratik çözümler sunmaktadır.",
      descriptionEn: "In this sea-view villa, wood textures and matte lacquered surfaces are combined. The kitchen designed with an island concept offers practical solutions suitable for large family use.",
      scope: JSON.stringify(["Ada Mutfak", "Gömme Dolap", "Ankastre Kurulum"]),
      scopeEn: JSON.stringify(["Island Kitchen", "Built-in Wardrobe", "Appliance Installation"]),
      featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      ]),
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Reyhanlı Modern Daire",
      nameEn: "Reyhanlı Modern Apartment",
      slug: "reyhanli-modern-daire",
      location: "Reyhanlı, Hatay",
      year: "2024",
      category: "Yaşam Alanları",
      categoryEn: "Living Spaces",
      description: "Kompakt yaşam alanlarında maksimum depolama çözümleri sunan bu proje, TV ünitesi, gardrop sistemi ve çok fonksiyonlu dolap tasarımlarıyla öne çıkmaktadır.",
      descriptionEn: "This project offering maximum storage solutions in compact living spaces stands out with TV unit, wardrobe system and multi-functional cabinet designs.",
      scope: JSON.stringify(["TV Ünitesi", "Gardrop Sistemi", "Yatak Odası Mobilyası"]),
      scopeEn: JSON.stringify(["TV Unit", "Wardrobe System", "Bedroom Furniture"]),
      featuredImage: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      ]),
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const project of projectData) {
    await db.insert(projects).values(project);
  }

  console.log("✓ Seed tamamlandı!");
}

seed().catch(console.error);
