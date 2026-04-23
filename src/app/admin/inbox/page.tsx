import { getDb } from "../../../../api/queries/connection";
import { contactSubmissions } from "@db/schema";
import { desc } from "drizzle-orm";
import { Mail, Phone, Clock } from "lucide-react";

export default async function AdminInbox() {
  const db = getDb();
  const submissions = await db.query.contactSubmissions.findMany({
    orderBy: [desc(contactSubmissions.createdAt)],
  });

  return (
    <div>
      <h1 className="text-3xl font-serif font-light mb-8">Inbox</h1>

      <div className="bg-white rounded-xl border border-vitem-200 overflow-hidden shadow-sm">
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-vitem-500">
            No submissions yet.
          </div>
        ) : (
          <ul className="divide-y divide-vitem-100">
            {submissions.map((sub) => (
              <li key={sub.id} className="p-6 hover:bg-vitem-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-vitem-900">{sub.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-vitem-500">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{sub.email}</span>
                      {sub.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{sub.phone}</span>}
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{sub.createdAt?.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${sub.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                    {sub.formType.toUpperCase()}
                  </span>
                </div>
                <div className="mt-4 p-4 bg-vitem-100/50 rounded-lg text-sm text-vitem-700 font-light border border-vitem-100">
                  {sub.message}
                </div>
                {/* Actions could go here (Mark as Read, Archive) */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
