import React from "react";
import AdminSidebar from "./AdminSidebar";
import "../globals.css";
import { cookies } from "next/headers";
import { getAdminLang } from "./i18n";

export const metadata = {
  title: "Vitem Admin",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = getAdminLang(cookieStore.get("admin_lang")?.value);
  return (
    <html lang={lang}>
      <body className="bg-vitem-50 min-h-screen text-vitem-900 font-sans">
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />

          {/* Main Workspace */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 pt-20 lg:pt-10">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
