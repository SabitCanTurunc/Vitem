import "../globals.css";

export const metadata = {
  title: "Vitem Admin — Giriş",
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
