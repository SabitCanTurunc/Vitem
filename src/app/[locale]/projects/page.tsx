"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Footer from "@/sections/Footer";

const projects = [
  { id: 1, slug: "villa-bosphorus", name: "Villa Bosphorus", location: "İstanbul", year: "2025", category: "Mutfak & Yaşam Alanları", imageUrl: "/images/hero-fallback-1.jpg" },
  { id: 2, slug: "aegean-retreat", name: "Aegean Retreat", location: "Bodrum", year: "2024", category: "Mutfak & Banyo", imageUrl: "/images/hero-fallback-2.jpg" },
  { id: 3, slug: "urban-minimalist", name: "Urban Minimalist", location: "Ankara", year: "2024", category: "Mutfak", imageUrl: "/images/interior.jpg" },
  { id: 4, slug: "heritage-estate", name: "Heritage Estate", location: "Hatay", year: "2023", category: "Mutfak & Banyo & Yaşam", imageUrl: "/images/magazine-2.jpg" },
];

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <main>
      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-16 bg-white border-b border-vitem-100">
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
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-vitem-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index % 2 === 0 ? 0 : 0.2 }}
                className="group cursor-pointer"
              >
                <Link href={`/projects/${project.slug}` as any}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-vitem-200 mb-6">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-&lsqb;1500ms&rsqb; group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="flex items-center gap-2 bg-white text-vitem-900 text-xs uppercase tracking-widest px-5 py-3">
                        {t("view_project")} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-sans font-light text-vitem-900 mb-1 group-hover:text-vitem-600 transition-colors">{project.name}</h3>
                      <p className="text-sm text-vitem-500 font-light">{project.location}</p>
                      <p className="text-xs text-vitem-400 font-light mt-1 tracking-wide">{project.category}</p>
                    </div>
                    <span className="text-xs tracking-widest text-vitem-400">{project.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
