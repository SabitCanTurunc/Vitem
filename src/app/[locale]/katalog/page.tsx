import { getDb } from "@/server/queries/connection";
import { catalogs } from "@db/schema";
import { eq, desc } from "drizzle-orm";
import KatalogClient from "./KatalogClient";

export default async function KatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const db = getDb();
  const allCatalogs = await db
    .select()
    .from(catalogs)
    .where(eq(catalogs.isActive, true))
    .orderBy(desc(catalogs.sortOrder));

  return <KatalogClient catalogs={allCatalogs} locale={locale} />;
}
