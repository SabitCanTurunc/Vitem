export const dynamic = "force-dynamic";
import { getCategoryBySlug } from "../../../../../api/queries/products";
import CollectionDetailClient from "./CollectionDetailClient";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <CollectionDetailClient category={category} />
      <Footer />
    </main>
  );
}
