import { getDb } from "../api/queries/connection";
import { categories, products, heroSlides } from "./schema";

async function seed() {
  const db = getDb();

  // Seed categories
  const categoryData = [
    {
      name: "Kitchens",
      slug: "kitchens",
      description: "Bespoke kitchen designs crafted with precision and elegance. From modern minimalism to timeless classics, our kitchens redefine the heart of your home.",
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
      sortOrder: 1,
    },
    {
      name: "Doors",
      slug: "doors",
      description: "Architectural doors that make a statement. Combining security, functionality, and aesthetic excellence for every entrance.",
      imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80",
      sortOrder: 2,
    },
    {
      name: "Wardrobes",
      slug: "wardrobes",
      description: "Custom wardrobe solutions that maximize space while reflecting your personal style. Tailored storage for the modern home.",
      imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&q=80",
      sortOrder: 3,
    },
  ];

  for (const cat of categoryData) {
    await db.insert(categories).values(cat).onConflictDoNothing({ target: categories.slug });
  }

  // Get category IDs
  const cats = await db.select().from(categories);
  const getCatId = (slug: string) => cats.find((c) => c.slug === slug)?.id ?? 1;

  // Seed products
  const productData = [
    {
      name: "Modena Kitchen",
      slug: "modena-kitchen",
      description: "A contemporary masterpiece featuring handleless cabinetry, integrated appliances, and a waterfall quartz island. The Modena represents the pinnacle of modern kitchen design with its clean lines and sophisticated material palette.",
      shortDescription: "Contemporary handleless kitchen with quartz island",
      categoryId: getCatId("kitchens"),
      featuredImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Oak, Quartz, Stainless Steel", finish: "Matte / Gloss", warranty: "10 years" }),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Tuscany Kitchen",
      slug: "tuscany-kitchen",
      description: "Warm wood tones meet industrial steel accents in this transitional kitchen design. The Tuscany collection brings Mediterranean warmth to contemporary spaces with its rich materiality and timeless appeal.",
      shortDescription: "Transitional kitchen with warm wood and steel accents",
      categoryId: getCatId("kitchens"),
      featuredImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
        "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Walnut, Brass, Marble", finish: "Natural Oiled", warranty: "10 years" }),
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Lazio Kitchen",
      slug: "lazio-kitchen",
      description: "Minimalist perfection in monochromatic tones. The Lazio kitchen strips away the unnecessary to reveal pure architectural form, creating spaces of serene beauty.",
      shortDescription: "Monochromatic minimalist kitchen design",
      categoryId: getCatId("kitchens"),
      featuredImage: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Lacquer, Corian, Aluminum", finish: "Super Matte", warranty: "10 years" }),
      isFeatured: false,
      sortOrder: 3,
    },
    {
      name: "Entry Pivot Door",
      slug: "entry-pivot-door",
      description: "A grand entrance statement. Our pivot door system features floor-to-ceiling glass and steel framing, creating dramatic first impressions while maintaining thermal efficiency and security.",
      shortDescription: "Floor-to-ceiling pivot entrance door",
      categoryId: getCatId("doors"),
      featuredImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Steel, Tempered Glass", finish: "Powder Coated", warranty: "15 years" }),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Sliding Panel Door",
      slug: "sliding-panel-door",
      description: "Space-efficient sliding panel system perfect for modern open-plan living. Smooth gliding mechanism with concealed hardware for a seamless aesthetic.",
      shortDescription: "Modern sliding panel door system",
      categoryId: getCatId("doors"),
      featuredImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Oak, Frosted Glass", finish: "Oiled / Lacquered", warranty: "15 years" }),
      isFeatured: false,
      sortOrder: 2,
    },
    {
      name: "Walk-In Luxe",
      slug: "walk-in-luxe",
      description: "A complete walk-in wardrobe system with integrated lighting, soft-close drawers, and customizable hanging configurations. Designed to transform your daily routine into a luxurious experience.",
      shortDescription: "Complete walk-in wardrobe system",
      categoryId: getCatId("wardrobes"),
      featuredImage: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Oak, Velvet, LED", finish: "Customizable", warranty: "10 years" }),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Compact Smart",
      slug: "compact-smart",
      description: "Intelligent storage solutions for compact spaces. Every inch is optimized with pull-out mechanisms, rotating corner units, and vertical hanging systems.",
      shortDescription: "Smart storage for compact spaces",
      categoryId: getCatId("wardrobes"),
      featuredImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
      ]),
      details: JSON.stringify({ materials: "Laminate, Aluminum", finish: "Matte", warranty: "10 years" }),
      isFeatured: false,
      sortOrder: 2,
    },
  ];

  for (const prod of productData) {
    await db.insert(products).values(prod).onConflictDoNothing({ target: products.slug });
  }

  // Seed hero slides
  const heroData = [
    {
      title: "Crafted in Hatay. Designed for the World.",
      subtitle: "Bespoke interiors that blend Anatolian heritage with contemporary luxury",
      imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
      linkText: "Explore Collection",
      linkHref: "/collections/kitchens",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Where Architecture Meets Living",
      subtitle: "Premium kitchens, doors, and wardrobes crafted with meticulous attention",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
      linkText: "Discover More",
      linkHref: "/collections",
      sortOrder: 2,
      isActive: true,
    },
  ];

  for (const hero of heroData) {
    await db.insert(heroSlides).values(hero);
  }

  console.log("Seed completed successfully!");
}

seed().catch(console.error);
