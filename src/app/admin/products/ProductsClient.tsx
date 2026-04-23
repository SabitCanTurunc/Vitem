"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createProduct } from "../../../../api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  nameEn: string | null;
  slug: string;
  isFeatured: boolean | null;
  categoryName: string | null;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsClient({ prods, categories }: { prods: Product[], categories: Category[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await createProduct(formData);
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
        <h1 className="text-3xl font-serif font-light">Manage Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-vitem-900 text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-vitem-800 transition-colors rounded-md shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-vitem-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-vitem-50 border-b border-vitem-200 text-vitem-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Name (TR)</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vitem-200">
            {prods.length === 0 ? (
               <tr><td colSpan={4} className="px-6 py-12 text-center text-vitem-500">No products found. Start adding your collection.</td></tr>
            ) : (
              prods.map((prod) => (
                <tr key={prod.id} className="hover:bg-vitem-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-vitem-900">
                    {prod.name}
                    <span className="block text-xs font-normal text-vitem-400 mt-0.5">{prod.nameEn || "Missing EN Trans."}</span>
                  </td>
                  <td className="px-6 py-4 text-vitem-600 font-medium">{prod.categoryName || "Uncategorized"}</td>
                  <td className="px-6 py-4">
                    {prod.isFeatured ? (
                       <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Featured</span>
                    ) : (
                       <span className="bg-vitem-100 text-vitem-500 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Standard</span>
                    )}
                  </td>
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
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-vitem-100">
                <h2 className="text-xl font-serif font-light">New Product</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form action={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Name (TR)</label>
                    <input required name="name" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Name (EN)</label>
                    <input name="nameEn" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Category</label>
                    <select required name="categoryId" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all appearance-none cursor-pointer">
                      <option value="">Select a category</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-vitem-500">Options</label>
                     <div className="flex items-center gap-2 py-2.5">
                        <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 rounded accent-vitem-900" />
                        <label htmlFor="isFeatured" className="text-sm text-vitem-600">Mark as Featured</label>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Short Desc (TR)</label>
                    <input name="shortDescription" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Short Desc (EN)</label>
                    <input name="shortDescriptionEn" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Full Description (TR)</label>
                    <textarea name="description" rows={4} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Full Description (EN)</label>
                    <textarea name="descriptionEn" rows={4} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all resize-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Featured Image URL</label>
                    <input name="featuredImage" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Sort Order</label>
                    <input type="number" defaultValue={0} name="sortOrder" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t border-vitem-100">
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
                    {isSubmitting ? "Saving..." : "Create Product"}
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
