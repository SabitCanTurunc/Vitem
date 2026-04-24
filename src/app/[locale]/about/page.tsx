"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Footer from "@/sections/Footer";

export default function About() {
  const t = useTranslations("about");

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              {t("eyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight max-w-4xl">
              {t("title")}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Image */}
      <section className="pb-16 sm:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="aspect-[21/9] overflow-hidden bg-vitem-100"
          >
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
              alt="Vitem atölyesi"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 sm:pb-28 lg:pb-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-vitem-900 tracking-tight mb-6">
                {t("story_title")}
              </h2>
              <div className="space-y-4 text-vitem-600 leading-relaxed">
                <p>{t("story_p1")}</p>
                <p>{t("story_p2")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-vitem-900 tracking-tight mb-6">
                {t("philosophy_title")}
              </h2>
              <div className="space-y-4 text-vitem-600 leading-relaxed">
                <p>{t("philosophy_p1")}</p>
                <p>{t("philosophy_p2")}</p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-vitem-200"
          >
            {[
              { number: "25+", labelKey: "stat_years" },
              { number: "10.000+", labelKey: "stat_projects" },
              { number: "80+", labelKey: "stat_team" },
              { number: "3", labelKey: "stat_collections" },
            ].map((stat) => {
              const labels: Record<string, string> = {
                stat_years: t("stat_years"),
                stat_projects: t("stat_projects"),
                stat_team: t("stat_team"),
                stat_collections: t("stat_collections"),
              };
              return (
                <div key={stat.labelKey} className="text-center">
                  <span className="block text-3xl sm:text-4xl font-sans font-light text-vitem-900">
                    {stat.number}
                  </span>
                  <span className="mt-2 block text-xs tracking-[0.15em] uppercase text-vitem-500">
                    {labels[stat.labelKey]}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
