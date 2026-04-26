"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

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

export default function Magazine() {
  const t = useTranslations("magazine");

  const articles = [
    {
      id: 1,
      title: t("a1_title"),
      date: "12 Ekim 2025",
      category: t("a1_category"),
      imageUrl: "/images/magazine-1.jpg",
      slug: "selecting-fine-woods",
    },
    {
      id: 2,
      title: t("a2_title"),
      date: "28 Eylül 2025",
      category: t("a2_category"),
      imageUrl: "/images/magazine-2.jpg",
      slug: "minimalism-kitchen-design",
    },
    {
      id: 3,
      title: t("a3_title"),
      date: "15 Eylül 2025",
      category: t("a3_category"),
      imageUrl: "/images/magazine-3.jpg",
      slug: "vitem-in-milan",
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-vitem-500 font-medium block mb-4">
              {t("eyebrow")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-vitem-900 tracking-tight">
              {t("title")}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
          <Link
            href="/magazine"
            className="group inline-flex items-center gap-3 text-vitem-900 text-xs tracking-[0.15em] uppercase font-medium hover:gap-4 transition-all duration-300"
          >
            <span className="border-b border-vitem-400 pb-1 group-hover:border-vitem-900 transition-colors">
              {t("cta")}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          </motion.div>
        </div>

        {/* Article Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {articles.map((article) => (
            <motion.article key={article.id} variants={itemVariants} className="group cursor-pointer">
              <Link href={`/magazine/${article.slug}` as any} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-vitem-100 mb-6">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-&lsqb;1200ms&rsqb; ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-vitem-500 mb-3">
                  <span>{article.category}</span>
                  <span className="w-4 h-[1px] bg-vitem-300" />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-vitem-900 leading-snug group-hover:text-vitem-500 transition-colors duration-300">
                  {article.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
