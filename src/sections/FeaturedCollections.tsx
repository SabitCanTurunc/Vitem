"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Category } from "@db/schema";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function FeaturedCollections({ categories }: { categories: Category[] }) {
  const t = useTranslations("featured_collections");
  const locale = useLocale();
  const displayCategories = categories ?? [];

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white">
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

        {/* Collection Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {displayCategories.map((category) => {
            const displayName = locale === "en" && category.nameEn ? category.nameEn : category.name;
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={`/collections/${category.slug}` as any}
                  className="group block relative overflow-hidden aspect-[4/5] bg-vitem-100"
                >
                  <img
                    src={category.imageUrl ?? "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80"}
                    alt={displayName}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <h3 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide">
                      {displayName}
                    </h3>
                    <div className="flex items-center gap-3 mt-4 text-white/70 text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-500">
                      <span className="border-b border-white/30 pb-1 group-hover:border-white transition-colors duration-500">
                        {t("discover")}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
