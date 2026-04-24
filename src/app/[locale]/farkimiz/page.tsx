"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Award, Palette, Activity, Cpu, Headphones, Clock } from "lucide-react";
import Footer from "@/sections/Footer";

const features = [
  { key: "quality", icon: Award, titleKey: "quality_title" as const, descKey: "quality_desc" as const },
  { key: "design", icon: Palette, titleKey: "design_title" as const, descKey: "design_desc" as const },
  { key: "ergonomy", icon: Activity, titleKey: "ergonomy_title" as const, descKey: "ergonomy_desc" as const },
  { key: "tech", icon: Cpu, titleKey: "tech_title" as const, descKey: "tech_desc" as const },
  { key: "service", icon: Headphones, titleKey: "service_title" as const, descKey: "service_desc" as const },
  { key: "experience", icon: Clock, titleKey: "experience_title" as const, descKey: "experience_desc" as const },
];

export default function FarkimizPage() {
  const t = useTranslations("farkimiz");

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
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed font-light">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 sm:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-vitem-600 leading-relaxed font-light">
                    {t(feature.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-20 bg-vitem-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1997", label: "Kuruluş Yılı" },
              { number: "3.500 m²", label: "Üretim Tesisi" },
              { number: "80+", label: "Uzman Ekip" },
              { number: "10.000+", label: "Tamamlanan Proje" },
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

      {/* Process Section */}
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
              Sürecimiz
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-light text-vitem-900 tracking-tight">
              Projeden Teslimata Kusursuz Yolculuk
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Keşif & Ölçüm", desc: "Mekanınızı yerinde ziyaret ederek ihtiyaçlarınızı ve ölçülerinizi belirliyoruz." },
              { step: "02", title: "Tasarım & Sunum", desc: "3D görselleştirme ile projenizi teslimattan önce gözünüzde canlandırın." },
              { step: "03", title: "Üretim", desc: "3.500 m²'lik tesisimizde CNC makineleriyle hassas üretim gerçekleştiriyoruz." },
              { step: "04", title: "Montaj & Teslimat", desc: "Uzman ekibimiz kurulumu tamamlayıp satış sonrası destek için yanınızda." },
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
