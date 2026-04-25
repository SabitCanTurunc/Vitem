import React from "react";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Navbar from "@/components/Navbar";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export const metadata = {
  title: "Vitem - Lüks Mobilya ve Tasarım",
  description: "Hatay'ın ustalığıyla dünya için tasarlanan lüks mutfak, kapı ve gardırop sistemleri.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="min-h-screen">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
