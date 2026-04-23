import React from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, FolderTree, Image as ImageIcon, Inbox, LogOut } from "lucide-react";
import "../globals.css"; // Ensure admin gets global styles

export const metadata = {
  title: "Vitem Admin",
};

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Hero Settings", href: "/admin/hero", icon: ImageIcon },
  { name: "Inbox", href: "/admin/inbox", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-vitem-100 min-h-screen text-vitem-900 font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-vitem-200 flex flex-col">
            <div className="p-6 border-b border-vitem-200">
              <span className="font-serif text-2xl tracking-[0.2em] font-light">VITEM</span>
              <span className="block text-[9px] tracking-widest text-vitem-500 mt-1 uppercase">Management Panel</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-vitem-600 hover:text-vitem-900 hover:bg-vitem-50 transition-colors"
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-vitem-200">
              <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4 shrink-0" />
                Exit Admin
              </a>
            </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-1 overflow-y-auto p-8 sm:p-12">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
