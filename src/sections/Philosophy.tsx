"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Philosophy() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-vitem-100"
          >
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
              alt="Vitem craftsmanship"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              About Vitem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-light text-vitem-900 tracking-tight leading-tight">
              Where Anatolian Heritage Meets Contemporary Design
            </h2>
            <div className="mt-6 sm:mt-8 space-y-4 text-vitem-600 leading-relaxed">
              <p>
                Founded in the heart of Hatay, Vitem represents a new standard in luxury interior design and furniture manufacturing. We blend centuries of Anatolian craftsmanship with cutting-edge contemporary design to create spaces that are both timeless and modern.
              </p>
              <p>
                Every piece that leaves our workshop carries the imprint of meticulous attention to detail, from the selection of premium materials to the final hand-finished touches. We believe that true luxury lies in the harmony between form and function.
              </p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 mt-8 text-vitem-900 text-sm tracking-[0.15em] uppercase font-medium hover:gap-4 transition-all duration-300"
            >
              <span className="border-b border-vitem-400 pb-1 group-hover:border-vitem-900 transition-colors">
                Our Story
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
