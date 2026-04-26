import { getAllProducts, getProductBySlug } from "@api/queries/products";
import ProductDetailClient from "./ProductDetailClient";
import Footer from "@/sections/Footer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ productSlug: p.slug }));
}

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
