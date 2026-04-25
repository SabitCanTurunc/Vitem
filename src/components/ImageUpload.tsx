"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

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
            <img src={value} alt="Görsel" className="object-cover w-full h-full" />
          </div>
        ) : (
          <CldUploadWidget
            onSuccess={(result: any) => onChange(result.info.secure_url)}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex flex-col items-center justify-center gap-2 w-[160px] h-[100px] bg-vitem-50 border-2 border-dashed border-vitem-200 rounded-lg hover:bg-vitem-100 hover:border-vitem-400 transition-all group"
              >
                <ImagePlus className="w-5 h-5 text-vitem-400 group-hover:text-vitem-700" />
                <span className="text-[10px] uppercase tracking-widest text-vitem-400">Görsel Yükle</span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
}
