"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CollectionsClient({ categories }: { categories: any[] }) {
  const t = useTranslations("collections");
  const locale = useLocale();
  const displayCategories = categories ?? [];

  return (
    <>
      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="pb-20 sm:pb-28 lg:pb-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {displayCategories.map((category, index) => {
              const displayName = locale === "en" && category.nameEn ? category.nameEn : category.name;
              const displayDesc = locale === "en" && category.descriptionEn ? category.descriptionEn : category.description;
              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  className={index === 0 ? "lg:col-span-2" : ""}
                >
                  <Link
                    href={`/collections/${category.slug}` as any}
                    className="group block relative overflow-hidden bg-vitem-100"
                  >
                    <div className={`${index === 0 ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                      <img
                        src={category.imageUrl ?? "/images/hero-fallback-1.jpg"}
                        alt={displayName}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-vitem-950/70 via-vitem-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-light text-white tracking-wide">
                        {displayName}
                      </h2>
                      <p className="mt-2 text-sm text-white/70 max-w-md leading-relaxed">
                        {displayDesc}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-white/80 text-sm group-hover:text-white transition-colors">
                        <span className="border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                          {t("explore")}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
