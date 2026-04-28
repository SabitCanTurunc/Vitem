"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { createHeroSlide, deleteHeroSlide, updateHeroSlide } from "@api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import { type AdminLang, getAdminLangFromBrowser } from "../i18n";

export default function HeroClient({ slides }: { slides: any[] }) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>("tr");
  useEffect(() => {
    setLang(getAdminLangFromBrowser());
  }, []);
  const t = {
    pageTitle: lang === "en" ? "Hero Display Settings" : "Hero Görünüm Ayarları",
    addSlide: lang === "en" ? "Add Slide" : "Slayt Ekle",
    info1: lang === "en"
      ? "Configure homepage hero sliders here. Fill English translations for global visitors."
      : "Ana sayfa hero slaytlarını buradan yönetin. Global ziyaretçiler için İngilizce alanları da doldurun.",
    info2: lang === "en"
      ? "High-res images are recommended (at least 1920x1080)."
      : "Yüksek çözünürlüklü görsel önerilir (en az 1920x1080).",
    empty: lang === "en" ? "No hero slides configured. Add one now." : "Henüz hero slaytı yok. Hemen bir tane ekleyin.",
    noImage: lang === "en" ? "No image" : "Görsel yok",
    active: lang === "en" ? "Active" : "Aktif",
    draft: lang === "en" ? "Draft" : "Taslak",
    noEnglishTitle: lang === "en" ? "— No English Title —" : "— İngilizce başlık yok —",
    editModal: lang === "en" ? "Edit Hero Slide" : "Hero Slaydını Düzenle",
    newModal: lang === "en" ? "New Hero Slide" : "Yeni Hero Slaydı",
    titleTr: lang === "en" ? "Title (TR)" : "Başlık (TR)",
    titleEn: lang === "en" ? "Title (EN)" : "Başlık (EN)",
    subtitleTr: lang === "en" ? "Subtitle (TR)" : "Alt Başlık (TR)",
    subtitleEn: lang === "en" ? "Subtitle (EN)" : "Alt Başlık (EN)",
    image: lang === "en" ? "Image (min. 1920×1080 suggested)" : "Görsel (min. 1920×1080 önerilir)",
    linkUrl: lang === "en" ? "Link URL (optional)" : "Link URL (opsiyonel)",
    linkPlaceholder: "/tr/collections",
    statusOrder: lang === "en" ? "Status & Order" : "Durum ve Sıra",
    cancel: lang === "en" ? "Cancel" : "İptal",
    saving: lang === "en" ? "Saving..." : "Kaydediliyor...",
    update: lang === "en" ? "Update Slide" : "Slaytı Güncelle",
    create: lang === "en" ? "Create Slide" : "Slayt Oluştur",
    deleteConfirm: lang === "en" ? "Are you sure you want to delete this hero slide?" : "Bu hero slaydını silmek istediğinize emin misiniz?",
    deleteFailed: lang === "en" ? "Delete failed." : "Silme işlemi başarısız.",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [titleVal, setTitleVal] = useState("");
  const [titleEnVal, setTitleEnVal] = useState("");
  const [subtitleVal, setSubtitleVal] = useState("");
  const [subtitleEnVal, setSubtitleEnVal] = useState("");
  const [linkHrefVal, setLinkHrefVal] = useState("");
  const [sortOrderVal, setSortOrderVal] = useState("0");
  const [isActiveVal, setIsActiveVal] = useState(true);
  const [imageVal, setImageVal] = useState("");

  function openCreate() {
    setEditId(null);
    setTitleVal("");
    setTitleEnVal("");
    setSubtitleVal("");
    setSubtitleEnVal("");
    setLinkHrefVal("");
    setSortOrderVal("0");
    setIsActiveVal(true);
    setImageVal("");
    setIsModalOpen(true);
  }

  function openEdit(slide: any) {
    setEditId(slide.id);
    setTitleVal(slide.title ?? "");
    setTitleEnVal(slide.titleEn ?? "");
    setSubtitleVal(slide.subtitle ?? "");
    setSubtitleEnVal(slide.subtitleEn ?? "");
    setLinkHrefVal(slide.linkHref ?? "");
    setSortOrderVal(String(slide.sortOrder ?? 0));
    setIsActiveVal(Boolean(slide.isActive));
    setImageVal(slide.imageUrl ?? "");
    setIsModalOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const result = editId ? await updateHeroSlide(editId, formData) : await createHeroSlide(formData);
    setIsSubmitting(false);
    if (result.success) {
      setIsModalOpen(false);
      setEditId(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t.deleteConfirm)) return;
    setDeletingId(id);
    const result = await deleteHeroSlide(id);
    setDeletingId(null);
    if (result.success) router.refresh();
    else alert(t.deleteFailed);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-light">{t.pageTitle}</h1>
        <button 
          onClick={openCreate}
          className="bg-vitem-900 text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-vitem-800 transition-colors rounded-md shadow-sm"
        >
          <Plus className="w-4 h-4" /> {t.addSlide}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-vitem-200 p-6 shadow-sm mb-8">
         <p className="text-sm text-vitem-600 mb-2">{t.info1}</p>
         <p className="text-xs text-amber-600">&bull; {t.info2}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {slides.length === 0 ? (
           <div className="col-span-full py-12 text-center border-2 border-dashed border-vitem-200 rounded-xl text-vitem-500">
             {t.empty}
           </div>
        ) : (
          slides.map((slide) => (
             <div key={slide.id} className="bg-white rounded-xl border border-vitem-200 overflow-hidden shadow-sm flex flex-col">
                <div className="aspect-[16/9] w-full bg-vitem-100 relative">
                   {slide.imageUrl ? (
                     <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-widest text-vitem-400">
                       {t.noImage}
                     </div>
                   )}
                   <div className="absolute top-3 right-3">
                      {slide.isActive ? (
                         <span className="bg-green-500 text-white px-2 py-0.5 rounded-md text-[10px] font-medium tracking-widest uppercase shadow-sm">{t.active}</span>
                      ) : (
                         <span className="bg-gray-500 text-white px-2 py-0.5 rounded-md text-[10px] font-medium tracking-widest uppercase shadow-sm">{t.draft}</span>
                      )}
                   </div>
                </div>
                <div className="p-5 flex-1">
                   <h3 className="text-lg font-serif mb-1">{slide.title}</h3>
                   <p className="text-xs text-vitem-400 mb-4">{slide.titleEn || t.noEnglishTitle}</p>
                   <p className="text-sm text-vitem-600 line-clamp-2">{slide.subtitle}</p>
                </div>
                <div className="p-4 border-t border-vitem-100 flex justify-end gap-2 bg-vitem-50">
                    <button onClick={() => openEdit(slide)} className="p-2 text-vitem-500 hover:text-blue-600 transition-colors bg-white border border-vitem-200 rounded shadow-sm"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(slide.id)} disabled={deletingId === slide.id} className="p-2 text-vitem-500 hover:text-red-600 transition-colors bg-white border border-vitem-200 rounded shadow-sm disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
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
                <h2 className="text-xl font-serif font-light">{editId ? t.editModal : t.newModal}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form action={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.titleTr}</label>
                    <input required name="title" value={titleVal} onChange={(e) => setTitleVal(e.target.value)} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.titleEn}</label>
                    <input name="titleEn" value={titleEnVal} onChange={(e) => setTitleEnVal(e.target.value)} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.subtitleTr}</label>
                    <input name="subtitle" value={subtitleVal} onChange={(e) => setSubtitleVal(e.target.value)} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.subtitleEn}</label>
                    <input name="subtitleEn" value={subtitleEnVal} onChange={(e) => setSubtitleEnVal(e.target.value)} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <ImageUpload label={t.image} value={imageVal} onChange={setImageVal} />
                  <input type="hidden" name="imageUrl" value={imageVal} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.linkUrl}</label>
                    <input name="linkHref" value={linkHrefVal} onChange={(e) => setLinkHrefVal(e.target.value)} className="w-full bg-vitem-50 border border-vitem-200 rounded-md py-2.5 px-4 focus:ring-1 focus:ring-vitem-900 outline-none transition-all" placeholder={t.linkPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.statusOrder}</label>
                    <div className="flex items-center gap-6 py-2">
                       <div className="flex items-center gap-2">
                          <input type="checkbox" checked={isActiveVal} onChange={(e) => setIsActiveVal(e.target.checked)} name="isActive" id="isActive" className="w-4 h-4 rounded accent-vitem-900" />
                          <label htmlFor="isActive" className="text-sm text-vitem-600">{t.active}</label>
                       </div>
                       <input type="number" value={sortOrderVal} onChange={(e) => setSortOrderVal(e.target.value)} name="sortOrder" className="w-20 bg-vitem-50 border border-vitem-200 rounded-md py-1 px-3 text-sm focus:ring-1 focus:ring-vitem-900 outline-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t border-vitem-100">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-sm text-vitem-600 hover:text-vitem-900 transition-colors"
                  >
                    {t.cancel}
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-vitem-900 text-white px-8 py-2.5 text-sm rounded-md hover:bg-vitem-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t.saving : editId ? t.update : t.create}
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
