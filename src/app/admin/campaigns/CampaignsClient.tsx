"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, X, Loader2, Tag, Package } from "lucide-react";
import { createCampaign, deleteCampaign, updateCampaign } from "@api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";
import type { Campaign } from "@db/schema";
import ImageUpload from "@/components/ImageUpload";
import GalleryUpload from "@/components/GalleryUpload";
import { type AdminLang, getAdminLangFromBrowser } from "../i18n";

type ModalMode = "create" | "edit";

export default function CampaignsClient({ campaigns }: { campaigns: Campaign[] }) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>("tr");
  useEffect(() => {
    setLang(getAdminLangFromBrowser());
  }, []);
  const t = {
    title: lang === "en" ? "Campaigns" : "Kampanyalar",
    total: lang === "en" ? "total records" : "toplam kayıt",
    new: lang === "en" ? "New Campaign" : "Yeni Kampanya",
    current: lang === "en" ? "Current Campaigns" : "Güncel Kampanyalar",
    exhibition: lang === "en" ? "Exhibition Products" : "Teşhir Ürünleri",
    empty: lang === "en" ? "No campaign added yet." : "Henüz kampanya eklenmedi.",
    editModal: lang === "en" ? "Edit Campaign" : "Kampanya Düzenle",
    newModal: lang === "en" ? "New Campaign" : "Yeni Kampanya",
    titleTr: lang === "en" ? "Title (TR) *" : "Başlık (TR) *",
    titleEn: lang === "en" ? "Title (EN)" : "Başlık (EN)",
    descTr: lang === "en" ? "Description (TR)" : "Açıklama (TR)",
    descEn: lang === "en" ? "Description (EN)" : "Açıklama (EN)",
    image: lang === "en" ? "Image" : "Görsel",
    type: lang === "en" ? "Type" : "Tür",
    typeCurrent: lang === "en" ? "Current Campaign" : "Güncel Kampanya",
    typeExhibition: lang === "en" ? "Exhibition Product" : "Teşhir Ürünü",
    branch: lang === "en" ? "Branch" : "Şube",
    model: lang === "en" ? "Model / Color" : "Model / Renk",
    details: lang === "en" ? "Details" : "Detaylar",
    shipping: lang === "en" ? "Delivery & Installation" : "Nakliye ve Montaj",
    originalPrice: lang === "en" ? "Original Price" : "Orijinal Fiyat",
    discountedPrice: lang === "en" ? "Discounted Price" : "İndirimli Fiyat",
    badge: lang === "en" ? "Badge" : "Rozet",
    discount: lang === "en" ? "Discount %" : "İndirim %",
    validUntil: lang === "en" ? "Valid Until" : "Son Tarih",
    order: lang === "en" ? "Order" : "Sıra",
    gallery: lang === "en" ? "Gallery" : "Galeri",
    cancel: lang === "en" ? "Cancel" : "İptal",
    save: lang === "en" ? "Save" : "Kaydet",
    update: lang === "en" ? "Update" : "Güncelle",
    saving: lang === "en" ? "Saving..." : "Kaydediliyor...",
    edit: lang === "en" ? "Edit" : "Düzenle",
    del: lang === "en" ? "Delete" : "Sil",
    noTranslation: lang === "en" ? "⚠ No translation" : "⚠ Çeviri yok",
    discountLabel: lang === "en" ? "off" : "indirim",
    last: lang === "en" ? "Until:" : "Son:",
    active: lang === "en" ? "Active" : "Aktif",
    passive: lang === "en" ? "Passive" : "Pasif",
    err: lang === "en" ? "An error occurred." : "Hata oluştu.",
    confirmDelete: lang === "en" ? "Are you sure you want to delete this campaign?" : "Bu kampanyayı silmek istediğinize emin misiniz?",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [editTarget, setEditTarget] = useState<Campaign | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [titleVal, setTitleVal] = useState("");
  const [titleEnVal, setTitleEnVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [descEnVal, setDescEnVal] = useState("");
  const [imageVal, setImageVal] = useState("");
  const [galleryVal, setGalleryVal] = useState<string[]>([]);

  function openCreate() {
    setModalMode("create"); setEditTarget(null);
    setTitleVal(""); setTitleEnVal(""); setDescVal(""); setDescEnVal("");
    setImageVal(""); setGalleryVal([]);
    setIsModalOpen(true);
  }

  function openEdit(c: Campaign) {
    setModalMode("edit"); setEditTarget(c);
    setTitleVal(c.title); setTitleEnVal(c.titleEn ?? "");
    setDescVal(c.description ?? ""); setDescEnVal(c.descriptionEn ?? "");
    setImageVal(c.imageUrl ?? "");
    try { setGalleryVal(c.gallery ? JSON.parse(c.gallery) : []); } catch { setGalleryVal([]); }
    setIsModalOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    let result;
    if (modalMode === "edit" && editTarget) result = await updateCampaign(editTarget.id, formData);
    else result = await createCampaign(formData);
    setIsSubmitting(false);
    if (result.success) { setIsModalOpen(false); router.refresh(); }
    else alert((result as any).error ?? t.err);
  }

  async function handleDelete(id: number) {
    if (!confirm(t.confirmDelete)) return;
    setDeletingId(id);
    await deleteCampaign(id);
    setDeletingId(null);
    router.refresh();
  }

  const current = campaigns.filter(c => c.type === "current");
  const exhibition = campaigns.filter(c => c.type === "exhibition");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-vitem-900">{t.title}</h1>
          <p className="text-sm text-vitem-500 mt-1">{campaigns.length} {t.total}</p>
        </div>
        <button onClick={openCreate} className="bg-vitem-900 text-white px-5 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-vitem-800 transition-colors">
          <Plus className="w-3.5 h-3.5" /> {t.new}
        </button>
      </div>

      {/* Güncel Kampanyalar */}
      <Section title={t.current} icon={<Tag className="w-4 h-4" />} items={current} onEdit={openEdit} onDelete={handleDelete} deletingId={deletingId} t={t} />
      {/* Teşhir Ürünleri */}
      <Section title={t.exhibition} icon={<Package className="w-4 h-4" />} items={exhibition} onEdit={openEdit} onDelete={handleDelete} deletingId={deletingId} t={t} />

      {campaigns.length === 0 && (
        <div className="text-center py-20 text-vitem-400">
          <Tag className="w-10 h-10 mx-auto mb-4 opacity-40" />
          <p className="text-sm">{t.empty}</p>
        </div>
      )}

      {/* Modal */}
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
                  <F label={t.titleTr} name="title" value={titleVal} onChange={setTitleVal} required />
                  <F label={t.titleEn} name="titleEn" value={titleEnVal} onChange={setTitleEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TA label={t.descTr} name="description" value={descVal} onChange={setDescVal} />
                  <TA label={t.descEn} name="descriptionEn" value={descEnVal} onChange={setDescEnVal} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <ImageUpload label={t.image} value={imageVal} onChange={setImageVal} />
                    <input type="hidden" name="imageUrl" value={imageVal} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.type}</label>
                    <select name="type" defaultValue={editTarget?.type ?? "current"} className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 bg-transparent">
                      <option value="current">{t.typeCurrent}</option>
                      <option value="exhibition">{t.typeExhibition}</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.branch} name="branch" defaultValue={editTarget?.branch ?? ""} />
                  <F label={t.model} name="modelColor" defaultValue={editTarget?.modelColor ?? ""} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.details} name="details" defaultValue={editTarget?.details ?? ""} />
                  <F label={t.shipping} name="shippingInfo" defaultValue={editTarget?.shippingInfo ?? ""} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.originalPrice} name="originalPrice" defaultValue={editTarget?.originalPrice ?? ""} />
                  <F label={t.discountedPrice} name="discountedPrice" defaultValue={editTarget?.discountedPrice ?? ""} />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <F label={t.badge} name="badge" defaultValue={editTarget?.badge ?? ""} />
                  <F label={t.discount} name="discount" defaultValue={editTarget?.discount ?? ""} />
                  <F label={t.validUntil} name="validUntil" defaultValue={editTarget?.validUntil ?? ""} />
                </div>
                <F label={t.order} name="sortOrder" type="number" defaultValue={String(editTarget?.sortOrder ?? 0)} />
                <div className="space-y-1.5">
                  <GalleryUpload label={t.gallery} value={galleryVal} onChange={setGalleryVal} />
                  <input type="hidden" name="gallery" value={JSON.stringify(galleryVal)} />
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

