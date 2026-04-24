import {
  sqliteTable,
  integer,
  text,
  // real,
} from "drizzle-orm/sqlite-core";

// Categories: Kitchens, Doors, Wardrobes
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  descriptionEn: text("description_en"),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

// Products within each category
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  descriptionEn: text("description_en"),
  shortDescription: text("short_description"),
  shortDescriptionEn: text("short_description_en"),
  categoryId: integer("category_id").notNull(),
  featuredImage: text("featured_image"),
  gallery: text("gallery"), // JSON array of Cloudinary URLs
  details: text("details"), // JSON object for additional specs
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Site configuration / Hero content
export const heroSlides = sqliteTable("hero_slides", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  subtitle: text("subtitle"),
  subtitleEn: text("subtitle_en"),
  imageUrl: text("image_url").notNull(),
  linkText: text("link_text").default("Discover more"),
  linkTextEn: text("link_text_en"),
  linkHref: text("link_href"),
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type HeroSlide = typeof heroSlides.$inferSelect;
export type InsertHeroSlide = typeof heroSlides.$inferInsert;

// Form Submissions (Contact / Technical Service / Project Inquiry)
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  formType: text("form_type").notNull().default("contact"), // contact, service, project
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  status: text("status").default("pending"), // pending, reviewed, archived
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

// Campaigns
export const campaigns = sqliteTable("campaigns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  slug: text("slug").notNull().unique().default(""),
  description: text("description"),
  descriptionEn: text("description_en"),
  imageUrl: text("image_url"),
  gallery: text("gallery"), // JSON array of image URLs
  badge: text("badge"),
  discount: text("discount"),
  validUntil: text("valid_until"),
  type: text("type").notNull().default("current"), // current | exhibition
  branch: text("branch"), // Şube bilgisi
  modelColor: text("model_color"), // Model/Renk
  details: text("details"), // Detaylar
  shippingInfo: text("shipping_info"), // Nakliye ve montaj
  originalPrice: text("original_price"),
  discountedPrice: text("discounted_price"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;

// Projects portfolio
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  nameEn: text("name_en"),
  slug: text("slug").notNull().unique(),
  location: text("location").notNull(),
  year: text("year").notNull(),
  category: text("category"),
  categoryEn: text("category_en"),
  description: text("description"),
  descriptionEn: text("description_en"),
  scope: text("scope"), // JSON array of scope items
  scopeEn: text("scope_en"), // JSON array
  featuredImage: text("featured_image"),
  gallery: text("gallery"), // JSON array of image URLs
  sortOrder: integer("sort_order").default(0),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
