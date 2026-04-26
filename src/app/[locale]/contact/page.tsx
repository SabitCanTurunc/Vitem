"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Footer from "@/sections/Footer";
import { useState } from "react";
import { submitContactForm } from "@api/actions/contactActions";

export default function Contact() {
  const t = useTranslations("contact");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleAction(formData: FormData) {
    setFormStatus("submitting");
    const res = await submitContactForm(formData);
    if (res?.success) {
      setFormStatus("success");
    } else {
      setFormStatus("error");
    }
  }

  return (
    <main>
      {/* Header */}
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

      {/* Main Content */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 space-y-12"
            >
              <div>
                <h3 className="text-xl font-sans font-light text-vitem-900 mb-6 border-b border-vitem-200 pb-4">
                  {t("hq_title")}
                </h3>
                <div className="space-y-4 text-sm text-vitem-600">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 shrink-0 text-vitem-400" />
                    <span>Ürgen Paşa Mah. 75. Yıl Bulvarı<br />Antakya / Hatay</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="w-5 h-5 shrink-0 text-vitem-400" />
                    <a href="tel:+903262218801" className="hover:text-vitem-900 transition-colors">+90 326 221 88 01</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 shrink-0 text-vitem-400" />
                    <a href="mailto:info@vitem.com.tr" className="hover:text-vitem-900 transition-colors">info@vitem.com.tr</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-sans font-light text-vitem-900 mb-6 border-b border-vitem-200 pb-4">
                  {t("hours_title")}
                </h3>
                <div className="space-y-3 text-sm text-vitem-600">
                  <div className="flex justify-between">
                    <span className="font-medium text-vitem-800">{t("weekdays")}</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-vitem-800">{t("saturday")}</span>
                    <span>09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-vitem-800">{t("sunday")}</span>
                    <span className="text-vitem-400">{t("closed")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 bg-vitem-50 p-8 sm:p-12 lg:p-16 border border-vitem-200"
            >
              <h2 className="text-3xl font-serif font-light text-vitem-900 mb-8">{t("form_title")}</h2>

              {formStatus === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mb-2" />
                  <h3 className="text-2xl font-serif text-vitem-900">{t("success_title")}</h3>
                  <p className="text-vitem-600">{t("success_desc")}</p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-8 text-xs tracking-widest uppercase border-b border-vitem-300 pb-1 hover:border-vitem-900 transition-colors"
                  >
                    {t("send_another")}
                  </button>
                </div>
              ) : (
                <form action={handleAction} className="space-y-8">
                  <input type="hidden" name="formType" value="contact" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-vitem-500">
                        {t("label_name")}
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-vitem-500">
                        {t("label_email")}
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-vitem-500">
                      {t("label_phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest text-vitem-500">
                      {t("label_message")}
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full bg-transparent border-b border-vitem-300 py-3 focus:outline-none focus:border-vitem-900 transition-colors resize-none"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-red-500 text-sm">{t("error")}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="bg-vitem-900 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-vitem-800 transition-colors disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? t("submitting") : t("submit")}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
