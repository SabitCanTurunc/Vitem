"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

type LocationInfo = {
  id: "store" | "factory";
  titleKey: string;
  subtitle: string;
  imageSrc: string;
};

export default function LocationMap() {
  const tCommon = useTranslations("common");
  const [activeLocation, setActiveLocation] = useState<LocationInfo | null>(null);

  const handleLocationClick = (info: LocationInfo) => {
    setActiveLocation(info);
  };

  return (
    <div className="w-full relative bg-[#f8f8f8] overflow-hidden border border-vitem-200 min-h-[400px]">
      <svg
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto min-h-[400px] object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Abstract Roads / Network Lines */}
        <g stroke="#e5e7eb" strokeWidth="1.5">
          {/* Main vertical-ish artery */}
          <path d="M 300,50 L 400,200 L 420,350 L 350,500" />
          {/* Main horizontal-ish artery */}
          <path d="M 100,220 L 400,200 L 600,250 L 900,280" />
          {/* Connecting lines */}
          <path d="M 300,50 L 150,150 L 100,220" />
          <path d="M 400,200 L 550,100" />
          <path d="M 600,250 L 700,400 L 900,410" />
          <path d="M 420,350 L 500,450" />
          <path d="M 550,100 L 750,80" />
          <path d="M 450,220 L 550,350 L 700,400" />
        </g>

        {/* İskenderun Mağaza Marker */}
        <g 
          transform="translate(300, 150)" 
          className="cursor-pointer group"
          onClick={() => handleLocationClick({
            id: "store",
            titleKey: "store_title",
            subtitle: "İskenderun",
            imageSrc: "/images/store_interior.png"
          })}
        >
          {/* Clickable Area */}
          <rect x="-15" y="-10" width="160" height="35" fill="transparent" />
          <circle cx="0" cy="0" r="4" fill="#6b7280" className="group-hover:fill-vitem-900 transition-colors" />
          <text
            x="12"
            y="2"
            fill="#111827"
            fontSize="11"
            fontFamily="sans-serif"
            fontWeight="500"
            letterSpacing="0.05em"
            className="group-hover:fill-vitem-900 transition-colors"
          >
            {tCommon("store_title").toUpperCase()}
          </text>
          <text
            x="12"
            y="16"
            fill="#6b7280"
            fontSize="10"
            fontFamily="sans-serif"
            className="group-hover:fill-vitem-900 transition-colors"
          >
            İskenderun
          </text>
        </g>

        {/* Fabrika Marker */}
        <g 
          transform="translate(600, 320)" 
          className="cursor-pointer group"
          onClick={() => handleLocationClick({
            id: "factory",
            titleKey: "factory_title",
            subtitle: "Antakya",
            imageSrc: "/images/factory_interior.png"
          })}
        >
          {/* Clickable Area */}
          <rect x="-15" y="-10" width="120" height="35" fill="transparent" />
          <circle cx="0" cy="0" r="4" fill="#6b7280" className="group-hover:fill-vitem-900 transition-colors" />
          <text
            x="12"
            y="2"
            fill="#111827"
            fontSize="11"
            fontFamily="sans-serif"
            fontWeight="500"
            letterSpacing="0.05em"
            className="group-hover:fill-vitem-900 transition-colors"
          >
            {tCommon("factory_title").toUpperCase()}
          </text>
          <text
            x="12"
            y="16"
            fill="#6b7280"
            fontSize="10"
            fontFamily="sans-serif"
            className="group-hover:fill-vitem-900 transition-colors"
          >
            Antakya
          </text>
        </g>

        {/* Decorative / Other minor markers */}
        <g transform="translate(420, 260)" opacity="0.4">
          <circle cx="0" cy="0" r="3" fill="#9ca3af" />
          <text x="8" y="2" fill="#6b7280" fontSize="9" fontFamily="sans-serif">BELEN</text>
        </g>
        <g transform="translate(200, 200)" opacity="0.4">
          <circle cx="0" cy="0" r="3" fill="#9ca3af" />
          <text x="8" y="2" fill="#6b7280" fontSize="9" fontFamily="sans-serif">ARSUZ</text>
        </g>
        <g transform="translate(720, 220)" opacity="0.4">
          <circle cx="0" cy="0" r="3" fill="#9ca3af" />
          <text x="8" y="2" fill="#6b7280" fontSize="9" fontFamily="sans-serif">DEFNE</text>
        </g>

      </svg>

      {/* Overlay Modal */}
      <AnimatePresence>
        {activeLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={() => setActiveLocation(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white p-2 shadow-2xl relative w-full max-w-md border border-vitem-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-4 -right-4 bg-white text-vitem-900 rounded-full p-2 shadow hover:bg-vitem-50 transition-colors z-20 border border-vitem-200"
                onClick={() => setActiveLocation(null)}
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-vitem-100">
                <Image
                  src={activeLocation.imageSrc}
                  alt={tCommon(activeLocation.titleKey)}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-serif text-vitem-900 tracking-wider">
                  {tCommon(activeLocation.titleKey)}
                </h3>
                <p className="text-sm text-vitem-500 mt-3 font-light leading-relaxed">
                  {tCommon(`address_${activeLocation.id}_line1`)} <br />
                  {tCommon(`address_${activeLocation.id}_line2`)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
