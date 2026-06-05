"use client";

import { motion } from "framer-motion";
import { Download, Eye, Link2, BookOpen, FileText } from "lucide-react";
import Footer from "@/sections/Footer";
import { useTranslations } from "next-intl";
import type { Catalog } from "@db/schema";

export default function KatalogClient({
  catalogs,
  locale,
}: {
  catalogs: Catalog[];
  locale: string;
}) {
  const t = useTranslations("katalog");

  const getTitle = (c: Catalog) =>
    locale === "en" && c.titleEn ? c.titleEn : c.title;
  const getDesc = (c: Catalog) =>
    locale === "en" && c.descriptionEn ? c.descriptionEn : c.description;
  const getUrl = (c: Catalog) =>
    c.fileType === "link" ? (c.externalLink ?? "#") : (c.fileUrl ?? "#");

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white border-b border-vitem-100">
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
              {locale === "en" ? "Catalogues" : "Kataloglar"}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed font-light">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16 sm:py-24 bg-vitem-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {catalogs.length === 0 ? (
            /* Boş Durum */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <BookOpen className="w-16 h-16 text-vitem-200 mb-6" />
              <p className="text-lg font-light text-vitem-400">
                {locale === "en" ? "No catalogue added yet." : "Henüz katalog eklenmemiş."}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {catalogs.map((c, i) => {
                const url = getUrl(c);
                const isLink = c.fileType === "link";

                return (
                  <motion.article
                    key={c.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="bg-white border border-vitem-200 group hover:shadow-lg transition-all duration-500"
                  >
                    {/* Cover */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-vitem-100">
                      {c.coverImage ? (
                        <img
                          src={c.coverImage}
                          alt={getTitle(c) ?? ""}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-16 h-16 text-vitem-200" />
                        </div>
                      )}

                      {/* Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Type badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[10px] tracking-widest uppercase text-white/80 bg-black/30 px-2 py-1 flex items-center gap-1">
                          {isLink ? <Link2 className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {isLink ? "Link" : "PDF"}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-vitem-950/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-2 text-white hover:text-vitem-300 transition-colors"
                        >
                          <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                            <Eye className="w-4 h-4" />
                          </div>
                          <span className="text-[9px] tracking-widest uppercase">{t("view_btn")}</span>
                        </a>
                        {!isLink && (
                          <a
                            href={url}
                            download
                            className="flex flex-col items-center gap-2 text-white hover:text-vitem-300 transition-colors"
                          >
                            <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                              <Download className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] tracking-widest uppercase">{t("download_btn")}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-sm font-medium text-vitem-900 mb-1 leading-tight">
                        {getTitle(c)}
                      </h3>
                      {getDesc(c) && (
                        <p className="text-xs text-vitem-500 font-light leading-relaxed mb-4 line-clamp-2">
                          {getDesc(c)}
                        </p>
                      )}
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={!isLink ? true : undefined}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-vitem-600 hover:text-vitem-900 transition-colors border-b border-vitem-200 pb-1 w-fit"
                      >
                        {isLink ? <Link2 className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                        {isLink ? (locale === "en" ? "Open" : "Aç") : t("download_btn")}
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
