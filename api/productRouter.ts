// @ts-nocheck
import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  getAllCategories,
  getCategoryBySlug,
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getActiveHeroSlides,
} from "./queries/products";

export const productRouter = createRouter({
  // Categories
  categories: publicQuery.query(() => getAllCategories()),

  categoryBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getCategoryBySlug(input.slug)),

  // Products
  products: publicQuery.query(() => getAllProducts()),

  productBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getProductBySlug(input.slug)),

  productsByCategory: publicQuery
    .input(z.object({ categorySlug: z.string() }))
    .query(({ input }) => getProductsByCategory(input.categorySlug)),

  featuredProducts: publicQuery.query(() => getFeaturedProducts()),

  // Hero
  heroSlides: publicQuery.query(() => getActiveHeroSlides()),
});
