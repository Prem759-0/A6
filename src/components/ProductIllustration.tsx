import React from "react";

interface ProductIllustrationProps {
  type: string; // "tropical-green" | "herbal-trio" | "peppermint-naked" | "bamboo-chest" | "matcha-latte" | "nice-chai" | etc.
  badgeColor: string; // background color class
  className?: string;
}

export const ProductIllustration: React.FC<ProductIllustrationProps> = ({
  type,
  badgeColor,
  className = "",
}) => {
  // Return different SVG structures depending on product type to look like the real physical boxes!
  switch (type) {
    case "tropical-green":
    case "peppermint-sachets":
    default:
      return (
        <div className={`relative w-36 h-48 bg-white border border-neutral-200 rounded-lg shadow-sm flex flex-col overflow-hidden ${className}`}>
          {/* Top colored strip matching branding */}
          <div className="h-6 bg-[#8BC34A] flex items-center justify-center text-[8px] font-bold text-white tracking-widest font-display">
            ORGANIC TEA
          </div>
          {/* Main box content */}
          <div className="flex-1 p-3 flex flex-col justify-between items-center text-center">
            <span className="text-[7px] text-neutral-400 font-bold uppercase tracking-widest leading-none">Two Leaves / Whole Leaf</span>
            {/* Elegant botanical vector */}
            <div className="w-16 h-16 my-1 bg-emerald-50 rounded-full flex items-center justify-center border border-[#8BC34A]/20 relative overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#5D8B2C]">
                <path
                  d="M50,85 C50,85 45,55 25,45 C45,45 50,25 50,15 C50,25 55,45 75,45 C55,55 50,85 50,85 Z"
                  fill="currentColor"
                  fillOpacity="0.15"
                />
                <path
                  d="M50,85 C52,70 65,60 70,50 C62,50 52,65 50,85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M50,85 C48,70 35,60 30,50 C38,50 48,65 50,85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {/* Overlay citrus fruit or tropical leaf */}
              {type === "tropical-green" && (
                <div className="absolute bottom-1 right-2 w-5 h-5 bg-amber-400 rounded-full border border-amber-600 flex items-center justify-center text-[7px] font-black text-amber-900 shadow-sm">
                  ☀
                </div>
              )}
            </div>
            {/* Label box */}
            <div className="border border-neutral-300 px-1 py-1 rounded bg-stone-50 w-full min-h-[36px] flex flex-col justify-center">
              <h4 className="font-serif text-[10px] font-bold leading-tight text-neutral-800">
                {type === "tropical-green" ? "Tropical Green" : "Organic Peppermint"}
              </h4>
              <p className="text-[6px] text-neutral-500 tracking-wider">COMPOSTABLE SACHETS</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[6px] text-neutral-400 tracking-wider font-mono">15 WHOLE LEAF SACHETS</span>
            </div>
          </div>
        </div>
      );

    case "herbal-trio":
      return (
        <div className={`relative w-40 h-44 bg-[#FBE9E7] border border-neutral-300 rounded-lg shadow-sm flex flex-col overflow-hidden ${className}`}>
          {/* Top title bar */}
          <div className="h-5 bg-[#FF8A65] flex items-center justify-center text-[8px] font-bold text-white tracking-widest uppercase">
            Limited Edition
          </div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[7px] text-neutral-500 uppercase tracking-wider font-semibold">Trio Selection</span>
            <div className="flex gap-1 my-2">
              {/* Three little boxes */}
              <div className="w-8 h-12 bg-white border border-[#8BC34A] rounded flex flex-col justify-center items-center">
                <div className="w-full h-1.5 bg-[#8BC34A]"></div>
                <div className="text-[5px] scale-90 font-serif text-[#3E2723] pt-1 leading-none font-bold">Berry</div>
              </div>
              <div className="w-8 h-12 bg-white border border-red-400 rounded flex flex-col justify-center items-center shadow-sm scale-110">
                <div className="w-full h-1.5 bg-[#FF7043]"></div>
                <div className="text-[5px] scale-90 font-serif text-[#3E2723] pt-1 leading-none font-bold">Mint</div>
              </div>
              <div className="w-8 h-12 bg-white border border-amber-300 rounded flex flex-col justify-center items-center">
                <div className="w-full h-1.5 bg-amber-300"></div>
                <div className="text-[5px] scale-90 font-serif text-[#3E2723] pt-1 leading-none font-bold">Chamo</div>
              </div>
            </div>
            <div className="border border-neutral-400/40 p-1 rounded bg-[#FFF9C4]/30 w-full">
              <h4 className="font-serif text-[10px] font-extrabold text-neutral-800">Herbal Tea Trio</h4>
              <p className="text-[5px] text-neutral-600 font-medium tracking-wide">3 PACKS / DECAFFEINATED</p>
            </div>
          </div>
        </div>
      );

    case "peppermint-naked":
    case "turmeric-naked":
      const isTurmeric = type === "turmeric-naked";
      return (
        <div className={`relative w-36 h-48 bg-[#CFD8DC]/30 border-2 border-neutral-300 rounded-2xl shadow-sm flex flex-col overflow-hidden ${className}`}>
          {/* Matte bag style zip seal indicator */}
          <div className="h-3 bg-[#E0E0E0] border-b border-neutral-300 flex items-center justify-center gap-1">
            <div className="w-10 h-0.5 bg-neutral-400 rounded"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
          </div>
          
          <div className="flex-1 p-3 flex flex-col justify-between items-center text-center">
            {/* Matte texture badge */}
            <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-300 flex items-center justify-center shadow-inner relative">
              <svg viewBox="0 0 24 24" className={`w-6 h-6 ${isTurmeric ? "text-amber-500" : "text-teal-600"}`}>
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" fill="currentColor" />
                <path d="M12,6C9.79,6 8,7.79 8,10C8,11.85 9.25,13.4 11,13.85V18H13V13.85C14.75,13.4 16,11.85 16,10C16,7.79 14.21,6 12,6Z" fill="currentColor" opacity="0.3" />
              </svg>
              <div className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-[5px] font-bold px-1 py-0.5 leading-none">
                NAKED!
              </div>
            </div>

            <div className="w-full">
              <div className="text-[5px] text-neutral-500 font-mono tracking-widest leading-none">BULK SAC SYSTEM</div>
              <h4 className="font-serif text-[10px] font-extrabold text-neutral-800 tracking-tight leading-snug mt-1">
                {isTurmeric ? "Turmeric Antioxidant" : "Organic Peppermint"}
              </h4>
              <span className="inline-block bg-[#009688]/15 text-[#00796B] text-[6px] font-bold tracking-widest px-2 py-0.5 rounded-full mt-1">
                50 NAKED SACHETS
              </span>
            </div>

            <div className="w-full border-t border-dashed border-neutral-300 pt-1">
              <p className="text-[5px] text-neutral-400 font-semibold leading-normal">
                No individual wrappers inside. <br/>Save waste, preserve flavor!
              </p>
            </div>
          </div>
        </div>
      );

    case "bamboo-chest":
      return (
        <div className={`relative w-44 h-40 bg-[#DFD5C6] border-2 border-[#8D6E63] rounded-md shadow-md flex flex-col justify-between overflow-hidden ${className}`}>
          {/* Wood grain highlight */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:8px_100%]"></div>
          {/* Top lid bezel */}
          <div className="h-5 bg-[#A1887F] border-b-2 border-[#5D4037] flex items-center justify-between px-3 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow"></div>
            <span className="text-[6px] text-[#3E2723] uppercase font-bold tracking-widest">Premium Bamboo</span>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow"></div>
          </div>
          {/* Inside chest divider display */}
          <div className="p-2 flex-1 flex flex-col justify-between relative z-10">
            <div className="grid grid-cols-4 gap-1 flex-1 py-1">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 border border-[#D7CCC8] rounded flex items-center justify-center relative overflow-hidden"
                  style={{ opacity: 0.8 + (idx % 3) * 0.1 }}
                >
                  {/* Miniature tea tags inside chest */}
                  <div className="w-2.5 h-3 bg-red-400 rounded-sm"></div>
                  {idx % 2 === 0 && <div className="absolute top-0 right-0 w-1 h-1 bg-amber-300 rounded-full"></div>}
                </div>
              ))}
            </div>

            <div className="bg-amber-50/95 border border-[#8D6E63] p-1 rounded-sm text-center">
              <h4 className="font-serif text-[9px] font-black text-[#5D4037] leading-none uppercase tracking-wide">
                Classic Bamboo Chest
              </h4>
              <p className="text-[5px] text-neutral-600 mt-0.5 leading-none">64 Biodegradable Sachets</p>
            </div>
          </div>
        </div>
      );

    case "matcha-latte":
    case "nice-chai":
    case "golden-latte":
      const isMatcha = type === "matcha-latte";
      const isGolden = type === "golden-latte";
      const mainCol = isMatcha ? "bg-[#33691E]" : isGolden ? "bg-amber-600" : "bg-[#D84315]";
      const accentBg = isMatcha ? "bg-[#DCEDC8]" : isGolden ? "bg-[#FFF9C4]" : "bg-[#FFE0B2]";
      return (
        <div className={`relative w-36 h-48 ${accentBg} border border-neutral-300 rounded-2xl shadow-sm flex flex-col overflow-hidden ${className}`}>
          {/* Logo container brand block */}
          <div className={`h-11 ${mainCol} flex flex-col items-center justify-center text-white px-2`}>
            <div className="text-[5px] uppercase font-semibold letter tracking-widest text-[#FFF9C4] opacity-90 leading-none">
              NICE LATTE
            </div>
            <div className="font-serif text-[11px] font-black tracking-tight leading-none mt-1">
              {isMatcha ? "Matcha" : isGolden ? "Turmeric" : "Nice Chai"}
            </div>
          </div>

          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            {/* Nice circular text emblem */}
            <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 flex flex-col items-center justify-center relative shadow-sm my-1">
              <span className="text-[6px] font-display font-bold text-neutral-400 uppercase tracking-widest scale-75">SWEETENED</span>
              {/* Cup shape */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-neutral-700">
                <path d="M2,21H20V19H2V21M20,8H18V5H20V8M20,3H4V17A3,3 0 0,0 7,20H15A3,3 0 0,0 18,17V10H20A2,2 0 0,0 22,8V5A2,2 0 0,0 20,3Z" fill="currentColor" />
                {/* Steaming lines */}
                <path d="M6,1V3H8V1H6M10,1V3H12V1H10M14,1V3H16V1H14Z" fill="currentColor" fillOpacity="0.4" />
              </svg>
              {isMatcha && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 w-2 h-2 rounded-full bg-lime-500 shadow-md"></div>}
            </div>

            <div className="w-full">
              <span className="text-[5px] text-neutral-400 font-mono tracking-widest block">BARISTA BLEND</span>
              <h5 className="font-serif text-[8px] font-bold text-neutral-800 leading-tight">
                {isMatcha ? "Stone Ground Uji" : isGolden ? "Ginger & Roots" : "Not Too Sweet / Masala"}
              </h5>
            </div>

            <div className="w-full p-1 bg-white/70 rounded-md border border-neutral-200 text-[5px] text-neutral-500 font-medium leading-none">
              Mix with Hot Milk or Water
            </div>
          </div>
        </div>
      );

    case "organic-matcha-mint":
    case "jasmine-petal":
    case "mountain-chai":
      const isChai = type === "mountain-chai";
      const isMint = type === "organic-matcha-mint";
      const boxCol = isChai ? "from-orange-100 to-orange-200" : isMint ? "from-green-100 to-green-200" : "from-purple-100 to-purple-200";
      const borderCol = isChai ? "border-orange-300" : isMint ? "border-green-300" : "border-purple-300";
      const barCol = isChai ? "bg-orange-600" : isMint ? "bg-green-600" : "bg-purple-600";
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-br ${boxCol} border ${borderCol} rounded-lg shadow-sm flex flex-col overflow-hidden ${className}`}>
          <div className={`h-4 ${barCol} flex items-center justify-center text-[6px] text-white tracking-widest font-black uppercase font-mono`}>
            {isChai ? "Spiced" : isMint ? "Pure Matcha" : "Special Reserve"}
          </div>
          <div className="flex-1 p-2 flex flex-col justify-between text-center items-center">
            <span className="text-[5px] text-neutral-600 font-mono leading-none tracking-widest">TWO LEAVES</span>
            <div className="my-1.5 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center border border-neutral-300/60 relative">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-700">
                <path d="M17,18L12,15L7,18V5H17V18Z" fill="currentColor" fillOpacity="0.4" />
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" fill="currentColor" />
              </svg>
            </div>
            <div className="bg-white/90 border border-neutral-200 rounded px-1 py-0.5 w-full">
              <h5 className="font-serif text-[7px] font-extrabold text-neutral-800 leading-none">
                {isChai ? "Mountain High Chai" : isMint ? "Organic Matcha Mint" : "Jasmine Petal"}
              </h5>
              <p className="text-[4.5px] text-neutral-500 font-mono mt-0.5 leading-none tracking-wider">PREMIUM TEA SELECTION</p>
            </div>
          </div>
        </div>
      );

    case "matcha-canister":
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-b from-emerald-800 to-emerald-950 border-2 border-black rounded-xl shadow-lg flex flex-col overflow-hidden ${className}`}>
          {/* Gold Lid */}
          <div className="h-3.5 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 border-b border-black"></div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center relative">
            <span className="text-[5px] text-amber-300 font-mono font-bold tracking-widest uppercase mt-0.5">UJI JAPAN</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative my-1">
              <span className="text-xl">🍵</span>
            </div>
            <div className="bg-[#FAF9F5] border border-black rounded p-1 w-full text-neutral-900 leading-none">
              <span className="font-serif text-[8px] font-black block">Matcha Sieve</span>
              <span className="text-[5px] text-stone-500 block uppercase tracking-wider mt-0.5Scale-90">CEREMONIAL</span>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-neutral-400 to-neutral-200"></div>
        </div>
      );

    case "jasmine-pearls":
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-b from-purple-800 to-purple-950 border-2 border-black rounded-xl shadow-lg flex flex-col overflow-hidden ${className}`}>
          {/* Wood Lid */}
          <div className="h-3.5 bg-gradient-to-r from-amber-600 to-amber-900 border-b border-black"></div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[5px] text-purple-200 font-mono tracking-widest uppercase font-bold mt-0.5">DRAGON PEARLS</span>
            <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center flex-wrap p-1 relative my-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full border border-emerald-600 m-0.5 scale-95 shrink-0"></div>
              <div className="w-2 h-2 bg-emerald-300 rounded-full border border-emerald-600 m-0.5 scale-110 shrink-0"></div>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full border border-emerald-700 m-0.5 shrink-0"></div>
            </div>
            <div className="bg-[#FAF9F5] border border-black rounded p-1 w-full text-neutral-900 leading-none">
              <span className="font-serif text-[7.5px] font-black block">Green Pearls</span>
              <span className="text-[5px] text-purple-705 block uppercase mt-0.5">JASMINE</span>
            </div>
          </div>
        </div>
      );

    case "earl-grey":
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-b from-[#1565C0] to-[#0D47A1] border-2 border-black rounded-xl shadow-lg flex flex-col overflow-hidden ${className}`}>
          <div className="h-2.5 bg-[#FFD54F] border-b border-black flex items-center justify-center">
            <div className="w-8 h-0.5 bg-black/45"></div>
          </div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[5px] text-white/80 font-mono tracking-wider">ROYAL IMPERIAL</span>
            <div className="w-10 h-10 my-0.5 rounded-full bg-white/5 border border-amber-300/30 flex items-center justify-center text-lg">
              👑
            </div>
            <div className="bg-[#FAF9F5] border border-black rounded p-1.5 w-full text-neutral-900 leading-none font-sans">
              <span className="font-serif text-[7.5px] font-extrabold block">Royal Earl Grey</span>
              <span className="text-[5px] text-blue-900 block mt-0.5 tracking-wide">ORGANIC</span>
            </div>
          </div>
        </div>
      );

    case "iced-pouches":
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-b from-rose-500 to-pink-700 border-2 border-black rounded-xl shadow-lg flex flex-col overflow-hidden ${className}`}>
          <div className="h-4 bg-orange-400 border-b border-black flex items-center justify-center gap-1">
            <div className="w-8 h-0.5 bg-neutral-950 opacity-20 rounded"></div>
            <div className="w-1 h-1 rounded-full bg-neutral-950 opacity-35"></div>
          </div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[5px] text-neutral-900 font-mono tracking-widest uppercase font-bold mt-0.5">BREEZE COLD BREW</span>
            <div className="w-8 h-8 flex items-center justify-center relative my-1 text-xl">
              🌺
            </div>
            <div className="bg-[#FAF9F5] border border-black rounded p-1 w-full text-neutral-900 leading-none">
              <span className="font-serif text-[7.5px] font-black block">Hibiscus Breeze</span>
              <span className="text-[5px] text-rose-500 block uppercase tracking-wide mt-0.5">ICED POUCHES</span>
            </div>
          </div>
        </div>
      );

    case "chamomile-serene":
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-b from-yellow-300 to-amber-500 border-2 border-black rounded-xl shadow-lg flex flex-col overflow-hidden ${className}`}>
          <div className="h-3 bg-white/40 border-b border-black"></div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[5px] text-neutral-800 font-mono tracking-wider font-extrabold leading-none mt-0.5">CAFFEINE-FREE ALPINES</span>
            <div className="w-9 h-9 rounded-full bg-white/80 border border-amber-400 flex items-center justify-center text-lg my-1">
              🌼
            </div>
            <div className="bg-[#FAF9F5] border border-black rounded p-1 w-full text-neutral-900 leading-none">
              <span className="font-serif text-[7.5px] font-black block">Alpine Chamomile</span>
              <span className="text-[5px] text-amber-750 block uppercase tracking-wide mt-0.5 font-bold">BIO-SACHETS</span>
            </div>
          </div>
        </div>
      );

    case "peach-blossom":
      return (
        <div className={`relative w-28 h-36 bg-gradient-to-b from-orange-400 to-rose-400 border-2 border-black rounded-xl shadow-lg flex flex-col overflow-hidden ${className}`}>
          <div className="h-3.5 bg-[#4CAF50] border-b border-black"></div>
          <div className="flex-1 p-2 flex flex-col justify-between items-center text-center">
            <span className="text-[5px] text-white font-mono tracking-wider leading-none font-bold mt-0.5">FRUIT BLOSSOMS</span>
            <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-lg my-1">
              🍑
            </div>
            <div className="bg-[#FAF9F5] border border-black rounded p-1.5 w-full text-neutral-900 leading-none">
              <span className="font-serif text-[7.5px] font-black block">Peach Blossom</span>
              <span className="text-[5px] text-amber-805 block uppercase tracking-wide mt-0.5">DELUXE TIN</span>
            </div>
          </div>
        </div>
      );
  }
};
