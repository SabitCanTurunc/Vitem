"use client";
import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Phone, Mail, MapPin } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const t = useTranslations('nav');
  const activeLocale = useLocale();

  const leftNavItems = [
    { label: t('collections'), href: "/collections" },
    { label: t('about'), href: "/about" },
  ];

  const rightNavItems = [
    { label: t('projects'), href: "/projects" },
    { label: t('contact'), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const navBg = isScrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-vitem-200/50"
    : isHome
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md shadow-sm border-b border-vitem-200/50";

  return (
    <>
      {/* Top Utility Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        } ${isHome ? "" : "hidden"}`}
      >
        <div className="bg-vitem-950 text-vitem-100 text-[11px] tracking-widest uppercase">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="hidden sm:flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {t('hatay_turkey')}
              </span>
              <a href="tel:+903261234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                +90 326 123 45 67
              </a>
            </div>
            <a href="mailto:info@vitem.com.tr" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3 h-3" />
              info@vitem.com.tr
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          isHome && !isScrolled ? "top-8" : "top-0"
        } ${navBg}`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {leftNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as any}
                  className="text-[10px] tracking-[0.25em] uppercase text-vitem-800 hover:text-vitem-500 transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-vitem-800 hover:text-vitem-950 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo - Centered */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase font-light text-vitem-900 leading-none group-hover:text-vitem-600 transition-colors duration-500">
                Vitem
              </span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-vitem-400 mt-1.5 hidden sm:block">
                {t('interior_design')}
              </span>
            </Link>

            {/* Right Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {rightNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as any}
                  className="text-[10px] tracking-[0.25em] uppercase text-vitem-800 hover:text-vitem-500 transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}

              {/* Language Switcher Desktop */}
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-medium text-vitem-500">
                <Link href={pathname} locale="tr" className={`transition-colors ${activeLocale === 'tr' ? 'text-vitem-900 pointer-events-none' : 'hover:text-vitem-900'}`}>TR</Link>
                <span className="text-vitem-300 font-light">|</span>
                <Link href={pathname} locale="en" className={`transition-colors ${activeLocale === 'en' ? 'text-vitem-900 pointer-events-none' : 'hover:text-vitem-900'}`}>EN</Link>
              </div>

              <button
                className="p-1.5 text-vitem-600 hover:text-vitem-900 transition-colors"
                aria-label={t('search')}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Search */}
            <button
              className="lg:hidden p-2 -mr-2 text-vitem-600 hover:text-vitem-900 transition-colors"
              aria-label={t('search')}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex flex-col h-full px-6 py-20">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-vitem-800"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              <nav className="flex flex-col gap-6 mt-8">
                {[...leftNavItems, ...rightNavItems].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      href={item.href as any}
                      className="text-2xl font-light tracking-wide text-vitem-900 hover:text-vitem-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                {/* Language Switcher Mobile */}
                <div className="flex items-center gap-4 mb-6 text-sm tracking-widest font-medium text-vitem-500 border-b border-vitem-200 pb-6 w-1/2">
                  <Link href={pathname} locale="tr" className={`transition-colors ${activeLocale === 'tr' ? 'text-vitem-900 pointer-events-none' : 'hover:text-vitem-900'}`}>TR</Link>
                  <span className="text-vitem-300 font-light">/</span>
                  <Link href={pathname} locale="en" className={`transition-colors ${activeLocale === 'en' ? 'text-vitem-900 pointer-events-none' : 'hover:text-vitem-900'}`}>EN</Link>
                </div>

                <div className="text-sm text-vitem-500 space-y-2">
                  <p>{t('hatay_turkey')}</p>
                  <p>+90 326 123 45 67</p>
                  <p>info@vitem.com.tr</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
