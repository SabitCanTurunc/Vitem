export const dynamic = "force-dynamic";
import { getActiveCampaigns } from "../../../../../api/queries/products";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, MapPin, Palette, Info, Truck, Tag } from "lucide-react";

export default async function TeshirUrunleriPage() {
  const [campaigns, locale] = await Promise.all([
    getActiveCampaigns("exhibition"),
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
            <span className="text-vitem-700">Teşhir Ürünleri</span>
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-vitem-900 tracking-tight mb-6">
            Teşhir Ürünleri
          </h1>
          <p className="text-vitem-600 font-light max-w-xl leading-relaxed">
            Mağazalarımızdan kaldırılan teşhir ürünlerimizi özel fiyatlarla satın alabilirsiniz.
            Nakliye ve montaj dahildir.
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {campaigns.length === 0 ? (
            <div className="text-center py-20 text-vitem-400">
              <p className="text-lg font-light">Şu anda listelenmiş teşhir ürünü bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {campaigns.map((campaign) => {
                const title = locale === "en" && campaign.titleEn ? campaign.titleEn : campaign.title;
                const description = locale === "en" && campaign.descriptionEn ? campaign.descriptionEn : campaign.description;
                const gallery: string[] = campaign.gallery ? JSON.parse(campaign.gallery) : [];
                const mainImage = gallery[0] ?? campaign.imageUrl;

                return (
                  <article
                    key={campaign.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-vitem-100 overflow-hidden group hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Gallery */}
                    <div className="relative">
                      {/* Main image */}
                      <div className="relative aspect-[4/3] bg-vitem-100 overflow-hidden">
                        {mainImage ? (
                          <Image
                            src={mainImage}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-vitem-200 flex items-center justify-center">
                            <Tag className="w-16 h-16 text-vitem-400" />
                          </div>
                        )}
                        <span className="absolute top-4 left-4 bg-vitem-900 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                          Teşhir
                        </span>
                      </div>

                      {/* Thumbnail strip */}
                      {gallery.length > 1 && (
                        <div className="flex gap-1 p-1 bg-vitem-50">
                          {gallery.slice(0, 4).map((img, i) => (
                            <div key={i} className="relative flex-1 aspect-square overflow-hidden">
                              <Image
                                src={img}
                                alt={`${title} ${i + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-8 flex flex-col justify-between bg-white">
                      <div>
                        <h2 className="font-serif text-2xl font-light text-vitem-900 tracking-tight mb-6">
                          {title}
                        </h2>

                        <ul className="space-y-3 mb-6">
                          {campaign.branch && (
                            <li className="flex items-start gap-3 text-sm">
                              <span className="flex items-center gap-1.5 text-vitem-500 min-w-[130px]">
                                <MapPin className="w-3.5 h-3.5" />
                                Şube
                              </span>
                              <span className="text-vitem-800 font-medium">{campaign.branch}</span>
                            </li>
                          )}
                          {campaign.modelColor && (
                            <li className="flex items-start gap-3 text-sm">
                              <span className="flex items-center gap-1.5 text-vitem-500 min-w-[130px]">
                                <Palette className="w-3.5 h-3.5" />
                                Model / Renk
                              </span>
                              <span className="text-vitem-800">{campaign.modelColor}</span>
                            </li>
                          )}
                          {campaign.details && (
                            <li className="flex items-start gap-3 text-sm">
                              <span className="flex items-center gap-1.5 text-vitem-500 min-w-[130px]">
                                <Info className="w-3.5 h-3.5" />
                                Detaylar
                              </span>
                              <span className="text-vitem-800">{campaign.details}</span>
                            </li>
                          )}
                          {campaign.shippingInfo && (
                            <li className="flex items-start gap-3 text-sm">
                              <span className="flex items-center gap-1.5 text-vitem-500 min-w-[130px]">
                                <Truck className="w-3.5 h-3.5" />
                                Nakliye ve Montaj
                              </span>
                              <span className="text-vitem-800">{campaign.shippingInfo}</span>
                            </li>
                          )}
                          {campaign.originalPrice && (
                            <li className="flex items-start gap-3 text-sm">
                              <span className="flex items-center gap-1.5 text-vitem-500 min-w-[130px]">
                                <Tag className="w-3.5 h-3.5" />
                                Fiyat
                              </span>
                              <span className="text-vitem-800">{campaign.originalPrice}</span>
                            </li>
                          )}
                          {campaign.discountedPrice && (
                            <li className="flex items-start gap-3 text-sm">
                              <span className="flex items-center gap-1.5 text-vitem-500 min-w-[130px]">
                                <Tag className="w-3.5 h-3.5 text-red-500" />
                                İndirimli Fiyat
                              </span>
                              <span className="text-vitem-800">{campaign.discountedPrice}</span>
                            </li>
                          )}
                        </ul>

                        {description && (
                          <p className="text-sm text-vitem-500 font-light leading-relaxed border-t border-vitem-100 pt-4">
                            {description}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-6 border-t border-vitem-100 flex items-center gap-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 bg-vitem-900 text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-vitem-700 transition-colors"
                        >
                          Bilgi Al
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/kampanyalar/${campaign.slug}` as any}
                          className="text-[10px] tracking-[0.25em] uppercase text-vitem-600 hover:text-vitem-900 transition-colors"
                        >
                          Detay Sayfası
                        </Link>
                      </div>
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
