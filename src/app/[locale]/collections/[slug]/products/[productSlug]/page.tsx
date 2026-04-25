export const dynamic = "force-dynamic";
import { getProductBySlug } from "../../../../../../../api/queries/products";
import ProductDetailClient from "./ProductDetailClient";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string, productSlug: string }> }) {
  const { slug, productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetailClient product={product} categorySlug={slug} />
      <Footer />
    </main>
  );
}
