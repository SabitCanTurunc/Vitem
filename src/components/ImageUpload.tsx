"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-[200px] h-[120px] rounded-lg overflow-hidden border border-vitem-200">
            <div className="absolute top-2 right-2 z-10">
              <button 
                type="button" 
                onClick={() => onRemove(value)}
                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <img 
              src={value} 
              alt="Uploaded" 
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <CldUploadWidget 
            onSuccess={onUpload} 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          >
            {({ open }) => {
              const onClick = () => {
                open();
              };

              return (
                <button
                  type="button"
                  onClick={onClick}
                  className="flex flex-col items-center justify-center gap-2 w-[200px] h-[120px] bg-vitem-50 border-2 border-dashed border-vitem-200 rounded-lg hover:bg-vitem-100 hover:border-vitem-300 transition-all group"
                >
                  <ImagePlus className="w-6 h-6 text-vitem-400 group-hover:text-vitem-600" />
                  <span className="text-[10px] uppercase tracking-widest text-vitem-500">Upload Image</span>
                </button>
              );
            }}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
}
