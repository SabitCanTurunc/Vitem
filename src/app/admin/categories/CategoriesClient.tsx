"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X, Languages, Loader2 } from "lucide-react";
import { createCategory, deleteCategory, updateCategory } from "../../../../api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";

interface Category {
  id: number;
  name: string;
  nameEn: string | null;
  slug: string;
  description: string | null;
  descriptionEn: string | null;
  imageUrl: string | null;
  sortOrder: number | null;
}

type ModalMode = "create" | "edit";

async function autoTranslate(fields: { tr: string; enRef: string }[]): Promise<string[]> {
  const results: string[] = [];
  for (const f of fields) {
    if (!f.tr?.trim()) { results.push(f.enRef); continue; }
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: f.tr, from: "tr", to: "en" }),
      });
      const data = await res.json();
      results.push(data.translated || f.enRef);
    } catch {
      results.push(f.enRef);
    }
  }
  return results;
}

export default function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // form field states for translate
  const [nameVal, setNameVal] = useState("");
  const [nameEnVal, setNameEnVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [descEnVal, setDescEnVal] = useState("");
  const [imageVal, setImageVal] = useState("");

  function openCreate() {
    setModalMode("create");
    setEditTarget(null);
    setNameVal(""); setNameEnVal(""); setDescVal(""); setDescEnVal(""); setImageVal("");
    setIsModalOpen(true);
  }

  function openEdit(cat: Category) {
    setModalMode("edit");
    setEditTarget(cat);
    setNameVal(cat.name);
    setNameEnVal(cat.nameEn ?? "");
    setDescVal(cat.description ?? "");
    setDescEnVal(cat.descriptionEn ?? "");
    setImageVal(cat.imageUrl ?? "");
    setIsModalOpen(true);
  }

  async function handleTranslate() {
    setIsTranslating(true);
    const [tName, tDesc] = await autoTranslate([
      { tr: nameVal, enRef: nameEnVal },
      { tr: descVal, enRef: descEnVal },
    ]);
    setNameEnVal(tName);
    setDescEnVal(tDesc);
    setIsTranslating(false);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    let result;
    if (modalMode === "edit" && editTarget) {
      result = await updateCategory(editTarget.id, formData);
    } else {
      result = await createCategory(formData);
    }
    setIsSubmitting(false);
    if (result.success) {
      setIsModalOpen(false);
      router.refresh();
    } else {
      alert((result as any).error ?? "Hata oluştu.");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    setDeletingId(id);
    await deleteCategory(id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-vitem-900">Kategoriler</h1>
          <p className="text-sm text-vitem-500 mt-1">{initialCategories.length} kategori</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-vitem-900 text-white px-5 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-vitem-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Yeni Kategori
        </button>
      </div>

      <div className="bg-white border border-vitem-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-vitem-50 border-b border-vitem-200 text-vitem-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Ad (TR)</th>
              <th className="px-6 py-4 font-medium">Ad (EN)</th>
              <th className="px-6 py-4 font-medium text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vitem-100">
            {initialCategories.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-vitem-400 text-sm">Henüz kategori yok.</td></tr>
            ) : (
              initialCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-vitem-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-vitem-900">{cat.name}</td>
                  <td className="px-6 py-4 text-vitem-600">
                    {cat.nameEn || <span className="text-amber-500 text-xs">⚠ Çeviri yok</span>}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-2 text-vitem-400 hover:text-blue-600 transition-colors"
                      title="Düzenle"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deletingId === cat.id}
                      className="p-2 text-vitem-400 hover:text-red-600 transition-colors disabled:opacity-40"
                      title="Sil"
                    >
                      {deletingId === cat.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-vitem-100">
                <h2 className="text-xl font-serif font-light text-vitem-900">
                  {modalMode === "edit" ? "Kategori Düzenle" : "Yeni Kategori"}
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTranslate}
                    disabled={isTranslating || !nameVal.trim()}
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 disabled:opacity-40 transition-colors border border-blue-200 px-3 py-1.5 hover:bg-blue-50"
                    title="TR → EN otomatik çevir"
                  >
                    {isTranslating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className="w-3.5 h-3.5" />}
                    TR → EN Çevir
                  </button>
                  <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 transition-colors p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form action={handleSubmit} className="px-8 py-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField label="Ad (TR) *" name="name" value={nameVal} onChange={setNameVal} required />
                  <FormField label="Ad (EN)" name="nameEn" value={nameEnVal} onChange={setNameEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TextareaFormField label="Açıklama (TR)" name="description" value={descVal} onChange={setDescVal} />
                  <TextareaFormField label="Açıklama (EN)" name="descriptionEn" value={descEnVal} onChange={setDescEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <ImageUpload label="Görsel" value={imageVal} onChange={setImageVal} />
                    <input type="hidden" name="imageUrl" value={imageVal} />
                  </div>
                  <FormField label="Sıra" name="sortOrder" type="number" defaultValue={String(editTarget?.sortOrder ?? 0)} />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-vitem-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm text-vitem-500 hover:text-vitem-900 transition-colors">İptal</button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-vitem-900 text-white px-7 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Kaydediliyor..." : modalMode === "edit" ? "Güncelle" : "Kaydet"}
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

function FormField({ label, name, required, type = "text", value, onChange, defaultValue }: {
  label: string; name: string; required?: boolean; type?: string;
  value?: string; onChange?: (v: string) => void; defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <input
        type={type} name={name} required={required}
        value={onChange ? value : undefined}
        defaultValue={onChange ? undefined : defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 transition-colors bg-transparent"
      />
    </div>
  );
}

function TextareaFormField({ label, name, value, onChange }: {
  label: string; name: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <textarea
        name={name} rows={3} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 transition-colors bg-transparent resize-none"
      />
    </div>
  );
}
