import { getActiveCampaigns } from "@api/queries/products";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Tag, Package } from "lucide-react";

export default async function KampanyalarPage() {
  const [currentCampaigns, exhibitionCampaigns, locale, t, tCommon] = await Promise.all([
    getActiveCampaigns("current"),
    getActiveCampaigns("exhibition"),
    getLocale(),
    getTranslations("kampanyalar"),
    getTranslations("common"),
  ]);

  const previewCurrent = currentCampaigns.slice(0, 2);
  const previewExhibition = exhibitionCampaigns.slice(0, 2);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 bg-vitem-50 border-b border-vitem-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-vitem-400 mb-4">
            {tCommon("home")} / {t("title")}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vitem-900 tracking-tight mb-6">
            {t("title")}
          </h1>
          <p className="text-vitem-600 font-light max-w-xl leading-relaxed">
            {t("page_description")}
          </p>
        </div>
      </section>

      {/* Two Category Cards */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Güncel Kampanyalar */}
            <div className="group border border-vitem-100 overflow-hidden hover:border-vitem-300 hover:shadow-md transition-all duration-300">
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
                      {t("current_title")}
                    </h2>
                    <p className="text-sm text-vitem-500 font-light">
                      {t(currentCampaigns.length === 1 ? "active_count_one" : "active_count_other", { count: currentCampaigns.length })}
                    </p>
                  </div>
                  <Tag className="w-5 h-5 text-vitem-400 mt-1" />
                </div>
                <p className="text-sm text-vitem-600 font-light leading-relaxed mb-6">
                  {t("current_card_desc")}
                </p>
                <Link
                  href="/kampanyalar/guncel"
                  className="inline-flex items-center gap-2 bg-vitem-900 text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-vitem-700 transition-colors"
                >
                  {t("view_all")}
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
                      {t("exhibition_title")}
                    </h2>
                    <p className="text-sm text-vitem-500 font-light">
                      {t(exhibitionCampaigns.length === 1 ? "exhibition_count_one" : "exhibition_count_other", { count: exhibitionCampaigns.length })}
                    </p>
                  </div>
                  <Package className="w-5 h-5 text-vitem-400 mt-1" />
                </div>
                <p className="text-sm text-vitem-600 font-light leading-relaxed mb-6">
                  {t("exhibition_card_desc")}
                </p>
                <Link
                  href="/kampanyalar/teshir"
                  className="inline-flex items-center gap-2 bg-vitem-900 text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-vitem-700 transition-colors"
                >
                  {t("view_all")}
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
