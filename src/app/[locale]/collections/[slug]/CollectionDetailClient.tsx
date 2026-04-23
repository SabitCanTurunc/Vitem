"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CollectionDetailClient({ category }: { category: any }) {
  const products = category.products ?? [];

  return (
    <>
      {/* Collection Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6 text-sm text-vitem-500">
              <Link href="/" className="hover:text-vitem-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-vitem-900 transition-colors">Collections</Link>
              <span>/</span>
              <span className="text-vitem-900">{category.name}</span>
            </div>

            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              Collection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight">
              {category.name}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {category.imageUrl && (
        <section className="pb-16 sm:pb-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[21/9] overflow-hidden bg-vitem-100"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="pb-20 sm:pb-28 lg:pb-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-vitem-900 tracking-tight">
              Products in {category.name}
            </h2>
            <span className="text-sm text-vitem-500 mt-2 block">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
          </motion.div>

          {products.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {products.map((product: any) => (
                <motion.article key={product.id} variants={itemVariants}>
                  <Link
                    href={`/collections/${category.slug}/products/${product.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden aspect-[4/5] bg-vitem-100 mb-5">
                      <img
                        src={product.featuredImage ?? "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-vitem-900 tracking-wide">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-vitem-500 line-clamp-2 leading-relaxed">
                      {product.shortDescription ?? product.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3 text-sm text-vitem-600 group-hover:text-vitem-900 transition-colors">
                      <span className="border-b border-vitem-400 pb-0.5 group-hover:border-vitem-900 transition-colors">
                        Discover more
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-vitem-500">No products available in this collection yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
