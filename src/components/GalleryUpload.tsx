"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import { useState, useEffect } from "react";

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}

export default function GalleryUpload({ value, onChange, label }: GalleryUploadProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
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
            <img src={url} alt={`Görsel ${idx + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
        <CldUploadWidget
          onSuccess={(result: any) => onChange([...value, result.info.secure_url])}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{ multiple: true }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex flex-col items-center justify-center gap-1.5 w-[100px] h-[70px] bg-vitem-50 border-2 border-dashed border-vitem-200 rounded hover:bg-vitem-100 hover:border-vitem-400 transition-all group"
            >
              <ImagePlus className="w-4 h-4 text-vitem-400 group-hover:text-vitem-700" />
              <span className="text-[9px] uppercase tracking-widest text-vitem-400">Ekle</span>
            </button>
          )}
        </CldUploadWidget>
      </div>
      <p className="text-[10px] text-vitem-400">{value.length} görsel</p>
    </div>
  );
}
