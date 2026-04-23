"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function ProductDetailClient({ product, categorySlug }: { product: any, categorySlug: string }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const gallery: string[] = product.gallery
    ? JSON.parse(product.gallery)
    : [product.featuredImage ?? ""];

  const details: Record<string, string> = product.details
    ? JSON.parse(product.details)
    : {};

  return (
    <>
      {/* Breadcrumb + Header */}
      <section className="pt-32 sm:pt-40 pb-8 sm:pb-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8 text-sm text-vitem-500 flex-wrap">
              <Link href="/" className="hover:text-vitem-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-vitem-900 transition-colors">Collections</Link>
              <span>/</span>
              <Link href={`/collections/${categorySlug}`} className="hover:text-vitem-900 transition-colors">
                {product.category?.name ?? "Collection"}
              </Link>
              <span>/</span>
              <span className="text-vitem-900">{product.name}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="pb-20 sm:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] bg-vitem-100 overflow-hidden mb-4">
                <img
                  src={gallery[selectedImage] ?? product.featuredImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-vitem-100 transition-all ${
                        i === selectedImage
                          ? "ring-2 ring-vitem-900 ring-offset-2"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-3">
                {product.category?.name}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-vitem-900 tracking-tight">
                {product.name}
              </h1>

              <div className="mt-6 sm:mt-8 space-y-4 text-vitem-600 leading-relaxed">
                <p className="text-base sm:text-lg">{product.description}</p>
              </div>

              {/* Details */}
              {Object.keys(details).length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-vitem-900 font-medium mb-4">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-vitem-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-vitem-500 uppercase tracking-wider">{key}</span>
                          <p className="text-sm text-vitem-800 font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-vitem-900 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-vitem-800 transition-colors"
                >
                  Request Information
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
