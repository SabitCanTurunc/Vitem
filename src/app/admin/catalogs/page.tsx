import { getDb } from "@/server/queries/connection";
import { catalogs } from "@db/schema";
import { desc } from "drizzle-orm";
import CatalogsClient from "./CatalogsClient";

export const metadata = {
  title: "Kataloglar — Vitem Admin",
};

export default async function CatalogsPage() {
  let allCatalogs: any[] = [];
  try {
    const db = getDb();
    allCatalogs = await db
      .select()
      .from(catalogs)
      .orderBy(desc(catalogs.sortOrder));
  } catch (error) {
    console.warn("Katalog tablosu okunamadi (muhtemelen DB'de henuz yok).", error);
  }

  return <CatalogsClient catalogs={allCatalogs} />;
}
