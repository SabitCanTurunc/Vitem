import { NextRequest, NextResponse } from "next/server";

// Edge runtime: Vercel Hobby plandaki 12 Serverless Function limitine dahil edilmez
export const runtime = "edge";

// MyMemory free translation API — kayıt gerektirmez
export async function POST(req: NextRequest) {
  try {
    const { text, from = "tr", to = "en" } = await req.json();
    if (!text?.trim()) return NextResponse.json({ translated: "" });

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    const data = await res.json();

    const translated: string = data?.responseData?.translatedText ?? "";
    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ error: "Çeviri başarısız" }, { status: 500 });
  }
}
