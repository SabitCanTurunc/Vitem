"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Eye, Send, CheckCircle } from "lucide-react";
import Footer from "@/sections/Footer";
import { submitContactForm } from "../../../../api/actions/contactActions";

const CATALOG_PDF = "https://www.vitem.com.tr/media/vitem_catalog_tr.pdf";

const catalog = {
  title: "Vitem — Ana Katalog",
  description: "Mutfak, banyo ve yaşam alanları için tüm koleksiyonlarımızı içeren kapsamlı katalog.",
  cover: "/images/kitchen.jpg",
  year: "2025",
  category: "Genel",
};

export default function KatalogPage() {
  const t = useTranslations("katalog");
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [address, setAddress] = useState("");

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setRequestStatus("submitting");
    const fd = new FormData();
    fd.append("name", requestName);
    fd.append("email", requestEmail);
    fd.append("message", `Katalog talebi — Posta adresi: ${address}`);
    fd.append("formType", "catalog");
    const res = await submitContactForm(fd);
    setRequestStatus(res?.success ? "success" : "error");
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

      {/* Catalog */}
      <section className="py-16 sm:py-20 bg-vitem-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-vitem-200 group hover:shadow-lg transition-shadow duration-500 w-full max-w-sm"
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
                <div className="absolute inset-0 bg-vitem-950/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={CATALOG_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-white hover:text-vitem-300 transition-colors"
                  >
                    <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] tracking-widest uppercase">{t("view_btn")}</span>
                  </a>
                  <a
                    href={CATALOG_PDF}
                    download
                    className="flex flex-col items-center gap-2 text-white hover:text-vitem-300 transition-colors"
                  >
                    <div className="w-10 h-10 border border-white/30 flex items-center justify-center">
                      <Download className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] tracking-widest uppercase">{t("download_btn")}</span>
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-sm font-medium text-vitem-900 mb-1 leading-tight">{catalog.title}</h3>
                <p className="text-xs text-vitem-500 font-light leading-relaxed mb-4">{catalog.description}</p>
                <a
                  href={CATALOG_PDF}
                  download
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-vitem-600 hover:text-vitem-900 transition-colors border-b border-vitem-200 pb-1 w-fit"
                >
                  <Download className="w-3 h-3" />
                  PDF İndir
                </a>
              </div>
            </motion.article>
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-vitem-300 py-3 text-sm focus:outline-none focus:border-vitem-900 transition-colors resize-none"
                  />
                </div>
                {requestStatus === "error" && (
                  <p className="text-red-500 text-xs">Bir hata oluştu. Lütfen tekrar deneyin.</p>
                )}
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
