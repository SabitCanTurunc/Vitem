"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Eye, BookOpen, Send, CheckCircle } from "lucide-react";
import Footer from "@/sections/Footer";

const catalogs = [
  {
    id: 1,
    title: "Vitem 2025 — Ana Katalog",
    description: "Mutfak, banyo ve yaşam alanları için tüm koleksiyonlarımızı içeren kapsamlı katalog.",
    cover: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    pages: 124,
    size: "28 MB",
    year: "2025",
    category: "Genel",
  },
  {
    id: 2,
    title: "Vitem Mutfak Koleksiyonu 2025",
    description: "Tüm mutfak modellerinin detaylı görsel ve teknik özelliklerini içerir.",
    cover: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    pages: 68,
    size: "18 MB",
    year: "2025",
    category: "Mutfak",
  },
  {
    id: 3,
    title: "Vitem Banyo Koleksiyonu 2025",
    description: "Estetik ve fonksiyonelliği bir araya getiren banyo çözümlerimizin katalogu.",
    cover: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    pages: 44,
    size: "12 MB",
    year: "2025",
    category: "Banyo",
  },
  {
    id: 4,
    title: "Ankastre Ürünler 2025",
    description: "Franke, Siemens ve Smeg iş birliğiyle sunduğumuz ankastre ürün gamı.",
    cover: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    pages: 36,
    size: "10 MB",
    year: "2025",
    category: "Ankastre",
  },
];

export default function KatalogPage() {
  const t = useTranslations("katalog");
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestName, setRequestName] = useState("");

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setRequestStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200));
    setRequestStatus("success");
  }

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
              {t("title")}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-vitem-600 max-w-2xl leading-relaxed font-light">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16 sm:py-20 bg-vitem-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {catalogs.map((catalog, index) => (
              <motion.article
                key={catalog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-vitem-200 group hover:shadow-lg transition-shadow duration-500"
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-vitem-100">
                  <img
                    src={catalog.cover}
                    alt={catalog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] tracking-widest uppercase text-white/80 bg-black/30 px-2 py-1">
                      {catalog.category}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-vitem-950/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="flex flex-col items-center gap-2 text-white hover:text-vitem-300 transition-colors">
                      <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] tracking-widest uppercase">{t("view_btn")}</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-white hover:text-vitem-300 transition-colors">
                      <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                        <Download className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] tracking-widest uppercase">{t("download_btn")}</span>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-sm font-medium text-vitem-900 mb-1 leading-tight">{catalog.title}</h3>
                  <p className="text-xs text-vitem-500 font-light leading-relaxed mb-4">{catalog.description}</p>
                  <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-vitem-400">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{catalog.pages} sayfa</span>
                    </div>
                    <span>{catalog.size}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Print Catalog Request */}
      <section className="py-16 sm:py-20 bg-white border-t border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
                Ücretsiz
              </span>
              <h2 className="text-3xl font-sans font-light text-vitem-900 mb-4">{t("request_btn")}</h2>
              <p className="text-sm text-vitem-600 font-light leading-relaxed">{t("request_desc")}</p>
            </motion.div>

            {requestStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-vitem-50 border border-vitem-200 p-10 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-light text-vitem-900 mb-2">Talebiniz Alındı</h3>
                <p className="text-sm text-vitem-600 font-light">
                  Basılı kataloğumuz en kısa sürede adresinize gönderilecektir.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleRequest}
                className="bg-vitem-50 border border-vitem-200 p-8 sm:p-10 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Ad Soyad</label>
                    <input
                      required
                      type="text"
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      className="w-full bg-transparent border-b border-vitem-300 py-3 text-sm focus:outline-none focus:border-vitem-900 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">E-Posta</label>
                    <input
                      required
                      type="email"
                      value={requestEmail}
                      onChange={(e) => setRequestEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-vitem-300 py-3 text-sm focus:outline-none focus:border-vitem-900 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-vitem-500">Posta Adresi</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-transparent border-b border-vitem-300 py-3 text-sm focus:outline-none focus:border-vitem-900 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={requestStatus === "submitting"}
                  className="flex items-center gap-2 bg-vitem-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-vitem-800 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {requestStatus === "submitting" ? "Gönderiliyor..." : "Katalog Talep Et"}
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
