"use client";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Footer from "@/sections/Footer";

const projectImages: Record<string, string[]> = {
  "villa-bosphorus": [
    "/images/hero-fallback-1.jpg",
    "/images/kitchen.jpg",
    "/images/bathroom.jpg",
    "/images/interior.jpg",
  ],
  "aegean-retreat": [
    "/images/hero-fallback-2.jpg",
    "/images/kitchen.jpg",
    "/images/bathroom.jpg",
  ],
  "urban-minimalist": [
    "/images/interior.jpg",
    "/images/kitchen.jpg",
  ],
  "heritage-estate": [
    "/images/magazine-2.jpg",
    "/images/interior.jpg",
    "/images/kitchen.jpg",
    "/images/bathroom.jpg",
  ],
};

const projectScopes: Record<string, number> = {
  "villa-bosphorus": 4,
  "aegean-retreat": 3,
  "urban-minimalist": 3,
  "heritage-estate": 5,
};

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("projects");
  const tItems = useTranslations("projects.items");

  const images = projectImages[slug];
  const scopeCount = projectScopes[slug];

  if (!images || !scopeCount) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-vitem-600">{t("not_found")}</p>
        <Link href="/projects" className="mt-4 text-xs uppercase tracking-widest border-b border-vitem-300 pb-1">
          {t("back_to_projects")}
        </Link>
      </main>
    );
  }

  const project = {
    name: tItems(`${slug}.name`),
    location: tItems(`${slug}.location`),
    year: tItems(`${slug}.year`),
    category: tItems(`${slug}.category`),
    description: tItems(`${slug}.description`),
    scope: Array.from({ length: scopeCount }, (_, i) => tItems(`${slug}.scope_${i + 1}`)),
    images,
  };

  const [hero, ...rest] = project.images;

  return (
    <main>
      <section className="relative h-[60vh] sm:h-[75vh] overflow-hidden">
        <motion.div initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <img src={hero} alt={project.name} className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <Link href="/projects" className="flex items-center gap-2 text-white/80 hover:text-white text-xs uppercase tracking-widest mb-6 transition-colors w-fit">
                <ArrowLeft className="w-3.5 h-3.5" /> {t("all_projects")}
              </Link>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-white tracking-tight">{project.name}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-b border-vitem-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-4 space-y-8">
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-vitem-600"><MapPin className="w-4 h-4 text-vitem-400 shrink-0" /><span>{project.location}</span></div>
                <div className="flex items-center gap-3 text-vitem-600"><Calendar className="w-4 h-4 text-vitem-400 shrink-0" /><span>{project.year}</span></div>
                <div className="flex items-center gap-3 text-vitem-600"><Tag className="w-4 h-4 text-vitem-400 shrink-0" /><span>{project.category}</span></div>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-vitem-500 mb-4">{t("scope_title")}</h3>
                <ul className="space-y-2">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-vitem-700 font-light">
                      <span className="mt-2 w-1 h-1 bg-vitem-400 rounded-full shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-8">
              <p className="text-lg sm:text-xl font-light text-vitem-700 leading-relaxed">{project.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="py-16 sm:py-20 bg-vitem-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
              <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium">{t("gallery")}</span>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((img, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`overflow-hidden bg-vitem-200 ${index === 0 && rest.length >= 3 ? "sm:col-span-2 lg:col-span-2" : ""}`}>
                  <img src={img} alt={`${project.name} - ${index + 2}`} className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 sm:py-20 bg-vitem-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white mb-6">{t("cta_title")}</h2>
            <p className="text-sm text-vitem-400 font-light mb-8 max-w-xl mx-auto leading-relaxed">{t("cta_desc")}</p>
            <Link href="/contact" className="inline-block bg-white text-vitem-900 px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-vitem-100 transition-colors">{t("cta_button")}</Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
