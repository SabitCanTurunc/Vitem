"use client";
import { motion } from "framer-motion";
import Footer from "@/sections/Footer";

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] tracking-[0.25em] uppercase text-vitem-500 font-medium block mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-vitem-900 tracking-tight max-w-4xl">
              Crafting Exceptional Interiors Since 2008
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Image */}
      <section className="pb-16 sm:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="aspect-[21/9] overflow-hidden bg-vitem-100"
          >
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
              alt="Vitem workshop"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 sm:pb-28 lg:pb-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-vitem-900 tracking-tight mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-vitem-600 leading-relaxed">
                <p>
                  Vitem was founded in Hatay with a singular vision: to create interior spaces that honor the rich Anatolian tradition of craftsmanship while embracing contemporary design sensibilities. What began as a small workshop has grown into a respected name in premium interior design across Turkey and beyond.
                </p>
                <p>
                  Our team of skilled artisans and designers work in harmony to bring each project to life, ensuring that every detail — from the grain of the wood to the precision of the joinery — meets our exacting standards.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h2 className="text-2xl sm:text-3xl font-sans font-light text-vitem-900 tracking-tight mb-6">
                Our Philosophy
              </h2>
              <div className="space-y-4 text-vitem-600 leading-relaxed">
                <p>
                  We believe that your living space should be a reflection of who you are — your values, your aesthetic, your way of life. That is why we take a deeply personal approach to every project, working closely with our clients to understand their vision before we begin crafting.
                </p>
                <p>
                  Sustainability and quality are at the core of everything we do. We source our materials responsibly and employ techniques that ensure longevity, creating pieces that are not only beautiful but built to last for generations.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-vitem-200"
          >
            {[
              { number: "15+", label: "Years of Experience" },
              { number: "500+", label: "Projects Completed" },
              { number: "50+", label: "Artisan Team" },
              { number: "3", label: "Core Collections" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-3xl sm:text-4xl font-sans font-light text-vitem-900">
                  {stat.number}
                </span>
                <span className="mt-2 block text-xs tracking-[0.15em] uppercase text-vitem-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
