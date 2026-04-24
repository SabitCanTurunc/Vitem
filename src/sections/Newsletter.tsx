"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-vitem-50 py-20 sm:py-28 border-t border-vitem-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-serif font-light text-vitem-900 mb-4">
            {t("title")}
          </h3>
          <p className="text-vitem-500 text-sm mb-8 font-light leading-relaxed">
            {t("desc")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="relative group flex items-center border-b border-vitem-400 focus-within:border-vitem-900 transition-colors duration-300"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              disabled={status === "submitting" || status === "success"}
              className="w-full bg-transparent border-none outline-none py-3 pl-2 pr-12 text-vitem-900 placeholder:text-vitem-400 text-sm font-light disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="absolute right-0 p-2 text-vitem-400 group-focus-within:text-vitem-900 hover:text-vitem-900 transition-colors disabled:opacity-50"
              aria-label="Subscribe"
            >
              {status === "success" ? (
                <span className="text-xs uppercase tracking-widest font-medium text-green-600">
                  {t("done")}
                </span>
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </form>
          <p className="text-[10px] text-vitem-400 mt-4 text-left">
            {t("privacy")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
