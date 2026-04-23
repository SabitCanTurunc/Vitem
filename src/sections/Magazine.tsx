"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Art of Selecting Fine Woods",
    date: "October 12, 2026",
    category: "Materials",
    imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80",
    slug: "selecting-fine-woods"
  },
  {
    id: 2,
    title: "Minimalism in Modern Kitchen Design",
    date: "September 28, 2026",
    category: "Trends",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4f?w=800&q=80",
    slug: "minimalism-kitchen-design"
  },
  {
    id: 3,
    title: "Global Exhibitions: Vitem in Milan",
    date: "September 15, 2026",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80",
    slug: "vitem-in-milan"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Magazine() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-vitem-500 font-medium block mb-4">
              Journal
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-light text-vitem-900 tracking-tight">
              The Vitem Magazine
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/magazine"
              className="group inline-flex items-center gap-3 text-vitem-900 text-xs tracking-[0.15em] uppercase font-medium hover:gap-4 transition-all duration-300"
            >
              <span className="border-b border-vitem-400 pb-1 group-hover:border-vitem-900 transition-colors">
                View All Articles
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Article Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {articles.map((article) => (
            <motion.article key={article.id} variants={itemVariants} className="group cursor-pointer">
              <Link href={`/magazine/${article.slug}`} className="block block">
                <div className="relative aspect-[4/3] overflow-hidden bg-vitem-100 mb-6">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-vitem-500 mb-3">
                  <span>{article.category}</span>
                  <span className="w-4 h-[1px] bg-vitem-300"></span>
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-serif font-light text-vitem-900 leading-snug group-hover:text-vitem-500 transition-colors duration-300">
                  {article.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
