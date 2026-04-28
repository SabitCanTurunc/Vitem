"use client";
import { useState, useEffect, useRef } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Phone, Mail, MapPin, ChevronDown } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

function DropdownMenu({
  items,
  isOpen,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-white border border-vitem-100 shadow-lg z-50"
        >
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href as any}
              className="block px-5 py-3 text-[10px] tracking-[0.2em] uppercase text-vitem-700 hover:bg-vitem-50 hover:text-vitem-900 transition-colors whitespace-nowrap"
            >
              {child.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavItemEl({ item, activeLocale: _activeLocale }: { item: NavItem; activeLocale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (item.children) {
    return (
      <div ref={ref} className="relative">
        <button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-vitem-800 hover:text-vitem-500 transition-colors duration-300 font-medium"
        >
          {item.label}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <DropdownMenu items={item.children} isOpen={open} />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href as any}
      className="text-[10px] tracking-[0.25em] uppercase text-vitem-800 hover:text-vitem-500 transition-colors duration-300 font-medium"
    >
      {item.label}
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const pathname = usePathname();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const activeLocale = useLocale();

  const leftNavItems: NavItem[] = [
    {
      label: t("collections"),
      href: "/collections",
      children: [
        { label: t("cat_mutfak"), href: "/collections/mutfak" },
        { label: t("cat_banyo"), href: "/collections/banyo" },
        { label: t("cat_ankastre"), href: "/collections/ankastre" },
        { label: t("cat_yasam"), href: "/collections/yasam-alanlari" },
      ],
    },
    { label: t("about"), href: "/about" },
    { label: t("farkimiz"), href: "/farkimiz" },
  ];

  const rightNavItems: NavItem[] = [
    {
      label: t("kampanyalar"),
      href: "/kampanyalar",
      children: [
        { label: t("guncel_kampanyalar"), href: "/kampanyalar/guncel" },
        { label: t("teshir_urunleri"), href: "/kampanyalar/teshir" },
      ],
    },
    { label: t("referanslar"), href: "/referanslar" },
    { label: t("katalog"), href: "/katalog" },
    { label: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const isHome = pathname === "/";
  const navBg =
    isScrolled || !isHome
      ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-vitem-200/50"
      : "bg-transparent";

  const allMobileItems = [...leftNavItems, ...rightNavItems];

  return (
    <>
      {/* Top Utility Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHome
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="bg-vitem-950 text-vitem-100 text-[11px] tracking-widest uppercase">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="hidden sm:flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {t("hatay_turkey")}
              </span>
              <a
                href="tel:+903262218801"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3" />
                {tCommon("phone")}
              </a>
            </div>
            <a
              href="mailto:info@vitem.com.tr"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3" />
              {tCommon("email")}
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
            {/* Left Navigation — Desktop */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {leftNavItems.map((item) => (
                <NavItemEl key={item.href} item={item} activeLocale={activeLocale} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-vitem-800 hover:text-vitem-950 transition-colors"
              aria-label={t("toggle_menu")}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo — Centered */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase font-light text-vitem-900 leading-none group-hover:text-vitem-600 transition-colors duration-500">
                Vitem
              </span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-vitem-400 mt-1.5 hidden sm:block">
                {t("interior_design")}
              </span>
            </Link>

            {/* Right Navigation — Desktop */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {rightNavItems.map((item) => (
                <NavItemEl key={item.href} item={item} activeLocale={activeLocale} />
              ))}

              {/* Language Switcher */}
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-medium text-vitem-500">
                <Link
                  href={pathname}
                  locale="tr"
                  className={`transition-colors ${
                    activeLocale === "tr"
                      ? "text-vitem-900 pointer-events-none"
                      : "hover:text-vitem-900"
                  }`}
                >
                  TR
                </Link>
                <span className="text-vitem-300 font-light">|</span>
                <Link
                  href={pathname}
                  locale="en"
                  className={`transition-colors ${
                    activeLocale === "en"
                      ? "text-vitem-900 pointer-events-none"
                      : "hover:text-vitem-900"
                  }`}
                >
                  EN
                </Link>
              </div>

              <button
                className="p-1.5 text-vitem-600 hover:text-vitem-900 transition-colors"
                aria-label={t("search")}
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Search */}
            <button
              className="lg:hidden p-2 -mr-2 text-vitem-600 hover:text-vitem-900 transition-colors"
              aria-label={t("search")}
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
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="flex flex-col min-h-full px-6 py-8">
              {/* Close */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-2xl tracking-[0.25em] text-vitem-900">Vitem</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-vitem-800"
                  aria-label={t("close_menu")}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex flex-col divide-y divide-vitem-100">
                {allMobileItems.map((item) => (
                  <div key={item.href}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.href ? null : item.href
                            )
                          }
                          className="flex items-center justify-between w-full py-4 text-left text-lg font-light tracking-wide text-vitem-900"
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 text-vitem-400 transition-transform duration-200 ${
                              mobileExpanded === item.href ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.href && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pl-4 flex flex-col gap-3">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href as any}
                                    className="text-sm text-vitem-600 hover:text-vitem-900 transition-colors tracking-wide"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href as any}
                        className="block py-4 text-lg font-light tracking-wide text-vitem-900 hover:text-vitem-500 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Bottom */}
              <div className="mt-auto pt-8 space-y-6">
                {/* Language Switcher */}
                <div className="flex items-center gap-4 text-sm tracking-widest font-medium text-vitem-500">
                  <Link
                    href={pathname}
                    locale="tr"
                    className={`transition-colors ${
                      activeLocale === "tr" ? "text-vitem-900 pointer-events-none" : "hover:text-vitem-900"
                    }`}
                  >
                    {t("lang_tr")}
                  </Link>
                  <span className="text-vitem-300">/</span>
                  <Link
                    href={pathname}
                    locale="en"
                    className={`transition-colors ${
                      activeLocale === "en" ? "text-vitem-900 pointer-events-none" : "hover:text-vitem-900"
                    }`}
                  >
                    {t("lang_en")}
                  </Link>
                </div>
                <div className="text-sm text-vitem-400 space-y-1.5">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {t("hatay_turkey")}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> {tCommon("phone")}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> {tCommon("email")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
