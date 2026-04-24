import { getActiveCampaigns } from "../../../../../api/queries/products";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Tag, Calendar, ArrowRight } from "lucide-react";

export default async function GuncelKampanyalarPage() {
  const [campaigns, t, locale] = await Promise.all([
    getActiveCampaigns("current"),
    getTranslations("kampanyalar"),
    getLocale(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 bg-vitem-50 border-b border-vitem-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-vitem-400 mb-4">
            <Link href="/kampanyalar" className="hover:text-vitem-700 transition-colors">
              Kampanyalar
            </Link>
            {" / "}
            <span className="text-vitem-700">Güncel Kampanyalar</span>
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vitem-900 tracking-tight mb-6">
            Güncel Kampanyalar
          </h1>
          <p className="text-vitem-600 font-light max-w-xl leading-relaxed">
            Vitem&apos;in özel kampanya ve indirim fırsatlarından haberdar olun. Sınırlı süreli tekliflerimizi kaçırmayın.
          </p>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {campaigns.length === 0 ? (
            <div className="text-center py-20 text-vitem-400">
              <p className="text-lg font-light">Şu anda aktif kampanya bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign) => {
                const title = locale === "en" && campaign.titleEn ? campaign.titleEn : campaign.title;
                const description = locale === "en" && campaign.descriptionEn ? campaign.descriptionEn : campaign.description;

                return (
                  <article
                    key={campaign.id}
                    className="group bg-white border border-vitem-100 hover:border-vitem-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-vitem-100">
                      {campaign.imageUrl ? (
                        <Image
                          src={campaign.imageUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-vitem-200 flex items-center justify-center">
                          <Tag className="w-12 h-12 text-vitem-400" />
                        </div>
                      )}
                      {campaign.badge && (
                        <span className="absolute top-4 left-4 bg-vitem-900 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                          {campaign.badge}
                        </span>
                      )}
                      {campaign.discount && (
                        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          %{campaign.discount}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-serif text-xl font-light text-vitem-900 mb-3 tracking-tight">
                        {title}
                      </h2>
                      {description && (
                        <p className="text-sm text-vitem-600 font-light leading-relaxed mb-4 flex-1 line-clamp-3">
                          {description}
                        </p>
                      )}

                      {/* Prices */}
                      {(campaign.originalPrice || campaign.discountedPrice) && (
                        <div className="flex items-center gap-4 mb-4 pt-4 border-t border-vitem-100">
                          {campaign.originalPrice && (
                            <span className="text-sm text-vitem-400 line-through">
                              {campaign.originalPrice}
                            </span>
                          )}
                          {campaign.discountedPrice && (
                            <span className="text-base font-medium text-vitem-900">
                              {campaign.discountedPrice}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Valid Until */}
                      {campaign.validUntil && (
                        <div className="flex items-center gap-2 text-xs text-vitem-500 mb-4">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{campaign.validUntil} tarihine kadar geçerlidir</span>
                        </div>
                      )}

                      <Link
                        href={`/kampanyalar/${campaign.slug}` as any}
                        className="mt-auto flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-vitem-700 hover:text-vitem-900 transition-colors font-medium group/link"
                      >
                        Detayları Gör
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
