export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // local file: db requires nodejs runtime, change to edge for production if using turso

import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { asc, desc, eq, count } from "drizzle-orm";
import {
  FolderTree,
  ShoppingBag,
  Image as ImageIcon,
  Inbox,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

import { getDb } from "@api/queries/connection";
import {
  categories,
  products,
  heroSlides,
  contactSubmissions,
  campaigns,
  projects,
} from "@db/schema";

import CategoriesClient from "../categories/CategoriesClient";
import ProductsClient from "../products/ProductsClient";
import HeroClient from "../hero/HeroClient";
import ProjectsAdminClient from "../projects/ProjectsAdminClient";
import CampaignsClient from "../campaigns/CampaignsClient";
import { getAdminLang, tAdmin } from "../i18n";

// Tüm /admin/* yolları tek bir Edge Function altında toplanır
// (/admin, /admin/categories, /admin/products, /admin/hero, /admin/inbox,
// /admin/campaigns, /admin/projects). Bu sayede Vercel Hobby plan'ın
// 12 fonksiyon limiti sorunu çözülür.
export default async function AdminCatchAll({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const section = slug?.[0] ?? "dashboard";
  const cookieStore = await cookies();
  const lang = getAdminLang(cookieStore.get("admin_lang")?.value);

  if (slug && slug.length > 1) {
    notFound();
  }

  const db = getDb();

  switch (section) {
    case "dashboard": {
      const [cats, prods, slides, messages] = await Promise.all([
        db.select({ count: count() }).from(categories),
        db.select({ count: count() }).from(products),
        db.select({ count: count() }).from(heroSlides),
        db.select({ count: count() }).from(contactSubmissions),
      ]);

      const stats = {
        categories: cats[0].count,
        products: prods[0].count,
        heroSlides: slides[0].count,
        messages: messages[0].count,
      };

      const cards = [
        { name: tAdmin(lang, "total_products"), value: stats.products, icon: ShoppingBag, href: "/admin/products" },
        { name: tAdmin(lang, "categories"), value: stats.categories, icon: FolderTree, href: "/admin/categories" },
        { name: tAdmin(lang, "hero_slides"), value: stats.heroSlides, icon: ImageIcon, href: "/admin/hero" },
        { name: tAdmin(lang, "inbox_messages"), value: stats.messages, icon: Inbox, href: "/admin/inbox" },
      ];

      return (
        <div>
          <h1 className="text-3xl font-serif font-light mb-8">{tAdmin(lang, "dashboard_overview")}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
              <a
                key={card.name}
                href={card.href}
                className="bg-white p-6 rounded-xl border border-vitem-200 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <p className="text-vitem-500 text-sm font-medium">{card.name}</p>
                  <p className="text-3xl font-light text-vitem-900 mt-2">{card.value}</p>
                </div>
                <div className="p-3 bg-vitem-50 rounded-lg group-hover:bg-vitem-100 transition-colors">
                  <card.icon className="w-6 h-6 text-vitem-500 group-hover:text-vitem-900 transition-colors" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl border border-vitem-200 p-8 shadow-sm">
            <h2 className="text-xl font-serif font-light mb-4">{tAdmin(lang, "quick_setup")}</h2>
            <ul className="space-y-3 text-sm text-vitem-600 list-disc pl-5">
              <li>{tAdmin(lang, "setup_1")}</li>
              <li>{tAdmin(lang, "setup_2")}</li>
              <li>{tAdmin(lang, "setup_3")}</li>
              <li>{tAdmin(lang, "setup_4")}</li>
            </ul>
          </div>
        </div>
      );
    }

    case "categories": {
      const cats = await db.query.categories.findMany({
        orderBy: [asc(categories.sortOrder)],
      });
      return <CategoriesClient initialCategories={cats as any} />;
    }

    case "products": {
      const [prods, cats] = await Promise.all([
        db
          .select({
            id: products.id,
            name: products.name,
            nameEn: products.nameEn,
            slug: products.slug,
            isFeatured: products.isFeatured,
            categoryId: products.categoryId,
            categoryName: categories.name,
          })
          .from(products)
          .leftJoin(categories, eq(products.categoryId, categories.id))
          .orderBy(asc(products.sortOrder)),
        db.select().from(categories).orderBy(asc(categories.name)),
      ]);
      return <ProductsClient prods={prods as any} categories={cats as any} />;
    }

    case "hero": {
      const slides = await db.query.heroSlides.findMany({
        orderBy: [asc(heroSlides.sortOrder)],
      });
      return <HeroClient slides={slides} />;
    }

    case "projects": {
      const allProjects = await db
        .select()
        .from(projects)
        .orderBy(projects.sortOrder);
      return <ProjectsAdminClient projects={allProjects} />;
    }

    case "campaigns": {
      const allCampaigns = await db
        .select()
        .from(campaigns)
        .orderBy(campaigns.sortOrder);
      return <CampaignsClient campaigns={allCampaigns} />;
    }

    case "inbox": {
      const submissions = await db.query.contactSubmissions.findMany({
        orderBy: [desc(contactSubmissions.createdAt)],
      });

      return (
        <div>
          <h1 className="text-3xl font-serif font-light mb-8">{tAdmin(lang, "inbox")}</h1>

          <div className="bg-white rounded-xl border border-vitem-200 overflow-hidden shadow-sm">
            {submissions.length === 0 ? (
              <div className="p-12 text-center text-vitem-500">
                {tAdmin(lang, "no_submissions")}
              </div>
            ) : (
              <ul className="divide-y divide-vitem-100">
                {submissions.map((sub) => (
                  <li key={sub.id} className="p-6 hover:bg-vitem-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-vitem-900">{sub.name}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-vitem-500">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            {sub.email}
                          </span>
                          {sub.phone && (
                            <span className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5" />
                              {sub.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {sub.createdAt?.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                          sub.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sub.formType.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-4 p-4 bg-vitem-100/50 rounded-lg text-sm text-vitem-700 font-light border border-vitem-100">
                      {sub.message}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }

    default:
      notFound();
  }
}
