import "../globals.css";
import { cookies } from "next/headers";
import { getAdminLang } from "../admin/i18n";

export const metadata = {
  title: "Vitem Admin - Login",
};

export default async function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = getAdminLang(cookieStore.get("admin_lang")?.value);
  return (
    <html lang={lang}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
