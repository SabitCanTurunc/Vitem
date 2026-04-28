"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAdminLangFromBrowser } from "@/app/admin/i18n";

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function GalleryUpload({ value, onChange, label }: GalleryUploadProps) {
  const lang = getAdminLangFromBrowser();
  const [mounted, setMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const hasCloudinaryConfig = Boolean(cloudName && uploadPreset);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  async function uploadSingle(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset as string);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok || !data?.secure_url) {
      throw new Error(data?.error?.message || (lang === "en" ? "Upload failed." : "Yukleme basarisiz."));
    }

    return data.secure_url as string;
  }

  async function handleFiles(files: FileList) {
    if (!hasCloudinaryConfig) {
      setError(lang === "en" ? "Missing Cloudinary configuration. Please check .env variables." : "Cloudinary ayari eksik. Lutfen .env degiskenlerini kontrol edin.");
      return;
    }

    try {
      setError("");
      setIsUploading(true);
      const uploaded = await Promise.all(Array.from(files).map(uploadSingle));
      onChange([...value, ...uploaded]);
    } catch (err: any) {
      setError(err?.message || (lang === "en" ? "Upload failed." : "Yukleme basarisiz."));
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-1.5">
      {label && <p className="text-xs uppercase tracking-widest text-vitem-500">{label}</p>}
      <div className="flex items-start gap-2 flex-wrap">
        {value.map((url, idx) => (
          <div key={idx} className="relative w-[100px] h-[70px] rounded overflow-hidden border border-vitem-200 shrink-0">
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-1 right-1 z-10 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 shadow"
            >
              <X className="w-2.5 h-2.5" />
            </button>
            <img src={url} alt={`${lang === "en" ? "Image" : "Gorsel"} ${idx + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex flex-col items-center justify-center gap-1.5 w-[100px] h-[70px] bg-vitem-50 border-2 border-dashed border-vitem-200 rounded hover:bg-vitem-100 hover:border-vitem-400 transition-all group disabled:opacity-60"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 text-vitem-500 animate-spin" />
          ) : (
            <ImagePlus className="w-4 h-4 text-vitem-400 group-hover:text-vitem-700" />
          )}
          <span className="text-[9px] uppercase tracking-widest text-vitem-400">
            {isUploading ? (lang === "en" ? "Up..." : "Yuk...") : (lang === "en" ? "Add" : "Ekle")}
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files?.length) void handleFiles(files);
          }}
        />
      </div>
      <p className="text-[10px] text-vitem-400">{value.length} {lang === "en" ? "images" : "gorsel"}</p>
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      {!hasCloudinaryConfig && (
        <p className="text-[11px] text-amber-700">
          {lang === "en"
            ? "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are required."
            : "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ve NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET zorunlu."}
        </p>
      )}
    </div>
  );
}
