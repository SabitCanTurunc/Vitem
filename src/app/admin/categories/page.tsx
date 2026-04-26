export const dynamic = "force-dynamic";
export const runtime = "edge";
import { getDb } from "../../../../api/queries/connection";
import { categories } from "@db/schema";
import { asc } from "drizzle-orm";
import CategoriesClient from "./CategoriesClient";

export default async function AdminCategories() {
  const db = getDb();
  const cats = await db.query.categories.findMany({
    orderBy: [asc(categories.sortOrder)],
  });

  return (
    <CategoriesClient initialCategories={cats as any} />
  );
}
