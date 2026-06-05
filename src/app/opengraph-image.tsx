import { ImageResponse } from "next/og";

/**
 * Vitem — Site geneli varsayılan OG görseli
 *
 * 1200x630 boyutunda, marka kimliğine uygun şekilde dinamik üretilir.
 * Sosyal medya paylaşımlarında kullanılır.
 */
export const runtime = "edge";
export const alt = "Vitem — Premium İç Mimari ve Mobilya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#9ca3af",
          }}
        >
          <span style={{ width: 40, height: 1, background: "#9ca3af" }} />
          Hatay, Türkiye
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 180,
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "white",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Vitem
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              fontWeight: 300,
              color: "#e5e7eb",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Premium İç Mimari ve Lüks Mobilya
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 24,
              color: "#9ca3af",
              fontWeight: 300,
            }}
          >
            Mutfak · Banyo · Gardırop · 1997'den bu yana
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: "1px solid #374151",
            fontSize: 22,
            color: "#9ca3af",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>vitem.com.tr</span>
          <span>3.500 m² · 80+ Uzman · 10.000+ Proje</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
