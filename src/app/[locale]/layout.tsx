import React from "react";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import "../globals.css";

export const metadata = {
  title: "Vitem - Lüks Mobilya ve Tasarım",
  description: "Hatay'ın ustalığıyla dünya için tasarlanan lüks mutfak, kapı ve gardırop sistemleri.",
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
