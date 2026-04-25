export const dynamic = "force-dynamic";
import { getDb } from "../../../api/queries/connection";
import { categories, products, heroSlides, contactSubmissions } from "@db/schema";
import { count } from "drizzle-orm";
import { FolderTree, ShoppingBag, ImageIcon, Inbox } from "lucide-react";

async function getStats() {
  const db = getDb();
  const [cats, prods, slides, messages] = await Promise.all([
    db.select({ count: count() }).from(categories),
    db.select({ count: count() }).from(products),
    db.select({ count: count() }).from(heroSlides),
    db.select({ count: count() }).from(contactSubmissions),
  ]);

  return {
    categories: cats[0].count,
    products: prods[0].count,
    heroSlides: slides[0].count,
    messages: messages[0].count,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { name: "Total Products", value: stats.products, icon: ShoppingBag, href: "/admin/products" },
    { name: "Categories", value: stats.categories, icon: FolderTree, href: "/admin/categories" },
    { name: "Hero Slides", value: stats.heroSlides, icon: ImageIcon, href: "/admin/hero" },
    { name: "Inbox Messages", value: stats.messages, icon: Inbox, href: "/admin/inbox" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif font-light mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <a key={card.name} href={card.href} className="bg-white p-6 rounded-xl border border-vitem-200 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between cursor-pointer">
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

      {/* Placeholder for Quick Actions or Recent Submissions */}
      <div className="mt-12 bg-white rounded-xl border border-vitem-200 p-8 shadow-sm">
        <h2 className="text-xl font-serif font-light mb-4">Quick Setup Guide</h2>
        <ul className="space-y-3 text-sm text-vitem-600 list-disc pl-5">
           <li>Start by populating your <strong>Categories</strong> (e.g., Kitchens, Doors, Mattresses). Ensure you provide English descriptions.</li>
           <li>Upload your premium <strong>Products</strong> into the respective categories. You can toggle their status as <em>Featured</em>.</li>
           <li>Customize the homepage <strong>Hero Settings</strong> to welcome visitors.</li>
           <li>Actively monitor your <strong>Inbox</strong> for customer inquiries and project requests.</li>
        </ul>
      </div>
    </div>
  );
}
