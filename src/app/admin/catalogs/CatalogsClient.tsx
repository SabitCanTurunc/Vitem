"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Edit, Trash2, X, Loader2, BookOpen,
  FileText, Link2, Upload, ExternalLink, CheckCircle2,
} from "lucide-react";
import { createCatalog, deleteCatalog, updateCatalog } from "@api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";
import type { Catalog } from "@db/schema";
import ImageUpload from "@/components/ImageUpload";
import { getAdminLangFromBrowser, type AdminLang } from "../i18n";

type ModalMode = "create" | "edit";

const ALLOWED_TYPES = ["application/pdf"];
const MAX_FILE_MB = 30;

export default function CatalogsClient({ catalogs }: { catalogs: Catalog[] }) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>("tr");
  useEffect(() => { setLang(getAdminLangFromBrowser()); }, []);

  const t = {
    title:         lang === "en" ? "Catalogues"           : "Kataloglar",
    total:         lang === "en" ? "total records"        : "toplam kayıt",
    new:           lang === "en" ? "New Catalogue"        : "Yeni Katalog",
    empty:         lang === "en" ? "No catalogue added yet." : "Henüz katalog eklenmedi.",
    editModal:     lang === "en" ? "Edit Catalogue"       : "Katalog Düzenle",
    newModal:      lang === "en" ? "New Catalogue"        : "Yeni Katalog",
    titleTr:       lang === "en" ? "Title (TR) *"         : "Başlık (TR) *",
    titleEn:       lang === "en" ? "Title (EN)"           : "Başlık (EN)",
    descTr:        lang === "en" ? "Description (TR)"     : "Açıklama (TR)",
    descEn:        lang === "en" ? "Description (EN)"     : "Açıklama (EN)",
    cover:         lang === "en" ? "Cover Image"          : "Kapak Görseli",
    fileType:      lang === "en" ? "Source Type"          : "Kaynak Türü",
    typePdf:       lang === "en" ? "Upload PDF"           : "PDF Yükle",
    typeLink:      lang === "en" ? "External Link"        : "Harici Link",
    pdfFile:       lang === "en" ? "PDF File (max 30 MB)" : "PDF Dosyası (maks 30 MB)",
    linkUrl:       lang === "en" ? "Catalogue URL"        : "Katalog URL'si",
    order:         lang === "en" ? "Sort Order"           : "Sıra",
    active:        lang === "en" ? "Active"               : "Aktif",
    passive:       lang === "en" ? "Passive"              : "Pasif",
    cancel:        lang === "en" ? "Cancel"               : "İptal",
    save:          lang === "en" ? "Save"                 : "Kaydet",
    update:        lang === "en" ? "Update"               : "Güncelle",
    saving:        lang === "en" ? "Saving..."            : "Kaydediliyor...",
    uploading:     lang === "en" ? "Uploading PDF..."     : "PDF yükleniyor...",
    uploaded:      lang === "en" ? "PDF uploaded"         : "PDF yüklendi",
    edit:          lang === "en" ? "Edit"                 : "Düzenle",
    del:           lang === "en" ? "Delete"               : "Sil",
    err:           lang === "en" ? "An error occurred."   : "Hata oluştu.",
    errFormat:     lang === "en" ? "Only PDF files are allowed." : "Sadece PDF dosyası yüklenebilir.",
    errSize:       lang === "en" ? `Max file size is ${MAX_FILE_MB} MB.` : `Maksimum dosya boyutu ${MAX_FILE_MB} MB.`,
    confirmDelete: lang === "en" ? "Are you sure you want to delete this catalogue?" : "Bu katalogu silmek istediğinize emin misiniz?",
  };

  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [modalMode, setModalMode]       = useState<ModalMode>("create");
  const [editTarget, setEditTarget]     = useState<Catalog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId]     = useState<number | null>(null);

  // Form state
  const [titleVal, setTitleVal]         = useState("");
  const [titleEnVal, setTitleEnVal]     = useState("");
  const [descVal, setDescVal]           = useState("");
  const [descEnVal, setDescEnVal]       = useState("");
  const [coverVal, setCoverVal]         = useState("");
  const [fileTypeVal, setFileTypeVal]   = useState<"pdf" | "link">("pdf");
  const [fileUrlVal, setFileUrlVal]     = useState("");
  const [extLinkVal, setExtLinkVal]     = useState("");
  const [sortOrder, setSortOrder]       = useState("0");
  const [isActive, setIsActive]         = useState(true);

  // PDF upload state
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfUploadDone, setPdfUploadDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setTitleVal(""); setTitleEnVal(""); setDescVal(""); setDescEnVal("");
    setCoverVal(""); setFileTypeVal("pdf"); setFileUrlVal(""); setExtLinkVal("");
    setSortOrder("0"); setIsActive(true); setPdfUploadDone(false);
  }

  function openCreate() {
    setModalMode("create"); setEditTarget(null);
    resetForm();
    setIsModalOpen(true);
  }

  function openEdit(c: Catalog) {
    setModalMode("edit"); setEditTarget(c);
    setTitleVal(c.title); setTitleEnVal(c.titleEn ?? "");
    setDescVal(c.description ?? ""); setDescEnVal(c.descriptionEn ?? "");
    setCoverVal(c.coverImage ?? "");
    const ft = (c.fileType ?? "pdf") as "pdf" | "link";
    setFileTypeVal(ft);
    setFileUrlVal(c.fileUrl ?? "");
    setExtLinkVal(c.externalLink ?? "");
    setSortOrder(String(c.sortOrder ?? 0));
    setIsActive(c.isActive ?? true);
    setPdfUploadDone(!!c.fileUrl);
    setIsModalOpen(true);
  }

  async function handlePdfUpload(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) { alert(t.errFormat); return; }
    if (file.size > MAX_FILE_MB * 1024 * 1024) { alert(t.errSize); return; }

    setPdfUploading(true);
    setPdfUploadDone(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "ml_default");
    formData.append("resource_type", "raw");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    if (data.secure_url) {
      setFileUrlVal(data.secure_url);
      setPdfUploadDone(true);
    } else {
      console.error("Cloudinary upload error:", data);
      alert(data.error?.message ? `Cloudinary hatası: ${data.error.message}` : t.err);
    }
    setPdfUploading(false);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    formData.set("coverImage", coverVal);
    formData.set("fileUrl", fileUrlVal);
    formData.set("externalLink", extLinkVal);
    formData.set("fileType", fileTypeVal);
    formData.set("isActive", isActive ? "on" : "off");

    let result;
    if (modalMode === "edit" && editTarget) result = await updateCatalog(editTarget.id, formData);
    else result = await createCatalog(formData);
    setIsSubmitting(false);
    if (result.success) { setIsModalOpen(false); router.refresh(); }
    else alert((result as any).error ?? t.err);
  }

  async function handleDelete(id: number) {
    if (!confirm(t.confirmDelete)) return;
    setDeletingId(id);
    await deleteCatalog(id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-vitem-900">{t.title}</h1>
          <p className="text-sm text-vitem-500 mt-1">{catalogs.length} {t.total}</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-vitem-900 text-white px-5 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-vitem-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> {t.new}
        </button>
      </div>

      {/* Catalog Grid */}
      {catalogs.length === 0 ? (
        <div className="text-center py-20 text-vitem-400">
          <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-40" />
          <p className="text-sm">{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalogs.map((c) => (
            <article key={c.id} className="bg-white border border-vitem-200 overflow-hidden group">
              {/* Cover */}
              <div className="relative h-40 bg-vitem-50 flex items-center justify-center overflow-hidden">
                {c.coverImage ? (
                  <img src={c.coverImage} alt={c.title} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-14 h-14 text-vitem-200" />
                )}
                <span className={`absolute top-2 right-2 text-[10px] uppercase tracking-widest px-2 py-0.5 ${c.isActive ? "bg-green-100 text-green-700" : "bg-vitem-100 text-vitem-500"}`}>
                  {c.isActive ? t.active : t.passive}
                </span>
                <span className="absolute bottom-2 left-2 bg-vitem-900/80 text-white text-[10px] uppercase tracking-widest px-2 py-0.5 flex items-center gap-1">
                  {c.fileType === "link" ? <><Link2 className="w-3 h-3" /> Link</> : <><FileText className="w-3 h-3" /> PDF</>}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-vitem-900 leading-tight truncate">{c.title}</p>
                    <p className="text-xs text-vitem-400 mt-0.5 truncate">{c.titleEn || "—"}</p>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0">
                    {(c.fileUrl || c.externalLink) && (
                      <a
                        href={c.fileType === "link" ? (c.externalLink ?? "#") : (c.fileUrl ?? "#")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-vitem-400 hover:text-blue-600 transition-colors"
                        title="Önizle"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button onClick={() => openEdit(c)} className="p-1.5 text-vitem-400 hover:text-blue-600 transition-colors" title={t.edit}>
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} disabled={deletingId === c.id} className="p-1.5 text-vitem-400 hover:text-red-600 transition-colors disabled:opacity-40" title={t.del}>
                      {deletingId === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

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
                  {modalMode === "edit" ? t.editModal : t.newModal}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form action={handleSubmit} className="px-8 py-6 space-y-6">
                {/* Başlık */}
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.titleTr} name="title" value={titleVal} onChange={setTitleVal} required />
                  <F label={t.titleEn} name="titleEn" value={titleEnVal} onChange={setTitleEnVal} />
                </div>

                {/* Açıklama */}
                <div className="grid grid-cols-2 gap-6">
                  <TA label={t.descTr} name="description" value={descVal} onChange={setDescVal} />
                  <TA label={t.descEn} name="descriptionEn" value={descEnVal} onChange={setDescEnVal} />
                </div>

                {/* Kapak Görseli */}
                <div className="space-y-1.5">
                  <ImageUpload label={t.cover} value={coverVal} onChange={setCoverVal} />
                  <input type="hidden" name="coverImage" value={coverVal} />
                </div>

                {/* Kaynak Türü Seçimi */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-vitem-500">{t.fileType}</label>
                  <div className="flex gap-3">
                    {(["pdf", "link"] as const).map((ft) => (
                      <button
                        key={ft}
                        type="button"
                        onClick={() => setFileTypeVal(ft)}
                        className={`flex items-center gap-2 px-4 py-2.5 border text-sm transition-colors ${
                          fileTypeVal === ft
                            ? "border-vitem-900 bg-vitem-900 text-white"
                            : "border-vitem-200 text-vitem-600 hover:border-vitem-900"
                        }`}
                      >
                        {ft === "pdf" ? <FileText className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                        {ft === "pdf" ? t.typePdf : t.typeLink}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PDF Upload */}
                {fileTypeVal === "pdf" && (
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">{t.pdfFile}</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${
                        pdfUploadDone
                          ? "border-green-400 bg-green-50"
                          : "border-vitem-200 hover:border-vitem-900"
                      }`}
                    >
                      {pdfUploading ? (
                        <div className="flex flex-col items-center gap-2 text-vitem-500">
                          <Loader2 className="w-8 h-8 animate-spin" />
                          <span className="text-sm">{t.uploading}</span>
                        </div>
                      ) : pdfUploadDone ? (
                        <div className="flex flex-col items-center gap-2 text-green-700">
                          <CheckCircle2 className="w-8 h-8" />
                          <span className="text-sm font-medium">{t.uploaded}</span>
                          <span className="text-xs text-vitem-400 break-all max-w-full px-2">{fileUrlVal}</span>
                          <span className="text-xs text-vitem-500 mt-1">Değiştirmek için tıklayın</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-vitem-400">
                          <Upload className="w-8 h-8" />
                          <span className="text-sm">PDF dosyasını seçmek için tıklayın</span>
                          <span className="text-xs">Yalnızca .pdf — maks {MAX_FILE_MB} MB</span>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePdfUpload(file);
                        }}
                      />
                    </div>
                    <input type="hidden" name="fileUrl" value={fileUrlVal} />
                  </div>
                )}

                {/* External Link */}
                {fileTypeVal === "link" && (
                  <div className="space-y-1.5">
                    <F
                      label={t.linkUrl}
                      name="externalLink"
                      value={extLinkVal}
                      onChange={setExtLinkVal}
                      placeholder="https://..."
                    />
                  </div>
                )}

                {/* Sıra ve Aktif */}
                <div className="grid grid-cols-2 gap-6 items-end">
                  <F label={t.order} name="sortOrder" type="number" value={sortOrder} onChange={setSortOrder} />
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-vitem-500">Durum</label>
                    <button
                      type="button"
                      onClick={() => setIsActive((v) => !v)}
                      className={`flex items-center gap-2 px-4 py-2 border text-sm transition-colors ${
                        isActive
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-vitem-200 text-vitem-500 hover:border-vitem-900"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-vitem-300"}`} />
                      {isActive ? t.active : t.passive}
                    </button>
                    <input type="hidden" name="isActive" value={isActive ? "on" : "off"} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-vitem-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm text-vitem-500 hover:text-vitem-900"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || pdfUploading}
                    className="bg-vitem-900 text-white px-7 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
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

// ── Küçük yardımcı bileşenler ───────────────────────────────
function F({ label, name, required, type = "text", value, onChange, placeholder, defaultValue }: {
  label: string; name: string; required?: boolean; type?: string;
  value?: string; onChange?: (v: string) => void; placeholder?: string; defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <input
        type={type} name={name} required={required}
        value={onChange ? value : undefined}
        defaultValue={onChange ? undefined : defaultValue}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 bg-transparent transition-colors placeholder:text-vitem-300"
      />
    </div>
  );
}

function TA({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <textarea
        name={name} rows={3} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 bg-transparent resize-none transition-colors"
      />
    </div>
  );
}