function Section({ title, icon, items, onEdit, onDelete, deletingId, t }: {
  title: string; icon: React.ReactNode; items: Campaign[];
  onEdit: (c: Campaign) => void; onDelete: (id: number) => void; deletingId: number | null;
  t: Record<string, string>;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-10">
      <h2 className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-vitem-600 mb-4">{icon} {title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(c => (
          <article key={c.id} className="bg-white border border-vitem-200 overflow-hidden group">
            {c.imageUrl && <img src={c.imageUrl} alt={c.title} className="w-full h-32 object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm font-medium text-vitem-900 leading-tight">{c.title}</p>
                  <p className="text-xs text-vitem-400 mt-0.5">{c.titleEn || <span className="text-amber-500">{t.noTranslation}</span>}</p>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <button onClick={() => onEdit(c)} className="p-1.5 text-vitem-400 hover:text-blue-600 transition-colors" title={t.edit}>
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onDelete(c.id)} disabled={deletingId === c.id} className="p-1.5 text-vitem-400 hover:text-red-600 transition-colors disabled:opacity-40" title={t.del}>
                    {deletingId === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              {c.discount && <span className="text-xs text-red-600 font-medium">%{c.discount} {t.discountLabel}</span>}
              {c.validUntil && <p className="text-xs text-vitem-400 mt-1">{t.last} {c.validUntil}</p>}
              <span className={`mt-2 inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 ${c.isActive ? "bg-green-100 text-green-700" : "bg-vitem-100 text-vitem-500"}`}>
                {c.isActive ? t.active : t.passive}
              </span>
            </div>
          </article>
        ))}
      </div>
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
