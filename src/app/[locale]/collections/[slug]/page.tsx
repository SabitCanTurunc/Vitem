export const revalidate = 3600;
import { getAllCategories, getCategoryBySlug } from "../../../../../api/queries/products";
import CollectionDetailClient from "./CollectionDetailClient";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

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
