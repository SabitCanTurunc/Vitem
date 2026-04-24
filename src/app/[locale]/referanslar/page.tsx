"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import Footer from "@/sections/Footer";

const testimonials = [
  {
    id: 1,
    name: "Murat Karaoğlan",
    location: "Gaziantep / Altunkayagrup",
    rating: 5,
    text: "Başından sonuna kadar tüm detaylardan memnun kaldım. En önemlisi de en ufak bir sorunumuz bile hemen çözüldü.",
    project: "Mutfak Projesi",
  },
  {
    id: 2,
    name: "Mahmut Altunkaya",
    location: "Gaziantep / Altunkayagrup",
    rating: 5,
    text: "Kaliteli malzeme kullanımı ve işçilik açısından beklentilerimizin çok üzerinde bir hizmet aldık. Kesinlikle tavsiye ederim.",
    project: "Mutfak & Banyo",
  },
  {
    id: 3,
    name: "Ayşe Demir",
    location: "Hatay",
    rating: 5,
    text: "Tasarım aşamasından teslimata kadar profesyonel bir ekipti. Mutfağımız hem çok şık hem de son derece işlevsel oldu.",
    project: "Mutfak Projesi",
  },
  {
    id: 4,
    name: "Mehmet Yılmaz",
    location: "İstanbul",
    rating: 5,
    text: "Vitem ekibi vizyonumuzu tam olarak anladı ve hayallerimizin ötesinde bir sonuç ortaya koydu. Teşekkürler!",
    project: "Yaşam Alanları",
  },
  {
    id: 5,
    name: "Fatma Çelik",
    location: "Adana",
    rating: 5,
    text: "Fiyat performans oranı mükemmel. Üstelik montaj ekibi çok titizdi, her detaya özen gösterdiler.",
    project: "Banyo Projesi",
  },
  {
    id: 6,
    name: "Ali Kaya",
    location: "Ankara",
    rating: 5,
    text: "İkinci projemiz olmasına rağmen her seferinde aynı özen ve kaliteyi görüyoruz. Vitem ailesi olduk adeta.",
    project: "Mutfak Projesi",
  },
];

const brandPartners = [
  "Franke", "Siemens", "Smeg", "Bosch", "Neff", "Miele",
];

export default function ReferanslarPage() {
  const t = useTranslations("referanslar");

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

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 border-t border-vitem-100">
            {[
              { number: "10.000+", label: "Tamamlanan Proje" },
              { number: "%98", label: "Müşteri Memnuniyeti" },
              { number: "25+", label: "Yıl Deneyim" },
              { number: "5/5", label: "Ortalama Puan" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center sm:text-left"
              >
                <span className="block text-3xl font-sans font-light text-vitem-900">{stat.number}</span>
                <span className="mt-1 block text-xs tracking-[0.15em] uppercase text-vitem-500">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-vitem-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className="bg-white border border-vitem-200 p-8 flex flex-col"
              >
                <Quote className="w-8 h-8 text-vitem-200 mb-6 shrink-0" />
                <p className="text-sm text-vitem-700 leading-relaxed font-light flex-1 mb-6">
                  {item.text}
                </p>
                <div className="pt-4 border-t border-vitem-100">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-vitem-900">{item.name}</p>
                  <p className="text-xs text-vitem-400 mt-0.5">{item.location}</p>
                  <span className="mt-2 inline-block text-[10px] tracking-widest uppercase text-vitem-400 border border-vitem-200 px-2 py-0.5">
                    {item.project}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-16 sm:py-20 bg-white border-t border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-3">
              İş Birliklerimiz
            </span>
            <h2 className="text-2xl font-sans font-light text-vitem-900">
              Güvenilir Markalarla Çalışıyoruz
            </h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8">
            {brandPartners.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center justify-center py-6 border border-vitem-100 hover:border-vitem-300 transition-colors"
              >
                <span className="text-sm font-light tracking-widest text-vitem-500 uppercase">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
