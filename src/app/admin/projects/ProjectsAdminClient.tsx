"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, FolderOpen, MapPin, Calendar, X, Loader2 } from "lucide-react";
import { createProject, deleteProject } from "@api/actions/adminActions";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@db/schema";
import ImageUpload from "@/components/ImageUpload";
import GalleryUpload from "@/components/GalleryUpload";
import { type AdminLang, getAdminLangFromBrowser } from "../i18n";

export default function ProjectsAdminClient({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [lang, setLang] = useState<AdminLang>("tr");
  useEffect(() => {
    setLang(getAdminLangFromBrowser());
  }, []);
  const t = {
    title: lang === "en" ? "Projects" : "Projeler",
    total: lang === "en" ? "total projects" : "toplam proje",
    newProject: lang === "en" ? "New Project" : "Yeni Proje",
    error: lang === "en" ? "An error occurred." : "Hata oluştu.",
    confirmDelete: lang === "en" ? "Are you sure you want to delete this project?" : "Bu projeyi silmek istediğinize emin misiniz?",
    empty: lang === "en" ? "No projects added yet." : "Henüz proje eklenmedi.",
    modalTitle: lang === "en" ? "New Project" : "Yeni Proje",
    nameTr: lang === "en" ? "Project Name (TR) *" : "Proje Adı (TR) *",
    nameEn: lang === "en" ? "Project Name (EN)" : "Proje Adı (EN)",
    location: lang === "en" ? "Location *" : "Konum *",
    year: lang === "en" ? "Year *" : "Yıl *",
    categoryTr: lang === "en" ? "Category (TR)" : "Kategori (TR)",
    categoryEn: lang === "en" ? "Category (EN)" : "Kategori (EN)",
    descriptionTr: lang === "en" ? "Description (TR)" : "Açıklama (TR)",
    descriptionEn: lang === "en" ? "Description (EN)" : "Açıklama (EN)",
    featuredImage: lang === "en" ? "Featured Image" : "Öne Çıkan Görsel",
    order: lang === "en" ? "Order" : "Sıra",
    gallery: lang === "en" ? "Gallery" : "Galeri",
    cancel: lang === "en" ? "Cancel" : "İptal",
    save: lang === "en" ? "Save" : "Kaydet",
    saving: lang === "en" ? "Saving..." : "Kaydediliyor...",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [imageVal, setImageVal] = useState("");
  const [galleryVal, setGalleryVal] = useState<string[]>([]);

  function openCreate() {
    setImageVal(""); setGalleryVal([]);
    setIsModalOpen(true);
  }

  async function handleCreate(formData: FormData) {
    setIsSubmitting(true);
    const result = await createProject(formData);
    setIsSubmitting(false);
    if (result.success) {
      setIsModalOpen(false);
      router.refresh();
    } else {
      alert(t.error);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(t.confirmDelete)) return;
    setDeletingId(id);
    await deleteProject(id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-vitem-900">{t.title}</h1>
          <p className="text-sm text-vitem-500 mt-1">{projects.length} {t.total}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-vitem-900 text-white px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.newProject}
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.id} className="bg-white border border-vitem-200 overflow-hidden group">
              {project.featuredImage ? (
                <div className="aspect-[4/3] overflow-hidden bg-vitem-100">
                  <img
                    src={project.featuredImage}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-vitem-100 flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-vitem-300" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-medium text-vitem-900 leading-tight">{project.name}</h3>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deletingId === project.id}
                    className="p-1.5 text-vitem-400 hover:text-red-600 transition-colors shrink-0 disabled:opacity-40"
                  >
                    {deletingId === project.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="space-y-1 text-xs text-vitem-500">
                  {project.location && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{project.location}</div>}
                  {project.year && <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{project.year}</div>}
                </div>
                {project.category && (
                  <span className="mt-3 inline-block text-[10px] uppercase tracking-widest border border-vitem-200 px-2 py-0.5 text-vitem-500">
                    {project.category}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-vitem-400">
          <FolderOpen className="w-10 h-10 mx-auto mb-4 opacity-40" />
          <p className="text-sm">{t.empty}</p>
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
            >
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-vitem-100">
                <h2 className="text-xl font-serif font-light text-vitem-900">{t.modalTitle}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-vitem-400 hover:text-vitem-900 p-1"><X className="w-5 h-5" /></button>
              </div>

              <form action={handleCreate} className="px-8 py-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.nameTr} name="name" required />
                  <F label={t.nameEn} name="nameEn" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.location} name="location" required />
                  <F label={t.year} name="year" required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <F label={t.categoryTr} name="category" />
                  <F label={t.categoryEn} name="categoryEn" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <TA label={t.descriptionTr} name="description" />
                  <TA label={t.descriptionEn} name="descriptionEn" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <ImageUpload label={t.featuredImage} value={imageVal} onChange={setImageVal} />
                    <input type="hidden" name="featuredImage" value={imageVal} />
                  </div>
                  <F label={t.order} name="sortOrder" type="number" />
                </div>
                <div className="space-y-1.5">
                  <GalleryUpload label={t.gallery} value={galleryVal} onChange={setGalleryVal} />
                  <input type="hidden" name="gallery" value={JSON.stringify(galleryVal)} />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-vitem-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm text-vitem-500 hover:text-vitem-900">{t.cancel}</button>
                  <button type="submit" disabled={isSubmitting} className="bg-vitem-900 text-white px-7 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 disabled:opacity-50">
                    {isSubmitting ? t.saving : t.save}
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

function F({ label, name, required, type = "text" }: { label: string; name: string; required?: boolean; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <input type={type} name={name} required={required}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 transition-colors bg-transparent"
      />
    </div>
  );
}

function TA({ label, name }: { label: string; name: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <textarea name={name} rows={3}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 transition-colors bg-transparent resize-none"
      />
    </div>
  );
}
