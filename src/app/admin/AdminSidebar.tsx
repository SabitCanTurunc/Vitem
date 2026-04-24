"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, FolderTree, Image as ImageIcon,
  Inbox, Megaphone, FolderOpen, Menu, X, ExternalLink, Globe,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { motion, AnimatePresence } from "framer-motion";

// ── Dil bağlamı ───────────────────────────────────────────────────
type Lang = "tr" | "en";
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "tr", setLang: () => {} });
export function useLang() { return useContext(LangCtx); }

// ── Çeviriler ─────────────────────────────────────────────────────
const labels: Record<string, Record<Lang, string>> = {
  dashboard:   { tr: "Gösterge Paneli", en: "Dashboard" },
  categories:  { tr: "Kategoriler",     en: "Categories" },
  products:    { tr: "Ürünler",         en: "Products" },
  hero:        { tr: "Hero Slaytları",  en: "Hero Slides" },
  campaigns:   { tr: "Kampanyalar",     en: "Campaigns" },
  projects:    { tr: "Projeler",        en: "Projects" },
  inbox:       { tr: "Gelen Kutusu",    en: "Inbox" },
  visit_site:  { tr: "Siteye Git",      en: "Visit Site" },
  logout:      { tr: "Çıkış Yap",       en: "Sign Out" },
  panel:       { tr: "Yönetim Paneli",  en: "Management Panel" },
};

const navigation = [
  { key: "dashboard",  href: "/admin",            icon: LayoutDashboard },
  { key: "categories", href: "/admin/categories", icon: FolderTree },
  { key: "products",   href: "/admin/products",   icon: ShoppingBag },
  { key: "hero",       href: "/admin/hero",        icon: ImageIcon },
  { key: "campaigns",  href: "/admin/campaigns",  icon: Megaphone },
  { key: "projects",   href: "/admin/projects",   icon: FolderOpen },
  { key: "inbox",      href: "/admin/inbox",      icon: Inbox },
];

// ── Sidebar içeriği ───────────────────────────────────────────────
function SidebarContent({ lang, setLang, onClose }: { lang: Lang; setLang: (l: Lang) => void; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Header — kapat (mobil) + logo */}
      <div className="px-5 py-4 border-b border-vitem-200 flex items-center justify-between gap-3">
        {/* Kapat — sadece mobil drawer'da */}
        {onClose ? (
          <button
            onClick={onClose}
            className="p-1.5 text-vitem-400 hover:text-vitem-900 transition-colors shrink-0"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-8 shrink-0" />
        )}

        {/* Logo — ortada */}
        <div className="flex-1 text-center">
          <span className="font-serif text-xl tracking-[0.2em] font-light text-vitem-900">VITEM</span>
          <span className="block text-[8px] tracking-widest text-vitem-500 mt-0.5 uppercase">{labels.panel[lang]}</span>
        </div>

        {/* Sağda boşluk eşitleme */}
        <div className="w-8 shrink-0" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && (pathname ?? "").startsWith(item.href));
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-sm ${
                isActive
                  ? "bg-vitem-900 text-white"
                  : "text-vitem-600 hover:text-vitem-900 hover:bg-vitem-50"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {labels[item.key][lang]}
            </Link>
          );
        })}
      </nav>

      {/* Footer — TR/EN + Siteye Git + Çıkış */}
      <div className="p-4 border-t border-vitem-200 space-y-0.5">
        {/* TR / EN dil seçici */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-vitem-500">
          <Globe className="w-4 h-4 shrink-0" />
          <span className="text-xs mr-1">{lang === "tr" ? "Dil" : "Language"}</span>
          <button
            onClick={() => setLang("tr")}
            className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${lang === "tr" ? "bg-vitem-900 text-white" : "hover:bg-vitem-100 text-vitem-500"}`}
          >TR</button>
          <button
            onClick={() => setLang("en")}
            className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${lang === "en" ? "bg-vitem-900 text-white" : "hover:bg-vitem-100 text-vitem-500"}`}
          >EN</button>
        </div>

        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-vitem-600 hover:text-vitem-900 hover:bg-vitem-50 transition-colors rounded-sm"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {labels.visit_site[lang]}
        </Link>
        <LogoutButton label={labels.logout[lang]} />
      </div>
    </div>
  );
}

// ── Ana bileşen ───────────────────────────────────────────────────
export default function AdminSidebar() {
  const [lang, setLang] = useState<Lang>("tr");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dil tercihini localStorage'da sakla
  useEffect(() => {
    const saved = localStorage.getItem("admin_lang") as Lang | null;
    if (saved === "tr" || saved === "en") setLang(saved);
  }, []);

  function handleSetLang(l: Lang) {
    setLang(l);
    localStorage.setItem("admin_lang", l);
  }

  return (
    <LangCtx.Provider value={{ lang, setLang: handleSetLang }}>
      {/* ── Desktop sidebar ──────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-vitem-200 flex-col shrink-0">
        <SidebarContent lang={lang} setLang={handleSetLang} />
      </aside>

      {/* ── Mobile: hamburger header ──────────────────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-vitem-200 flex items-center justify-between px-4 h-14">
        {/* Hamburger — solda */}
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-2 text-vitem-700 hover:text-vitem-900 transition-colors shrink-0"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" />
        </button>
        {/* Logo — sağda */}
        <span className="font-serif text-xl tracking-[0.2em] font-light text-vitem-900">VITEM</span>
      </header>

      {/* ── Mobile: drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl flex flex-col"
            >
              <SidebarContent lang={lang} setLang={handleSetLang} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LangCtx.Provider>
  );
}
