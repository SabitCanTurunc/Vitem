"use client";
import { useState } from "react";
import { Plus, Trash2, FolderOpen, MapPin, Calendar } from "lucide-react";
import { createProject, deleteProject } from "../../../../api/actions/adminActions";
import type { Project } from "@db/schema";

export default function ProjectsAdminClient({ projects }: { projects: Project[] }) {
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleCreate(formData: FormData) {
    setFormStatus("saving");
    const result = await createProject(formData);
    setFormStatus(result.success ? "saved" : "error");
    if (result.success) {
      setShowForm(false);
      setFormStatus("idle");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    await deleteProject(id);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-vitem-900">Projeler</h1>
          <p className="text-sm text-vitem-500 mt-1">{projects.length} toplam proje</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-vitem-900 text-white px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Yeni Proje
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form
          action={handleCreate}
          className="bg-white border border-vitem-200 p-8 mb-8 space-y-6"
        >
          <h2 className="text-lg font-light text-vitem-900 border-b border-vitem-100 pb-4">Yeni Proje Ekle</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Proje Adı (TR)" name="name" required />
            <Field label="Proje Adı (EN)" name="nameEn" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Konum" name="location" required />
            <Field label="Yıl" name="year" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Kategori (TR)" name="category" />
            <Field label="Kategori (EN)" name="categoryEn" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TextareaField label="Açıklama (TR)" name="description" />
            <TextareaField label="Açıklama (EN)" name="descriptionEn" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Öne Çıkan Görsel URL" name="featuredImage" />
            <Field label="Sıra" name="sortOrder" type="number" />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-vitem-100">
            <button
              type="submit"
              disabled={formStatus === "saving"}
              className="bg-vitem-900 text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-vitem-800 transition-colors disabled:opacity-50"
            >
              {formStatus === "saving" ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs uppercase tracking-widest text-vitem-500 hover:text-vitem-900 transition-colors"
            >
              İptal
            </button>
            {formStatus === "error" && <span className="text-red-500 text-xs">Hata oluştu.</span>}
          </div>
        </form>
      )}

      {/* Projects List */}
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
                    className="p-1.5 text-vitem-400 hover:text-red-600 transition-colors shrink-0"
                    aria-label="Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1 text-xs text-vitem-500">
                  {project.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {project.year}
                    </div>
                  )}
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
        !showForm && (
          <div className="text-center py-20 text-vitem-400">
            <FolderOpen className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p className="text-sm">Henüz proje eklenmedi.</p>
          </div>
        )
      )}
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 transition-colors bg-transparent"
      />
    </div>
  );
}

function TextareaField({ label, name }: { label: string; name: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-widest text-vitem-500">{label}</label>
      <textarea
        name={name}
        rows={3}
        className="w-full border-b border-vitem-200 py-2 text-sm text-vitem-900 focus:outline-none focus:border-vitem-900 transition-colors bg-transparent resize-none"
      />
    </div>
  );
}
