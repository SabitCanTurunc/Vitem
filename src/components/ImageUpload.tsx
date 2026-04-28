"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAdminLangFromBrowser } from "@/app/admin/i18n";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
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

  async function handleFile(file: File) {
    if (!hasCloudinaryConfig) {
      setError(lang === "en" ? "Missing Cloudinary configuration. Please check .env variables." : "Cloudinary ayari eksik. Lutfen .env degiskenlerini kontrol edin.");
      return;
    }

    try {
      setError("");
      setIsUploading(true);

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

      onChange(data.secure_url);
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
      <div className="flex items-start gap-3 flex-wrap">
        {value ? (
          <div className="relative w-[160px] h-[100px] rounded-lg overflow-hidden border border-vitem-200 shrink-0">
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1.5 right-1.5 z-10 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600 shadow"
            >
              <X className="w-3 h-3" />
            </button>
            <img src={value} alt={lang === "en" ? "Image" : "Gorsel"} className="object-cover w-full h-full" />
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="flex flex-col items-center justify-center gap-2 w-[160px] h-[100px] bg-vitem-50 border-2 border-dashed border-vitem-200 rounded-lg hover:bg-vitem-100 hover:border-vitem-400 transition-all group disabled:opacity-60"
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 text-vitem-500 animate-spin" />
              ) : (
                <ImagePlus className="w-5 h-5 text-vitem-400 group-hover:text-vitem-700" />
              )}
              <span className="text-[10px] uppercase tracking-widest text-vitem-400">
                {isUploading ? (lang === "en" ? "Uploading..." : "Yukleniyor...") : (lang === "en" ? "Select Image" : "Gorsel Sec")}
              </span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
            />
          </>
        )}
      </div>
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
