import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Sliders, Sparkles, Package, Paintbrush, Check, Trash2, Heart, ShieldCheck } from "lucide-react";

interface CanisterSize {
  name: "Medium" | "Large" | "Giant";
  volume: string;
  capacity: string;
  price: number;
  heightClass: string;
  widthClass: string;
}

interface CanisterColor {
  id: string;
  name: string;
  bgHex: string;
  gradientFrom: string;
  gradientTo: string;
  accentText: string;
  badgeBg: string;
}

interface CanisterPattern {
  id: string;
  name: string;
  icon: string;
  svgOverlay: React.ReactNode;
}

export const CanisterCustomizer: React.FC = () => {
  const { addToCart } = useShop();

  // 1. STATE DEFINITIONS
  const [size, setSize] = useState<"Medium" | "Large" | "Giant">("Large");
  const [colorId, setColorId] = useState("emerald-green");
  const [patternId, setPatternId] = useState("mountain-pines");
  const [teaType, setTeaType] = useState("Organic Tropical Green");
  const [customLabel, setCustomLabel] = useState("Barista Select Blend");
  const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);

  // 2. CONFIGURATION DATA
  const SIZES: CanisterSize[] = [
    {
      name: "Medium",
      volume: "8 oz",
      capacity: "Holds 50 Sachets",
      price: 15.95,
      heightClass: "h-48",
      widthClass: "w-36",
    },
    {
      name: "Large",
      volume: "16 oz",
      capacity: "Holds 100 Sachets",
      price: 24.95,
      heightClass: "h-56",
      widthClass: "w-40",
    },
    {
      name: "Giant",
      volume: "32 oz",
      capacity: "Holds 200 Sachets",
      price: 39.95,
      heightClass: "h-64",
      widthClass: "w-48",
    },
  ];

  const COLORS: CanisterColor[] = [
    {
      id: "emerald-green",
      name: "Emerald Pine",
      bgHex: "#0D5C3A",
      gradientFrom: "from-[#0D5C3A]",
      gradientTo: "to-[#083E26]",
      accentText: "text-emerald-100",
      badgeBg: "bg-emerald-600",
    },
    {
      id: "royal-blue",
      name: "Indigo Mist",
      bgHex: "#113A7A",
      gradientFrom: "from-[#113A7A]",
      gradientTo: "to-[#081F47]",
      accentText: "text-[#E0F2F1]",
      badgeBg: "bg-blue-600",
    },
    {
      id: "roasted-ochre",
      name: "Canyon Ochre",
      bgHex: "#B85D14",
      gradientFrom: "from-[#B85D14]",
      gradientTo: "to-[#7E3D0A]",
      accentText: "text-[#FFE0B2]",
      badgeBg: "bg-amber-600",
    },
    {
      id: "coral-rose",
      name: "Shed Rose",
      bgHex: "#D3435C",
      gradientFrom: "from-[#D3435C]",
      gradientTo: "to-[#8F2336]",
      accentText: "text-[#FFEBEF]",
      badgeBg: "bg-rose-600",
    },
    {
      id: "cosmic-charcoal",
      name: "Slate Carbon",
      bgHex: "#2C3539",
      gradientFrom: "from-[#2C3539]",
      gradientTo: "to-[#111618]",
      accentText: "text-neutral-300",
      badgeBg: "bg-neutral-700",
    },
  ];

  const PATTERNS: CanisterPattern[] = [
    {
      id: "mountain-pines",
      name: "Mountain Pines",
      icon: "🌲",
      svgOverlay: (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-15 text-white pointer-events-none">
          <path d="M10,90 L20,70 L30,90 M25,90 L35,65 L45,90 M40,90 L55,55 L70,90 M60,90 L75,60 L90,90" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "cherry-blossoms",
      name: "Cherry Petals",
      icon: "🌸",
      svgOverlay: (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20 text-white pointer-events-none">
          <circle cx="20" cy="30" r="3" fill="currentColor" />
          <circle cx="25" cy="27" r="2.5" fill="currentColor" />
          <circle cx="22" cy="34" r="3.2" fill="currentColor" />
          <circle cx="70" cy="40" r="4" fill="currentColor" />
          <circle cx="75" cy="45" r="3.5" fill="currentColor" />
          <circle cx="45" cy="70" r="3" fill="currentColor" />
          <circle cx="50" cy="75" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "retro-checker",
      name: "Deco Grid",
      icon: "🏁",
      svgOverlay: (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10 text-white pointer-events-none">
          <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: "botanical-leaves",
      name: "Forest Leaves",
      icon: "🍃",
      svgOverlay: (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-15 text-white pointer-events-none">
          <path d="M15,20 C30,10 40,30 25,40 C15,30 10,25 15,20 Z" fill="currentColor" />
          <path d="M75,60 C85,50 95,70 85,80 C75,70 70,65 75,60 Z" fill="currentColor" />
          <path d="M45,30 C55,20 65,40 55,50 C45,40 40,35 45,30 Z" fill="currentColor" />
        </svg>
      )
    }
  ];

  const TEAS = [
    "Organic Tropical Green",
    "Organic Mountain High Chai",
    "Organic Peppermint Tea",
    "Decaf Organic Chamomile",
    "Golden Turmeric Antioxidant",
    "Jasmine Petal Green Pearl"
  ];

  // 3. SELECTION RESOLUTION
  const selectedSizeInfo = SIZES.find((s) => s.name === size) || SIZES[1];
  const selectedColorInfo = COLORS.find((c) => c.id === colorId) || COLORS[0];
  const selectedPatternInfo = PATTERNS.find((p) => p.id === patternId) || PATTERNS[0];

  const handleCreateCanister = () => {
    const canisterId = `canister-${Date.now()}`;
    const productData = {
      id: canisterId,
      name: `Custom ${size} Canister (${selectedColorInfo.name})`,
      price: selectedSizeInfo.price,
      image: "matcha-canister",
      badgeText: `Sachets Filled: ${teaType}`,
      description: `Bespoke tea tin featuring "${selectedPatternInfo.name}" engraved pattern, custom text detail: "${customLabel}". Beautifully packed with premium whole-leaf ${teaType} sachets.`,
      isFromPrice: false,
      bgGradient: "from-amber-50 to-amber-100",
      rating: 5.0,
      reviewCount: 1
    };
    
    addToCart(productData);
    setIsAddedSuccessfully(true);
    setTimeout(() => {
      setIsAddedSuccessfully(false);
    }, 4000);
  };

  return (
    <section 
      className="bg-[#1B203E] text-white py-16 px-4 md:py-24 md:px-8 border-b-4 border-black relative overflow-hidden"
      id="canister-builder-section"
    >
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40"></div>
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block banner */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-block bg-[#00E676] text-black text-[10px] md:text-xs font-black px-4.5 py-1.5 border-2 border-black shadow-retro uppercase tracking-widest leading-none">
            Tin Customizer
          </div>
          <h2 className="font-serif italic font-black text-3.5xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
            Build Your Custom Keepsake Tea Canister
          </h2>
          <p className="text-[#A5D6A7] text-xs md:text-sm font-light max-w-xl leading-relaxed">
            Choose your size, premium metallic powder-coat color, engraved pattern overlay, select your favorite tea fill, and add your custom label engraving!
          </p>
        </div>

        {/* Dynamic Canvas + Settings Panel Row */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Live Changing Interactive Presentation Container */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border-2 border-white/15 backdrop-blur-md relative min-h-[460px] shadow-retro">
            
            {/* Ambient metallic sheen shadow reflection background */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-400/10 via-[#FFF9C4]/5 to-[#E57373]/10 blur-3xl rounded-full opacity-60 pointer-events-none"></div>

            {/* Glowing active visual specs tags upper left block */}
            <div className="absolute top-4 left-4 flex flex-col text-left space-y-1 font-mono text-[9px] text-[#A5D6A7] opacity-80 leading-tight">
              <span>CANISTER SPECIFICATIONS:</span>
              <span>• METAL: RUST-RESISTANT TINPLATE</span>
              <span>• PATTERN: {selectedPatternInfo.name.toUpperCase()}</span>
              <span>• VOL: {selectedSizeInfo.volume} / {selectedSizeInfo.capacity.toUpperCase()}</span>
            </div>

            {/* Floating Live Indicator Badge */}
            <div className="absolute top-4 right-4 bg-white/5 border border-white/20 px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" /> Real-time Render
            </div>

            {/* THE CANISTER SHAPE CONTAINER (SPATIAL SCALE BASED ON SIZE STATE) */}
            <div className="relative flex flex-col items-center justify-end h-72 w-64 pt-6 mt-6 transition-all duration-500">
              
              <div 
                className={`relative rounded-3xl shadow-2xl flex flex-col overflow-hidden border-3 border-black transform transition-all duration-500 ease-out ${selectedSizeInfo.heightClass} ${selectedSizeInfo.widthClass}`}
                style={{
                  background: `linear-gradient(135deg, ${selectedColorInfo.bgHex}, ${selectedColorInfo.gradientFrom.replace("from-[", "").replace("]", "")})`
                }}
              >
                {/* 1. Metal Top Tin Lid Bezel */}
                <div className="h-6 w-full bg-gradient-to-r from-neutral-200 via-white to-neutral-400 border-b-2 border-black flex items-center justify-center relative overflow-hidden shrink-0">
                  {/* Sheen animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full h-full -skew-x-12 translate-x-[-100%] animate-sheen"></div>
                  <div className="h-1 w-1/3 bg-neutral-300 rounded-full border border-neutral-400"></div>
                </div>

                {/* 2. Highlight metallic reflections on sides of canister container */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-10"></div>

                {/* 3. Engraved Pattern Overlay (Dynamically Inject SVG depending on Pattern selected) */}
                {selectedPatternInfo.svgOverlay}

                {/* 4. Front Label Card - beautifully designed serif plaque */}
                <div className="flex-1 flex items-center justify-center p-3 relative z-10">
                  <div className="bg-[#FAF9F5] border-2 border-black rounded-2xl p-3 w-11/12 text-center shadow-md flex flex-col justify-between min-h-[110px] relative overflow-hidden">
                    {/* Corner decorative frame borders */}
                    <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-neutral-400"></div>
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-neutral-400"></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-neutral-400"></div>
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-neutral-400"></div>
                    
                    {/* Header line inside the plaque */}
                    <span className="text-[7px] font-mono tracking-widest text-neutral-400 font-black uppercase">
                      Two Leaves & a Bud
                    </span>

                    {/* Dynamic Label Text Entered by User */}
                    <div className="py-1">
                      <p className="font-serif italic font-extrabold text-[#111] text-xs leading-tight line-clamp-2 md:text-[13px] px-1">
                        "{customLabel ? customLabel : "Pure Hand Sachet"}"
                      </p>
                    </div>

                    {/* Sachet Tea Variety fill label details */}
                    <div className="border-t border-dashed border-neutral-200 pt-1">
                      <p className="text-[8px] font-mono font-bold text-emerald-700 leading-none">
                        {teaType.toUpperCase()}
                      </p>
                      <p className="text-[6px] text-neutral-400 font-semibold mt-0.5 leading-none">
                        {selectedSizeInfo.capacity} • {selectedSizeInfo.volume}
                      </p>
                    </div>

                  </div>
                </div>

                {/* 5. Rim Bottom Metal Cover Plate */}
                <div className="h-2 w-full bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 border-t border-black shrink-0 relative overflow-hidden"></div>
              </div>

              {/* Pedestal Shadow Ring Base under the container */}
              <div className="w-4/5 h-4 bg-black/40 rounded-full blur-xs mt-3 transform scale-90"></div>
            </div>

            {/* Quick specifications summary banner */}
            <div className="mt-8 bg-white/5 border border-white/10 p-3 rounded-2xl w-full text-center flex items-center justify-around text-xs">
              <div>
                <span className="text-[9px] font-mono text-neutral-400 block uppercase font-bold">CONTAINER CAPACITY</span>
                <span className="font-bold text-white font-mono">{selectedSizeInfo.capacity}</span>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div>
                <span className="text-[9px] font-mono text-neutral-400 block uppercase font-bold">TOTAL PRICE</span>
                <span className="font-black text-[#00E676] font-mono text-base">${selectedSizeInfo.price.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: High-fidelity Brutalist Custom Controls Panel */}
          <div className="lg:col-span-6 space-y-6 bg-white text-neutral-900 border-4 border-black rounded-3xl p-6 md:p-8 shadow-retro">
            
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-[#1B203E]" />
              <h3 className="font-display font-black text-lg uppercase tracking-wide text-neutral-900">
                Canister Workshop Configurator
              </h3>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-mono block">
                1. Select Tin canister Size (Custom Size)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {SIZES.map((sz) => {
                  const isChose = sz.name === size;
                  return (
                    <button
                      key={sz.name}
                      onClick={() => setSize(sz.name)}
                      className={`p-3.5 rounded-xl border-2 border-black flex flex-col text-left justify-between hover:bg-neutral-50 transition-all cursor-pointer shadow-retro-xs ${
                        isChose ? "bg-amber-100 border-[#E64A19] ring-2 ring-black" : "bg-[#FAF9F5] border-black"
                      }`}
                    >
                      <span className="font-extrabold text-xs text-neutral-800 uppercase block">{sz.name} ({sz.volume})</span>
                      <span className="text-[9px] text-neutral-500 font-light mt-0.5 leading-none block">{sz.capacity}</span>
                      <span className="font-mono text-xs font-black text-[#E64A19] mt-2 block">${sz.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-mono block">
                2. Choose Powder-Coat Color Theme
              </label>
              <div className="flex flex-wrap gap-2.5">
                {COLORS.map((col) => {
                  const isChose = col.id === colorId;
                  return (
                    <button
                      key={col.id}
                      onClick={() => setColorId(col.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black hover:scale-102 cursor-pointer transition-transform ${
                        isChose ? "bg-stone-100 ring-2 ring-[#00ACC1]" : "bg-[#FAF9F5]"
                      }`}
                      style={{ borderColor: isChose ? "#00ACC1" : "black" }}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-black inline-block shrink-0" 
                        style={{ backgroundColor: col.bgHex }}
                      />
                      <span className="text-[10px] font-black text-neutral-800 uppercase leading-none">
                        {col.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pattern Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-mono block">
                3. Choose Engraving Motif style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PATTERNS.map((pat) => {
                  const isChose = pat.id === patternId;
                  return (
                    <button
                      key={pat.id}
                      onClick={() => setPatternId(pat.id)}
                      className={`p-2.5 rounded-xl border-2 border-black text-center cursor-pointer flex flex-col items-center justify-center gap-1 hover:bg-neutral-50 ${
                        isChose ? "bg-neutral-100 border-indigo-600 font-black ring-1 ring-black" : "bg-[#FAF9F5]"
                      }`}
                    >
                      <span className="text-sm">{pat.icon}</span>
                      <span className="text-[9px] text-neutral-800 truncate font-semibold">
                        {pat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tea Fill Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-mono block" htmlFor="teaFillSelect">
                4. Select Loose Sachet Blend Fill
              </label>
              <select
                id="teaFillSelect"
                value={teaType}
                onChange={(e) => setTeaType(e.target.value)}
                className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl p-3 text-xs font-bold text-neutral-800 focus:outline-[#00ACC1]"
              >
                {TEAS.map((tea) => (
                  <option key={tea} value={tea}>
                    {tea}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Label Text */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-neutral-500 font-mono block" htmlFor="customPlaqueLabel">
                5. Type custom Label Engraving (Interactive)
              </label>
              <input
                id="customPlaqueLabel"
                type="text"
                maxLength={26}
                value={customLabel}
                onChange={(e) => setCustomLabel(e.target.value)}
                placeholder="e.g. Grandma's Rest Tea, Barista No. 1"
                className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl p-3 text-xs font-semibold placeholder:text-stone-400 focus:outline-[#00ACC1] uppercase tracking-normal"
              />
              <span className="text-[8px] text-stone-400 font-mono block text-right mt-1">
                Max 26 characters. Supports standard alphabetic letters or numbers.
              </span>
            </div>

            {/* Actions triggers row */}
            <div className="pt-2">
              <button
                onClick={handleCreateCanister}
                className="w-full bg-[#00E676] hover:bg-[#00c853] text-black font-black uppercase tracking-widest text-xs py-4 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.5 active:translate-y-1 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4.5 h-4.5" /> Add Customized Tin with {selectedSizeInfo.volume} sachets to basket
              </button>
            </div>

            {/* Successful Notification overlay inline */}
            {isAddedSuccessfully && (
              <div className="p-3 bg-emerald-50 border-2 border-emerald-500 text-emerald-900 rounded-xl text-xs font-bold font-sans flex items-center gap-2 animate-fade-in shadow-retro-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 stroke-[2.5]" /> Successfully added Custom Canister: Double-checked, sealed! Your premium coffee table keepsake is now in the basket!
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
