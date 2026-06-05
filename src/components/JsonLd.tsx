import React from "react";

interface JsonLdProps {
  /** Tek bir schema nesnesi veya birden fazla nesne dizisi */
  data: Record<string, unknown> | Record<string, unknown>[];
  /** Aynı sayfada birden fazla JsonLd kullanılırsa script id'sini ayrıştırmak için */
  id?: string;
}

/**
 * Schema.org yapısal verisini güvenli şekilde HTML <script> etiketi olarak gömer.
 * Server component — RSC ağacında doğrudan kullanılabilir.
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((node, idx) => (
        <script
          key={(id ?? "ld") + idx}
          type="application/ld+json"
          // JSON.stringify çıktısı </script> içeremez; yine de güvenlik için kapanış kaçışı uygulanır
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
