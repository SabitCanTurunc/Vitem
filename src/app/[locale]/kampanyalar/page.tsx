import { getActiveCampaigns } from "../../../../api/queries/products";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Tag, Package } from "lucide-react";

export default async function KampanyalarPage() {
  const [currentCampaigns, exhibitionCampaigns, locale] = await Promise.all([
    getActiveCampaigns("current"),
    getActiveCampaigns("exhibition"),
    getLocale(),
  ]);

  const previewCurrent = currentCampaigns.slice(0, 2);
  const previewExhibition = exhibitionCampaigns.slice(0, 2);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 bg-vitem-50 border-b border-vitem-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-vitem-400 mb-4">
            {locale === "en" ? "Home / Campaigns" : "Ana Sayfa / Kampanyalar"}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vitem-900 tracking-tight mb-6">
            {locale === "en" ? "Campaigns" : "Kampanyalar"}
          </h1>
          <p className="text-vitem-600 font-light max-w-xl leading-relaxed">
            {locale === "en"
              ? "Explore our current discount campaigns and exhibition products with special prices."
              : "Güncel indirim kampanyalarımızı ve özel fiyatlı teşhir ürünlerimizi keşfedin."}
          </p>
        </div>
      </section>

      {/* Two Category Cards */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Güncel Kampanyalar */}
            <div className="group border border-vitem-100 overflow-hidden hover:border-vitem-300 hover:shadow-md transition-all duration-300">
              {/* Preview Images */}
              {previewCurrent.length > 0 ? (
                <div className="grid grid-cols-2 gap-0 aspect-[2/1] overflow-hidden">
                  {previewCurrent.map((c, i) => (
                    <div key={i} className="relative overflow-hidden bg-vitem-100">
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={locale === "en" && c.titleEn ? c.titleEn : c.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-vitem-200" />
                      )}
                    </div>
                  ))}
                  {previewCurrent.length === 1 && <div className="bg-vitem-100" />}
                </div>
              ) : (
                <div className="aspect-[2/1] bg-vitem-100 flex items-center justify-center">
                  <Tag className="w-12 h-12 text-vitem-300" />
                </div>
              )}

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-light text-vitem-900 mb-2">
                      {locale === "en" ? "Current Campaigns" : "Güncel Kampanyalar"}
                    </h2>
                    <p className="text-sm text-vitem-500 font-light">
                      {currentCampaigns.length}{" "}
                      {locale === "en" ? "active campaign" : "aktif kampanya"}
                    </p>
                  </div>
                  <Tag className="w-5 h-5 text-vitem-400 mt-1" />
                </div>
                <p className="text-sm text-vitem-600 font-light leading-relaxed mb-6">
                  {locale === "en"
                    ? "Seasonal discounts and limited-time special offers on kitchen, bathroom and living space products."
                    : "Mutfak, banyo ve yaşam alanı ürünlerinde sezonluk indirimler ve sınırlı süreli özel fırsatlar."}
                </p>
                <Link
                  href="/kampanyalar/guncel"
                  className="inline-flex items-center gap-2 bg-vitem-900 text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-vitem-700 transition-colors"
                >
                  {locale === "en" ? "View All" : "Tümünü Gör"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Teşhir Ürünleri */}
            <div className="group border border-vitem-100 overflow-hidden hover:border-vitem-300 hover:shadow-md transition-all duration-300">
              {previewExhibition.length > 0 ? (
                <div className="grid grid-cols-2 gap-0 aspect-[2/1] overflow-hidden">
                  {previewExhibition.map((c, i) => (
                    <div key={i} className="relative overflow-hidden bg-vitem-100">
                      {c.imageUrl ? (
                        <Image
                          src={c.imageUrl}
                          alt={locale === "en" && c.titleEn ? c.titleEn : c.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-vitem-200" />
                      )}
                    </div>
                  ))}
                  {previewExhibition.length === 1 && <div className="bg-vitem-100" />}
                </div>
              ) : (
                <div className="aspect-[2/1] bg-vitem-100 flex items-center justify-center">
                  <Package className="w-12 h-12 text-vitem-300" />
                </div>
              )}

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-light text-vitem-900 mb-2">
                      {locale === "en" ? "Exhibition Products" : "Teşhir Ürünleri"}
                    </h2>
                    <p className="text-sm text-vitem-500 font-light">
                      {exhibitionCampaigns.length}{" "}
                      {locale === "en" ? "product listed" : "ürün listelendi"}
                    </p>
                  </div>
                  <Package className="w-5 h-5 text-vitem-400 mt-1" />
                </div>
                <p className="text-sm text-vitem-600 font-light leading-relaxed mb-6">
                  {locale === "en"
                    ? "Showroom display products removed from stock, available at special prices with free delivery and installation."
                    : "Mağazalarımızdan kaldırılan teşhir ürünleri, ücretsiz nakliye ve montaj dahil özel fiyatlarla satışa sunulmaktadır."}
                </p>
                <Link
                  href="/kampanyalar/teshir"
                  className="inline-flex items-center gap-2 bg-vitem-900 text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-vitem-700 transition-colors"
                >
                  {locale === "en" ? "View All" : "Tümünü Gör"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
