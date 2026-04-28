"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Philosophy() {
  const t = useTranslations("philosophy");

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-vitem-100"
          >
            <img
              src="/images/philosophy-side.jpg"
              alt={t("alt_image")}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-vitem-900 tracking-tight leading-tight">
              {t("title")}
            </h2>
            <div className="mt-6 sm:mt-8 space-y-4 text-vitem-600 leading-relaxed">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 mt-8 text-vitem-900 text-sm tracking-[0.15em] uppercase font-medium hover:gap-4 transition-all duration-300"
            >
              <span className="border-b border-vitem-400 pb-1 group-hover:border-vitem-900 transition-colors">
                {t("cta")}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
