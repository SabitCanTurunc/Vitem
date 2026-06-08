import { useTranslations } from "next-intl";

export default function LocationMap() {
  const tCommon = useTranslations("common");

  return (
    <div className="w-full relative bg-[#f8f8f8] overflow-hidden border border-vitem-200">
      <svg
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto min-h-[300px] object-cover"
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
        <g transform="translate(300, 150)">
          <circle cx="0" cy="0" r="4" fill="#6b7280" />
          <text
            x="12"
            y="2"
            fill="#111827"
            fontSize="11"
            fontFamily="sans-serif"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            {tCommon("store_title").toUpperCase()}
          </text>
          <text
            x="12"
            y="16"
            fill="#6b7280"
            fontSize="10"
            fontFamily="sans-serif"
          >
            İskenderun
          </text>
        </g>

        {/* Fabrika Marker */}
        <g transform="translate(600, 320)">
          <circle cx="0" cy="0" r="4" fill="#6b7280" />
          <text
            x="12"
            y="2"
            fill="#111827"
            fontSize="11"
            fontFamily="sans-serif"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            {tCommon("factory_title").toUpperCase()}
          </text>
          <text
            x="12"
            y="16"
            fill="#6b7280"
            fontSize="10"
            fontFamily="sans-serif"
          >
            Antakya
          </text>
        </g>

        {/* Decorative / Other minor markers just to make it look like a network */}
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
    </div>
  );
}
