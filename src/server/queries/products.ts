import { getDb } from "./connection";
import { categories, products, heroSlides, campaigns } from "@db/schema";
import { eq, asc } from "drizzle-orm";

// Categories
export async function getAllCategories() {
  return getDb().query.categories.findMany({
    orderBy: [asc(categories.sortOrder)],
  });
}

export async function getCategoryBySlug(slug: string) {
  return getDb().query.categories.findFirst({
    where: eq(categories.slug, slug),
    with: {
      products: {
        orderBy: [asc(products.sortOrder)],
      },
    },
  });
}

// Products
export async function getAllProducts() {
  return getDb().query.products.findMany({
    orderBy: [asc(products.sortOrder)],
    with: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return getDb().query.products.findFirst({
    where: eq(products.slug, slug),
    with: { category: true },
  });
}

export async function getProductsByCategory(categorySlug: string) {
  const category = await getDb().query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
  });
  if (!category) return [];

  return getDb().query.products.findMany({
    where: eq(products.categoryId, category.id),
    orderBy: [asc(products.sortOrder)],
  });
}

export async function getFeaturedProducts() {
  return getDb().query.products.findMany({
    where: eq(products.isFeatured, true),
    orderBy: [asc(products.sortOrder)],
    with: { category: true },
  });
}

// Hero Slides
export async function getActiveHeroSlides() {
  return getDb().query.heroSlides.findMany({
    where: eq(heroSlides.isActive, true),
    orderBy: [asc(heroSlides.sortOrder)],
  });
}

// Campaigns
export async function getActiveCampaigns(type?: "current" | "exhibition") {
  const db = getDb();
  if (type) {
    return db.select().from(campaigns)
      .where(eq(campaigns.type, type))
      .orderBy(asc(campaigns.sortOrder));
  }
  return db.select().from(campaigns).orderBy(asc(campaigns.sortOrder));
}

export async function getCampaignBySlug(slug: string) {
  return getDb().select().from(campaigns).where(eq(campaigns.slug, slug)).limit(1).then(r => r[0] ?? null);
}
