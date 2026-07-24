"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award, Palette, Activity, Cpu, Headphones, Clock } from "lucide-react";
import Footer from "@/sections/Footer";

const features = [
  { key: "quality",    icon: Award,      titleKey: "quality_title"    as const, descKey: "quality_desc"    as const },
  { key: "design",     icon: Palette,    titleKey: "design_title"     as const, descKey: "design_desc"     as const },
  { key: "ergonomy",   icon: Activity,   titleKey: "ergonomy_title"   as const, descKey: "ergonomy_desc"   as const },
  { key: "tech",       icon: Cpu,        titleKey: "tech_title"       as const, descKey: "tech_desc"       as const },
  { key: "service",    icon: Headphones, titleKey: "service_title"    as const, descKey: "service_desc"    as const },
  { key: "experience", icon: Clock,      titleKey: "experience_title" as const, descKey: "experience_desc" as const },
];

export default function About() {
  const t = useTranslations("about");
  const tf = useTranslations("farkimiz");

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
              src="/images/interior.jpg"
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
              { number: "25+",      labelKey: "stat_years" },
              { number: "10.000+", labelKey: "stat_projects" },
              { number: "80+",     labelKey: "stat_team" },
              { number: "3",       labelKey: "stat_collections" },
            ].map((stat) => {
              const labels: Record<string, string> = {
                stat_years:       t("stat_years"),
                stat_projects:    t("stat_projects"),
                stat_team:        t("stat_team"),
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

      {/* ── Farkımız: Özellikler Grid ─────────────────────────── */}
      <section className="pb-20 sm:pb-28 bg-white border-t border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              {tf("eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-light text-vitem-900 tracking-tight max-w-2xl">
              {tf("title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-vitem-200">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-white p-10 lg:p-12 group hover:bg-vitem-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-vitem-200 group-hover:border-vitem-900 transition-colors duration-300 mb-8">
                    <Icon className="w-5 h-5 text-vitem-500 group-hover:text-vitem-900 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-sans font-light text-vitem-900 tracking-tight mb-4">
                    {tf(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-vitem-600 leading-relaxed font-light">
                    {tf(feature.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Üretim ve Tesis Görselleri ─────────────────────────── */}
      <section className="pb-20 sm:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-vitem-100 group relative"
            >
              <img
                src="/images/uretimbandi.png"
                alt="Üretim Bandı"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8">
                <span className="text-white text-lg sm:text-xl tracking-wide font-light">Modern Üretim Bandı</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-vitem-100 group relative"
            >
              <img
                src="/images/gunespanel.png"
                alt="Güneş Paneli"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8">
                <span className="text-white text-lg sm:text-xl tracking-wide font-light">Sürdürülebilir Enerji</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Farkımız: Stats Band ──────────────────────────────── */}
      <section className="py-20 bg-vitem-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1997",     label: tf("stat_founded") },
              { number: "3.500 m²", label: tf("stat_facility") },
              { number: "80+",      label: tf("stat_team") },
              { number: "10.000+",  label: tf("stat_projects") },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="block text-3xl sm:text-4xl font-sans font-light text-white tracking-tight">
                  {stat.number}
                </span>
                <span className="mt-2 block text-[10px] tracking-[0.2em] uppercase text-vitem-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Farkımız: Süreç Adımları ─────────────────────────── */}
      <section className="py-20 sm:py-28 bg-vitem-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              {tf("process_eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-light text-vitem-900 tracking-tight">
              {tf("process_title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: tf("step1_title"), desc: tf("step1_desc") },
              { step: "02", title: tf("step2_title"), desc: tf("step2_desc") },
              { step: "03", title: tf("step3_title"), desc: tf("step3_desc") },
              { step: "04", title: tf("step4_title"), desc: tf("step4_desc") },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-vitem-200 z-0" />
                )}
                <div className="relative z-10">
                  <span className="text-5xl font-sans font-light text-vitem-200 block mb-4">{item.step}</span>
                  <h4 className="text-base font-sans font-medium text-vitem-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-vitem-600 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
