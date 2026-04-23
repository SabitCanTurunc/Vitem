"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Craftsmanship() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[80vh] sm:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-vitem-950"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img
          src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1920&q=80"
          alt="Vitem Craftsmanship"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 lg:p-16"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-medium block mb-4">
            The Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-wide leading-[1.15] mb-6">
            Mastery in Every Detail
          </h2>
          <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed mb-10">
            Our commitment to excellence begins long before the final piece is assembled. We source only the finest raw materials, blending cutting-edge precision technology with generations of artisanal expertise from Hatay. Every curve, joint, and surface is meticulously inspected to ensure absolute perfection.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-white text-xs tracking-[0.15em] uppercase font-medium hover:gap-4 transition-all duration-300"
          >
            <span className="border-b border-white/50 pb-1 group-hover:border-white transition-colors">
              Explore Our Factory
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
