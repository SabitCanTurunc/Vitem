"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

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
  const t = useTranslations("collections");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const products = category.products ?? [];

  const displayName = locale === "en" && category.nameEn ? category.nameEn : category.name;
  const displayDesc = locale === "en" && category.descriptionEn ? category.descriptionEn : category.description;

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
              <Link href="/" className="hover:text-vitem-900 transition-colors">{tCommon("home")}</Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-vitem-900 transition-colors">{tNav("collections")}</Link>
              <span>/</span>
              <span className="text-vitem-900">{displayName}</span>
            </div>

            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              {t("breadcrumb")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight">
              {displayName}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed">
              {displayDesc}
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
                alt={displayName}
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
              {t("products_in", { name: displayName })}
            </h2>
            <span className="text-sm text-vitem-500 mt-2 block">
              {t(products.length === 1 ? "product_count_one" : "product_count_other", { count: products.length })}
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
              {products.map((product: any) => {
                const productName = locale === "en" && product.nameEn ? product.nameEn : product.name;
                const productDesc = locale === "en" && product.shortDescriptionEn
                  ? product.shortDescriptionEn
                  : (product.shortDescription ?? product.description);
                return (
                  <motion.article key={product.id} variants={itemVariants}>
                    <Link
                      href={`/collections/${category.slug}/products/${product.slug}` as any}
                      className="group block"
                    >
                      <div className="relative overflow-hidden aspect-[4/5] bg-vitem-100 mb-5">
                        <img
                          src={product.featuredImage ?? "/images/hero-fallback-1.jpg"}
                          alt={productName}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-vitem-900 tracking-wide">
                        {productName}
                      </h3>
                      <p className="mt-2 text-sm text-vitem-500 line-clamp-2 leading-relaxed">
                        {productDesc}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-sm text-vitem-600 group-hover:text-vitem-900 transition-colors">
                        <span className="border-b border-vitem-400 pb-0.5 group-hover:border-vitem-900 transition-colors">
                          {t("discover_more")}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-vitem-500">{t("no_products")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
