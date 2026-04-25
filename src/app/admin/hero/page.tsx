export const dynamic = "force-dynamic";
import { getDb } from "../../../../api/queries/connection";
import { heroSlides } from "@db/schema";
import { asc } from "drizzle-orm";
import HeroClient from "./HeroClient";

export default async function AdminHero() {
  const db = getDb();
  const slides = await db.query.heroSlides.findMany({
    orderBy: [asc(heroSlides.sortOrder)],
  });

  return (
    <HeroClient slides={slides} />
  );
}
