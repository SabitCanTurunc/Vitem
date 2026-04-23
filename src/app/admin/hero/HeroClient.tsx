"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createHeroSlide } from "../../../../api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroClient({ slides }: { slides: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = await createHeroSlide(formData);
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
        <h1 className="text-3xl font-serif font-light">Hero Display Settings</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-vitem-900 text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-vitem-800 transition-colors rounded-md shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Slide
        </button>
      </div>

      <div className="bg-white rounded-xl border border-vitem-200 p-6 shadow-sm mb-8">
         <p className="text-sm text-vitem-600 mb-2">Configure the massive homepage crossfade sliders here. Ensure you fill out the English translations to support your global audience.</p>
         <p className="text-xs text-amber-600">&bull; Images are recommended to be high-res (at least 1920x1080) for the best luxury appearance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {slides.length === 0 ? (
           <div className="col-span-full py-12 text-center border-2 border-dashed border-vitem-200 rounded-xl text-vitem-500">
             No hero slides configured. Vitem will look empty. Add one now!
           </div>
        ) : (
          slides.map((slide) => (
             <div key={slide.id} className="bg-white rounded-xl border border-vitem-200 overflow-hidden shadow-sm flex flex-col">
                <div className="aspect-[16/9] w-full bg-vitem-100 relative">
                   <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                   <div className="absolute top-3 right-3">
                      {slide.isActive ? (
                         <span className="bg-green-500 text-white px-2 py-0.5 rounded-md text-[10px] font-medium tracking-widest uppercase shadow-sm">Active</span>
                      ) : (
                         <span className="bg-gray-500 text-white px-2 py-0.5 rounded-md text-[10px] font-medium tracking-widest uppercase shadow-sm">Draft</span>
                      )}
                   </div>
                </div>
                <div className="p-5 flex-1">
                   <h3 className="text-lg font-serif mb-1">{slide.title}</h3>
                   <p className="text-xs text-vitem-400 mb-4">{slide.titleEn || "— No English Title —"}</p>
                   <p className="text-sm text-vitem-600 line-clamp-2">{slide.subtitle}</p>
                </div>
                <div className="p-4 border-t border-vitem-100 flex justify-end gap-2 bg-vitem-50">
                    <button className="p-2 text-vitem-500 hover:text-blue-600 transition-colors bg-white border border-vitem-200 rounded shadow-sm"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-vitem-500 hover:text-red-600 transition-colors bg-white border border-vitem-200 rounded shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
             </div>
          ))
        )}
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
                <h2 className="text-xl font-serif font-light">New Hero Slide</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form action={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Title (TR)</label>
                    <input required name="title" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Title (EN)</label>
                    <input name="titleEn" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Subtitle (TR)</label>
                    <input name="subtitle" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Subtitle (EN)</label>
                    <input name="subtitleEn" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-vitem-500">Image URL</label>
                  <input required name="imageUrl" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" placeholder="High-res wallpaper link" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Link URL (optional)</label>
                    <input name="linkHref" className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" placeholder="/tr/collections" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Status & Order</label>
                    <div className="flex items-center gap-6 py-2">
                       <div className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked name="isActive" id="isActive" className="w-4 h-4 rounded accent-vitem-900" />
                          <label htmlFor="isActive" className="text-sm text-vitem-600">Active</label>
                       </div>
                       <input type="number" defaultValue={0} name="sortOrder" className="w-20 bg-vitem-50 border border-vitem-200 rounded-md py-1 px-3 text-sm focus:ring-1 focus:ring-vitem-900 outline-none" />
                    </div>
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
                    {isSubmitting ? "Saving..." : "Create Slide"}
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
