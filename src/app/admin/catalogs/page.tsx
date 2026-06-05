import { getDb } from "@/server/queries/connection";
import { catalogs } from "@db/schema";
import { desc } from "drizzle-orm";
import CatalogsClient from "./CatalogsClient";

export const metadata = {
  title: "Kataloglar — Vitem Admin",
};

export default async function CatalogsPage() {
  const db = getDb();
  const allCatalogs = await db
    .select()
    .from(catalogs)
    .orderBy(desc(catalogs.sortOrder));

  return <CatalogsClient catalogs={allCatalogs} />;
}
