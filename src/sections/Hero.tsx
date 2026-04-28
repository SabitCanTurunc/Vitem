"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface HeroSlideDisplay {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkText: string;
  linkHref: string;
}

export default function Hero({ slides }: { slides: HeroSlideDisplay[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations("hero_fallback");
  const tCommon = useTranslations("common");

  const heroSlides = slides.length > 0 ? slides : [
    {
      id: -1,
      title: t("s1_title"),
      subtitle: t("s1_subtitle"),
      imageUrl: "/images/hero-fallback-1.jpg",
      linkText: t("s1_link"),
      linkHref: "/collections",
    },
    {
      id: -2,
      title: t("s2_title"),
      subtitle: t("s2_subtitle"),
      imageUrl: "/images/hero-fallback-2.jpg",
      linkText: t("s2_link"),
      linkHref: "/collections",
    },
  ];

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlide];

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.0 }}
          animate={{ opacity: 1, scale: 1.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute inset-0"
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-extralight text-white leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.title}
            </motion.h1>

            <motion.p
              className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/70 font-light max-w-xl leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 sm:mt-8"
            >
              <Link
                href={slide.linkHref as any}
                className="group inline-flex items-center gap-3 text-white text-sm tracking-[0.15em] uppercase font-medium hover:gap-4 transition-all duration-300"
              >
                <span className="border-b border-white/60 pb-1 group-hover:border-white transition-colors">
                  {slide.linkText}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-6 lg:right-8 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-0.5 transition-all duration-500 ${
                  i === currentSlide ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={tCommon("slide_n", { n: i + 1 })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label={tCommon("scroll_down")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
