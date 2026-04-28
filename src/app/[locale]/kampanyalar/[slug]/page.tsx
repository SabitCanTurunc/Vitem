import { getActiveCampaigns, getCampaignBySlug } from "@api/queries/products";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { MapPin, Palette, Info, Truck, Tag, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const campaigns = await getActiveCampaigns();
  return campaigns.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string; locale: string }> };

export default async function KampanyaDetayPage({ params }: Props) {
  const { slug } = await params;
  const [campaign, locale, t] = await Promise.all([
    getCampaignBySlug(slug),
    getLocale(),
    getTranslations("kampanyalar"),
  ]);

  if (!campaign) notFound();

  const title = locale === "en" && campaign.titleEn ? campaign.titleEn : campaign.title;
  const description = locale === "en" && campaign.descriptionEn ? campaign.descriptionEn : campaign.description;
  const gallery: string[] = campaign.gallery ? JSON.parse(campaign.gallery) : [];
  const mainImage = gallery[0] ?? campaign.imageUrl;

  const backHref = campaign.type === "exhibition" ? "/kampanyalar/teshir" : "/kampanyalar/guncel";
  const backLabel = campaign.type === "exhibition" ? t("exhibition_title") : t("current_title");

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-vitem-400 mb-12">
          <Link href="/kampanyalar" className="hover:text-vitem-700 transition-colors">
            {t("title")}
          </Link>
          <span>/</span>
          <Link href={backHref as any} className="hover:text-vitem-700 transition-colors">
            {backLabel}
          </Link>
          <span>/</span>
          <span className="text-vitem-700">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Left — Gallery */}
          <div>
            {mainImage && (
              <div className="relative aspect-[4/3] overflow-hidden bg-vitem-100 mb-3">
                <Image
                  src={mainImage}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
                {campaign.badge && (
                  <span className="absolute top-4 left-4 bg-vitem-900 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5">
                    {campaign.badge}
                  </span>
                )}
              </div>
            )}

            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden bg-vitem-100">
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

          {/* Right — Info */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-vitem-900 tracking-tight mb-8">
              {title}
            </h1>

            <div className="border border-vitem-100 divide-y divide-vitem-100 mb-8">
              {campaign.branch && (
                <div className="flex items-start gap-4 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-vitem-500 min-w-[140px] pt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {t("field_branch")}
                  </span>
                  <span className="text-sm text-vitem-900">{campaign.branch}</span>
                </div>
              )}
              {campaign.modelColor && (
                <div className="flex items-start gap-4 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-vitem-500 min-w-[140px] pt-0.5">
                    <Palette className="w-3.5 h-3.5" />
                    {t("field_model_color")}
                  </span>
                  <span className="text-sm text-vitem-900">{campaign.modelColor}</span>
                </div>
              )}
              {campaign.details && (
                <div className="flex items-start gap-4 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-vitem-500 min-w-[140px] pt-0.5">
                    <Info className="w-3.5 h-3.5" />
                    {t("field_details")}
                  </span>
                  <span className="text-sm text-vitem-900">{campaign.details}</span>
                </div>
              )}
              {campaign.shippingInfo && (
                <div className="flex items-start gap-4 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-vitem-500 min-w-[140px] pt-0.5">
                    <Truck className="w-3.5 h-3.5" />
                    {t("field_shipping")}
                  </span>
                  <span className="text-sm text-vitem-900">{campaign.shippingInfo}</span>
                </div>
              )}
              {campaign.originalPrice && (
                <div className="flex items-start gap-4 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-vitem-500 min-w-[140px] pt-0.5">
                    <Tag className="w-3.5 h-3.5" />
                    {t("field_price")}
                  </span>
                  <span className="text-sm text-vitem-900">{campaign.originalPrice}</span>
                </div>
              )}
              {campaign.discountedPrice && (
                <div className="flex items-start gap-4 px-5 py-4 bg-vitem-50">
                  <span className="flex items-center gap-1.5 text-xs text-red-600 min-w-[140px] pt-0.5 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    {t("field_discounted_price")}
                  </span>
                  <span className="text-sm text-red-600 font-medium">{campaign.discountedPrice}</span>
                </div>
              )}
              {campaign.validUntil && (
                <div className="flex items-start gap-4 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs text-vitem-500 min-w-[140px] pt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {t("field_valid_until")}
                  </span>
                  <span className="text-sm text-vitem-900">{campaign.validUntil}</span>
                </div>
              )}
            </div>

            {description && (
              <p className="text-sm text-vitem-600 font-light leading-relaxed mb-8">
                {description}
              </p>
            )}

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-vitem-900 text-white text-[10px] tracking-[0.25em] uppercase px-7 py-3.5 hover:bg-vitem-700 transition-colors"
              >
                {t("request_or_order")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={backHref as any}
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-vitem-600 hover:text-vitem-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t("back_to", { label: backLabel })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
