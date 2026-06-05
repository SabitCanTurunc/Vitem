import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

/**
 * Bu kök layout yalnızca locale segmentine yönlendirme için bir kabuktur.
 * Tüm metadata ve <html> etiketi src/app/[locale]/layout.tsx içinde üretilir.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
