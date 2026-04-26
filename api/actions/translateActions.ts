"use server";

// MyMemory ücretsiz çeviri API'si — kayıt gerektirmez
export async function translateText(
  text: string,
  from: string = "tr",
  to: string = "en",
): Promise<{ translated: string; error?: string }> {
  if (!text?.trim()) {
    return { translated: "" };
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    const translated: string = data?.responseData?.translatedText ?? "";
    return { translated };
  } catch {
    return { translated: "", error: "Çeviri başarısız" };
  }
}
