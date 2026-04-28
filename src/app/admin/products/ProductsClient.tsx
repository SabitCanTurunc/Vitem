"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { createProduct, deleteProduct, updateProduct } from "@api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import GalleryUpload from "@/components/GalleryUpload";
import { type AdminLang, getAdminLangFromBrowser } from "../i18n";

interface Product {
  id: number;
  name: string;
  nameEn: string | null;
  slug: string;
  isFeatured: boolean | null;
  categoryName: string | null;
  categoryId?: number | null;
}

interface Category { id: number; name: string; }

type ModalMode = "create" | "edit";

export default function ProductsClient({ prods, categories }: { prods: Product[]; categories: Category[] }) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>("tr");
  useEffect(() => {
    setLang(getAdminLangFromBrowser());
  }, []);
  const t = {
    title: lang === "en" ? "Products" : "Ürünler",
    count: lang === "en" ? "products" : "ürün",
    newProduct: lang === "en" ? "New Product" : "Yeni Ürün",
    name: lang === "en" ? "Name (TR / EN)" : "Ad (TR / EN)",
    category: lang === "en" ? "Category" : "Kategori",
    status: lang === "en" ? "Status" : "Durum",
    actions: lang === "en" ? "Actions" : "İşlemler",
    empty: lang === "en" ? "No products yet." : "Henüz ürün yok.",
    noTranslation: lang === "en" ? "⚠ No translation" : "⚠ Çeviri yok",
    featured: lang === "en" ? "Featured" : "Öne Çıkan",
    standard: lang === "en" ? "Standard" : "Standart",
    edit: lang === "en" ? "Edit" : "Düzenle",
    del: lang === "en" ? "Delete" : "Sil",
    editModal: lang === "en" ? "Edit Product" : "Ürün Düzenle",
    newModal: lang === "en" ? "New Product" : "Yeni Ürün",
    nameTrReq: lang === "en" ? "Name (TR) *" : "Ad (TR) *",
    nameEn: lang === "en" ? "Name (EN)" : "Ad (EN)",
    shortTr: lang === "en" ? "Short Description (TR)" : "Kısa Açıklama (TR)",
    shortEn: lang === "en" ? "Short Description (EN)" : "Kısa Açıklama (EN)",
    descTr: lang === "en" ? "Description (TR)" : "Açıklama (TR)",
    descEn: lang === "en" ? "Description (EN)" : "Açıklama (EN)",
    categoryReq: lang === "en" ? "Category *" : "Kategori *",
    choose: lang === "en" ? "Select..." : "Seçin...",
    featuredImage: lang === "en" ? "Featured Image" : "Öne Çıkan Görsel",
    gallery: lang === "en" ? "Gallery" : "Galeri",
    featuredProduct: lang === "en" ? "Featured Product" : "Öne Çıkan Ürün",
    order: lang === "en" ? "Order" : "Sıra",
    cancel: lang === "en" ? "Cancel" : "İptal",
    save: lang === "en" ? "Save" : "Kaydet",
    update: lang === "en" ? "Update" : "Güncelle",
    saving: lang === "en" ? "Saving..." : "Kaydediliyor...",
    error: lang === "en" ? "An error occurred." : "Hata oluştu.",
    confirmDelete: lang === "en" ? "Are you sure you want to delete this product?" : "Bu ürünü silmek istediğinize emin misiniz?",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [nameVal, setNameVal] = useState("");
  const [nameEnVal, setNameEnVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [descEnVal, setDescEnVal] = useState("");
  const [shortVal, setShortVal] = useState("");
  const [shortEnVal, setShortEnVal] = useState("");
  const [imageVal, setImageVal] = useState("");
  const [galleryVal, setGalleryVal] = useState<string[]>([]);

  function openCreate() {
    setModalMode("create"); setEditTarget(null);
    setNameVal(""); setNameEnVal(""); setDescVal(""); setDescEnVal(""); setShortVal(""); setShortEnVal("");
    setImageVal(""); setGalleryVal([]);
    setIsModalOpen(true);
  }

  function openEdit(p: Product) {
    setModalMode("edit"); setEditTarget(p);
    setNameVal(p.name); setNameEnVal(p.nameEn ?? "");
    setDescVal(""); setDescEnVal(""); setShortVal(""); setShortEnVal("");
    setImageVal(""); setGalleryVal([]);
    setIsModalOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    let result;
    if (modalMode === "edit" && editTarget) {
      result = await updateProduct(editTarget.id, formData);
    } else {
      result = await createProduct(formData);
    }
    setIsSubmitting(false);
    if (result.success) { setIsModalOpen(false); router.refresh(); }
    else alert((result as any).error ?? t.error);
  }

  async function handleDelete(id: number) {
    if (!confirm(t.confirmDelete)) return;
    setDeletingId(id);
    await deleteProduct(id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-vitem-900">{t.title}</h1>
          <p className="text-sm text-vitem-500 mt-1">{prods.length} {t.count}</p>
        </div>
        <button onClick={openCreate} className="bg-vitem-900 text-white px-5 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-vitem-800 transition-colors">
          <Plus className="w-3.5 h-3.5" /> {t.newProduct}
        </button>
      </div>

      <div className="bg-white border border-vitem-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-vitem-50 border-b border-vitem-200 text-vitem-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">{t.name}</th>
              <th className="px-6 py-4 font-medium">{t.category}</th>
              <th className="px-6 py-4 font-medium">{t.status}</th>
              <th className="px-6 py-4 font-medium text-right">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vitem-100">
            {prods.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-vitem-400 text-sm">{t.empty}</td></tr>
            ) : prods.map((prod) => (
              <tr key={prod.id} className="hover:bg-vitem-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-vitem-900">{prod.name}</p>
                  <p className="text-xs text-vitem-400 mt-0.5">{prod.nameEn || <span className="text-amber-500">{t.noTranslation}</span>}</p>
                </td>
                <td className="px-6 py-4 text-vitem-600">{prod.categoryName || "—"}</td>
                <td className="px-6 py-4">
                  {prod.isFeatured
                    ? <span className="bg-green-100 text-green-700 px-2 py-0.5 text-[10px] uppercase tracking-wider">{t.featured}</span>
                    : <span className="bg-vitem-100 text-vitem-500 px-2 py-0.5 text-[10px] uppercase tracking-wider">{t.standard}</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEdit(prod)} className="p-2 text-vitem-400 hover:text-blue-600 transition-colors" title={t.edit}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(prod.id)} disabled={deletingId === prod.id} className="p-2 text-vitem-400 hover:text-red-600 transition-colors disabled:opacity-40" title={t.del}>
                    {deletingId === prod.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-vitem-100">
                <h2 className="text-xl font-serif font-light text-vitem-900">{modalMode === "edit" ? t.editModal : t.newModal}</h2>
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 p-1"><X className="w-5 h-5" /></button>
                </div>
              </div>

              <form action={handleSubmit} className="px-8 py-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.nameTrReq} name="name" value={nameVal} onChange={setNameVal} required />
                  <F label={t.nameEn} name="nameEn" value={nameEnVal} onChange={setNameEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.shortTr} name="shortDescription" value={shortVal} onChange={setShortVal} />
                  <F label={t.shortEn} name="shortDescriptionEn" value={shortEnVal} onChange={setShortEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TA label={t.descTr} name="description" value={descVal} onChange={setDescVal} />
                  <TA label={t.descEn} name="descriptionEn" value={descEnVal} onChange={setDescEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.categoryReq}</label>
                    <select name="categoryId" required defaultValue={editTarget?.categoryId ?? ""} className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 bg-transparent">
                      <option value="">{t.choose}</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <ImageUpload label={t.featuredImage} value={imageVal} onChange={setImageVal} />
                    <input type="hidden" name="featuredImage" value={imageVal} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <GalleryUpload label={t.gallery} value={galleryVal} onChange={setGalleryVal} />
                  <input type="hidden" name="gallery" value={JSON.stringify(galleryVal)} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-2 pt-4">
                    <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 accent-vitem-900" defaultChecked={editTarget?.isFeatured ?? false} />
                    <label htmlFor="isFeatured" className="text-sm text-vitem-600">{t.featuredProduct}</label>
                  </div>
                  <F label={t.order} name="sortOrder" type="number" defaultValue="0" />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-vitem-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm text-vitem-500 hover:text-vitem-900">{t.cancel}</button>
                  <button type="submit" disabled={isSubmitting} className="bg-vitem-900 text-white px-7 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 disabled:opacity-50">
                    {isSubmitting ? t.saving : modalMode === "edit" ? t.update : t.save}
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

function F({ label, name, required, type = "text", value, onChange, defaultValue }: {
  label: string; name: string; required?: boolean; type?: string;
  value?: string; onChange?: (v: string) => void; defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <input type={type} name={name} required={required}
        value={onChange ? value : undefined}
        defaultValue={onChange ? undefined : defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 bg-transparent transition-colors"
      />
    </div>
  );
}

function TA({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <textarea name={name} rows={3} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 bg-transparent resize-none transition-colors"
      />
    </div>
  );
}
