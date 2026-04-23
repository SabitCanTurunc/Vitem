"use client";
import { motion } from "framer-motion";
import Footer from "@/sections/Footer";

const projects = [
  { id: 1, name: "Villa Bosphorus", location: "Istanbul", year: "2025", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80" },
  { id: 2, name: "Aegean Retreat", location: "Bodrum", year: "2024", imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" },
  { id: 3, name: "Urban Minimalist", location: "Ankara", year: "2024", imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80" },
  { id: 4, name: "Heritage Estate", location: "Hatay", year: "2023", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4f?w=1200&q=80" },
];

export default function Projects() {
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
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight">
              Our Projects
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
                <div className="relative aspect-[4/3] overflow-hidden bg-vitem-200 mb-6">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-sans font-light text-vitem-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-vitem-500 font-light">{project.location}</p>
                  </div>
                  <span className="text-xs tracking-widest text-vitem-400">{project.year}</span>
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
