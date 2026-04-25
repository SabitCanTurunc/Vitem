export const dynamic = "force-dynamic";
import { getDb } from "../../../../api/queries/connection";
import { products, categories } from "@db/schema";
import { eq, asc } from "drizzle-orm";
import ProductsClient from "./ProductsClient";

export default async function AdminProducts() {
  const db = getDb();
  
  const [prods, cats] = await Promise.all([
    db.select({
      id: products.id,
      name: products.name,
      nameEn: products.nameEn,
      slug: products.slug,
      isFeatured: products.isFeatured,
      categoryName: categories.name,
    }).from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(asc(products.sortOrder)),
    db.select().from(categories).orderBy(asc(categories.name))
  ]);

  return (
    <ProductsClient prods={prods as any} categories={cats as any} />
  );
}
