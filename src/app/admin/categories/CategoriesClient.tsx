"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createCategory } from "../../../../api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: number;
  name: string;
  nameEn: string | null;
  slug: string;
}

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await createCategory(formData);
    setIsSubmitting(false);
    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert(result.error);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-light">Manage Categories</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-vitem-900 text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-vitem-800 transition-colors rounded-md shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-vitem-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-vitem-50 border-b border-vitem-200 text-vitem-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Name (TR)</th>
              <th className="px-6 py-4 font-medium">Name (EN)</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vitem-200">
            {initialCategories.length === 0 ? (
               <tr><td colSpan={3} className="px-6 py-12 text-center text-vitem-500">No categories found. Create one.</td></tr>
            ) : (
              initialCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-vitem-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-vitem-900">{cat.name}</td>
                  <td className="px-6 py-4 text-vitem-600">{cat.nameEn || "—"}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-vitem-400 hover:text-blue-600 transition-colors mr-2"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 text-vitem-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-vitem-100">
                <h2 className="text-xl font-serif font-light">New Category</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form action={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Name (Turkish)</label>
                    <input required name="name" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" placeholder="ör: Mutfaklar" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Name (English)</label>
                    <input name="nameEn" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" placeholder="eg: Kitchens" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-vitem-500">Description (Turkish)</label>
                  <textarea name="description" rows={3} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all resize-none" placeholder="Kategori detayı..." />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-vitem-500">Description (English)</label>
                  <textarea name="descriptionEn" rows={3} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all resize-none" placeholder="Category details..." />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Image URL</label>
                    <input name="imageUrl" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" placeholder="Cloudinary or Unsplash link" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Sort Order</label>
                    <input type="number" defaultValue={0} name="sortOrder" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-sm text-vitem-600 hover:text-vitem-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-vitem-900 text-white px-8 py-2.5 text-sm rounded-md hover:bg-vitem-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Category"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
