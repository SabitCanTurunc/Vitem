"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Product } from "@db/schema";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FeaturedProducts({ products }: { products: (Product & { category?: { slug: string } | null })[] }) {
  const t = useTranslations("featured_products");
  const locale = useLocale();
  const featured = products ?? [];

  if (featured.length === 0) return null;

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-vitem-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-24 flex flex-col items-center text-center"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-vitem-500 font-medium block mb-4">
            {t("eyebrow")}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-vitem-900 tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {featured.map((product) => {
            const displayName = locale === "en" && product.nameEn ? product.nameEn : product.name;
            const displayDesc = locale === "en" && product.shortDescriptionEn
              ? product.shortDescriptionEn
              : (product.shortDescription ?? product.description);

            return (
              <motion.article key={product.id} variants={itemVariants}>
                <Link
                  href={`/collections/${product.category?.slug}/products/${product.slug}` as any}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-vitem-100 mb-4">
                    <img
                      src={product.featuredImage ?? "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80"}
                      alt={displayName}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-vitem-900 tracking-wide">
                    {displayName}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-vitem-500 line-clamp-2">
                    {displayDesc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-vitem-600 group-hover:text-vitem-900 transition-colors">
                    <span className="border-b border-vitem-400 pb-0.5 group-hover:border-vitem-900 transition-colors">
                      {t("view")}
                    </span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
