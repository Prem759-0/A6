import React, { useRef, useState } from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/CartDrawer";
import { ProductIllustration } from "./components/ProductIllustration";
import { TestimonialCard } from "./components/TestimonialCard";
import { LatteSlider } from "./components/LatteSlider";
import { JournalGrid } from "./components/JournalGrid";
import { FaqSection } from "./components/FaqSection";
import { OrderTrackingModal } from "./components/OrderTrackingModal";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { FloatingTimer } from "./components/FloatingTimer";
import { REVIEWS, VIBES } from "./data";
import { 
  Star, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Heart, 
  Leaf, 
  Globe, 
  Compass, 
  Sparkles, 
  Award, 
  Instagram, 
  Facebook, 
  Linkedin,
  MapPin,
  Check
} from "lucide-react";

function MainAppContent() {
  const { 
    filteredProducts, 
    addToCart, 
    searchQuery, 
    setSearchQuery, 
    activeVibe, 
    setActiveVibe,
    activeCategory,
    setActiveCategory,
    setTrackingOpen,
    setSelectedProduct
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // References for horizontal scrolling of products
  const productScrollRef = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: "left" | "right") => {
    if (productScrollRef.current) {
      const scrollAmount = 320;
      productScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() !== "") {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const categories = [
    { id: "all", label: "🔥 All Best Sellers" },
    { id: "tea-sachets", label: "🍃 Tea Sachets" },
    { id: "naked-sachets", label: "📦 Naked Sachets" },
    { id: "latte-mix", label: "🍵 Latte Mixes" },
    { id: "gifts-samplers", label: "🎁 Gifts & Samplers" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E2229] font-sans overflow-x-hidden selection:bg-[#00838F] selection:text-white">
      {/* Navigation Headers and Sliding Cart Drawer */}
      <Header />
      <CartDrawer />

      {/* SECTION 1: HERO CONTAINER SETUP */}
      <section className="relative bg-gradient-to-r from-[#00838F] to-[#00ACC1] text-white py-12 px-4 md:py-24 md:px-8 border-b-4 border-black overflow-hidden select-none">
        
        {/* Ambient sparkling elements background mimicking high moisture water theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)] opacity-80 pointer-events-none"></div>
        <div className="absolute top-10 left-1/3 w-32 h-32 bg-teal-300/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          
          {/* Hero left-hand text banner content */}
          <div className="col-span-12 md:col-span-6 space-y-6 md:space-y-8 text-center md:text-left">
            <h1 className="font-serif italic font-extrabold text-4xl md:text-6xl tracking-tight leading-tight text-[#FFFDE7]">
              A cup that fits <br className="hidden md:block" /> the moment.
            </h1>
            
            <p className="text-sm md:text-base text-neutral-100 font-light max-w-xl leading-relaxed">
              From organic compostable plant-based whole leaf tea sachets and iced tea to sweet rich tea lattes and Japanese Uji matcha, we've got something special for everyone. Crafted in Colorado.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button
                onClick={() => {
                  const el = document.getElementById("best-sellers-section");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-full sm:w-auto bg-[#1E2229] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer"
              >
                Shop Our Teas
              </button>
              
              <a 
                href="#origins-section"
                className="text-xs font-bold uppercase tracking-widest text-neutral-100 hover:text-neutral-200 transition-all flex items-center gap-1 group py-2"
              >
                <span>Discover Our Origins</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
              </a>
            </div>
          </div>

          {/* Hero right-hand: Beautiful visual tea layout mimicking image box setup */}
          <div className="col-span-12 md:col-span-6 flex items-center justify-center relative">
            <div className="relative p-6 bg-white/10 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xs max-w-md w-full flex flex-col items-center">
              
              {/* Alpine Berry box highlight inside hero image space */}
              <div className="flex gap-4 md:gap-6 items-center w-full justify-center transform rotate-1">
                {/* Visual presentation box with custom shadows */}
                <div className="relative shrink-0 transform -rotate-3 hover:rotate-0 duration-500 transition-transform shadow-2xl">
                  {/* Styled Box design matching Alpine Berry Tea box */}
                  <div className="w-32 h-44 bg-white border-2 border-[#1E2229] rounded-xl overflow-hidden flex flex-col justify-between p-3 flex-1 text-neutral-900">
                    <div className="h-4 bg-[#E57373] text-white text-[7px] font-black tracking-widest flex items-center justify-center uppercase rounded-sm">
                      Alpine Berry
                    </div>
                    <div className="my-2 text-center text-[10px] text-neutral-500 font-serif leading-none italic uppercase">
                      Organics
                    </div>
                    {/* Cute raspberry vector drawing */}
                    <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto my-1 relative">
                      <span className="text-2xl">🍓</span>
                      <span className="absolute bottom-0 right-1 text-xs">💦</span>
                    </div>
                    <div className="border border-neutral-300 rounded px-1.5 py-1 bg-stone-50 text-center">
                      <h4 className="font-serif font-black text-[9px] text-[#2E3138] leading-none">Alpine Berry</h4>
                      <p className="text-[5.5px] text-neutral-500 tracking-wider font-mono mt-0.5">15 COMPOSTABLE SACHETS</p>
                    </div>
                  </div>
                  {/* Tag label sticking out */}
                  <div className="absolute top-1/2 -left-3 bg-neutral-900 text-white text-[6px] font-bold px-1.5 py-0.5 border border-white uppercase tracking-widest rounded shadow">
                    WHOLE LEAF
                  </div>
                </div>

                {/* Companion items: ceramic teapot, berries pile, crystal transparent cup */}
                <div className="flex flex-col gap-3">
                  <div className="bg-white/95 rounded-2xl p-2 md:p-3 border border-neutral-200 text-neutral-900 shadow-lg flex items-center gap-2.5 max-w-[200px] hover:scale-105 duration-300">
                    <div className="w-9 h-9 rounded-full bg-cyan-100 border border-cyan-300 flex items-center justify-center text-base">
                      🍵
                    </div>
                    <div className="leading-tight">
                      <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Steep Temp</p>
                      <p className="text-[11px] font-black text-neutral-800">208°F (Herbal)</p>
                    </div>
                  </div>

                  <div className="bg-white/95 rounded-2xl p-2 md:p-3 border border-neutral-200 text-neutral-900 shadow-lg flex items-center gap-2.5 max-w-[200px] hover:scale-105 duration-300">
                    <div className="w-9 h-9 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-base">
                      🍒
                    </div>
                    <div className="leading-tight">
                      <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Taste Notes</p>
                      <p className="text-[11px] font-black text-neutral-800">Sweet & Tart Berry</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Float statement sticker */}
              <div className="mt-5 w-full bg-[#FAF9F5] rounded-xl border-2 border-black p-2.5 text-neutral-900 text-[10px] font-bold flex items-center gap-2 shadow-retro-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                <p className="leading-snug">
                  "No plastic in our tea bags! 100% plant-based compostable pyramidal whole leaf sachets."
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Down indicator scroll link */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50 text-[10px] font-mono tracking-widest animate-bounce flex flex-col items-center select-none cursor-pointer">
          <span>SCROLL DOWN</span>
          <span>▼</span>
        </div>
      </section>


      {/* SECTION 2: SUB-HERO QUOTE STATEMENT */}
      <section className="bg-[#FAF9F5] border-b-4 border-black py-12 px-4 md:py-16 text-center select-none">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-serif italic font-extrabold text-[21px] md:text-3.5xl text-neutral-800 leading-normal tracking-tight">
            A <span className="text-[#00838F] font-black not-italic underline decoration-[#FF9800] decoration-wavy decoration-3">great</span> cup starts with a careful pluck — the top two leaves and a bud.
          </p>
          <div className="mt-4 flex justify-center items-center gap-2">
            <span className="h-0.5 w-8 bg-neutral-300"></span>
            <span className="text-[#5D8B2C] text-sm">🍁</span>
            <span className="h-0.5 w-8 bg-neutral-300"></span>
          </div>
        </div>
      </section>


      {/* SECTION 3: BEST SELLERS LISTINGS WITH DYNAMIC FILTER CHIPS */}
      <section className="py-12 px-4 md:py-20 md:px-8 border-b-4 border-black" id="best-sellers-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            {/* Retro title badge */}
            <div className="inline-block bg-[#D1C4E9]/70 text-[#512DA8] text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro-purple uppercase tracking-widest leading-none">
              Best Sellers
            </div>
            
            <h2 className="font-serif italic font-black text-2xl md:text-4xl text-neutral-900 tracking-tight">
              Customer favorites brewed fresh daily.
            </h2>
            <p className="text-neutral-500 text-xs md:text-sm max-w-xl font-light">
              Add products directly to your cart and claim your bonus <strong>BUD15</strong> discount coupon at checkout.
            </p>

            {/* Live Search and Vibe Filters indicators */}
            {(searchQuery !== "" || activeVibe !== null) && (
              <div className="bg-[#E0F2F1] border border-[#00838F]/20 px-4 py-2 rounded-xl text-xs flex items-center gap-3">
                <span className="font-semibold text-[#006064]">
                  Active Filter: {searchQuery && `"${searchQuery}"`} {activeVibe && `[Vibe: ${activeVibe}]`}
                </span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveVibe(null);
                  }}
                  className="text-red-500 hover:text-red-700 font-bold underline text-[11px] cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Horizontal scroll of category filtering items */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border-2 border-black tracking-wide cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[#00838F] text-white shadow-retro-sm translate-y-0.5"
                      : "bg-[#white] text-neutral-700 hover:bg-neutral-50 shadow-retro-sm"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling controls */}
          <div className="relative">
            {filteredProducts.length > 0 && (
              <>
                <button
                  onClick={() => scrollProducts("left")}
                  className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-black rounded-full shadow-retro-sm flex items-center justify-center hover:bg-stone-100 transition-transform active:scale-95 z-10 cursor-pointer"
                  aria-label="Scroll products left"
                  id="prod-scroll-left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollProducts("right")}
                  className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-black rounded-full shadow-retro-sm flex items-center justify-center hover:bg-stone-100 transition-transform active:scale-95 z-10 cursor-pointer"
                  aria-label="Scroll products right"
                  id="prod-scroll-right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Horizontal Scrollable Product Container Row */}
            <div 
              ref={productScrollRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 scrollbar-thin scroll-smooth"
              id="products-scroller"
            >
              {filteredProducts.length === 0 ? (
                <div className="w-full text-center py-12 bg-white rounded-3xl border-2 border-black p-6 shadow-retro max-w-sm mx-auto">
                  <p className="font-serif italic font-bold text-lg text-neutral-800">No matching teas found</p>
                  <p className="text-xs text-neutral-500 mt-1">Try clarifying your terms, searching "Peppermint", or clearing selection filter.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveVibe(null);
                      setActiveCategory("all");
                    }}
                    className="mt-4 px-4 py-2 bg-[#00838F] text-white font-bold text-xs uppercase rounded-lg border-2 border-black shadow-retro-sm cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[280px] w-[280px] bg-white border-2 border-black rounded-3xl p-5 flex flex-col justify-between shadow-retro hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group cursor-pointer"
                    onClick={() => setSelectedProduct(p)}
                  >
                    {/* Visual Box + Float Badge row */}
                    <div className="relative h-48 bg-neutral-50/50 rounded-2xl border-2 border-black flex items-center justify-center shadow-inner overflow-hidden">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:12px_12px]"></div>

                      {/* Floating Category badge at top-left of specific card */}
                      <span className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 border border-neutral-900 rounded text-[8px] font-black tracking-wider uppercase font-mono ${p.badgeColor} ${p.badgeTextColor}`}>
                        {p.badgeText}
                      </span>

                      {/* Rating details top right of item card */}
                      <span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-bold text-neutral-800 font-mono bg-white border border-neutral-300 rounded px-1.5 py-0.5 flex items-center gap-0.5 select-none animate-pulse-short">
                        <span className="text-yellow-500">★</span>
                        <span>{p.rating.toFixed(2)} ({p.reviewCount})</span>
                      </span>

                      {/* Standard modular Product Illustration */}
                      <ProductIllustration type={p.image} badgeColor="bg-teal-500" className="group-hover:scale-105 duration-350 transition-all shadow-sm" />

                      {/* ADD to cart button overlay on bottom right of illustration container */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p);
                        }}
                        className="absolute bottom-2.5 right-2.5 w-10 h-10 bg-white border-2 border-black rounded-xl hover:bg-[#FAF9F5] flex items-center justify-center transition-all shadow-retro-sm transform active:scale-90 hover:scale-105 cursor-pointer z-10 add-to-cart-shake"
                        title="Add to Cart"
                      >
                        <Plus className="w-5 h-5 text-neutral-900 font-black" />
                      </button>
                    </div>

                    {/* Metadata Content */}
                    <div className="mt-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title heading click opens modal details */}
                        <h3 
                          className="font-serif italic font-extrabold text-base text-[#1E2229] hover:text-[#00838F] cursor-pointer transition-colors leading-tight"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(p);
                          }}
                        >
                          {p.name}
                        </h3>
                        <p className="text-xs text-neutral-500 font-sans font-light mt-1.5 line-clamp-2">
                          {p.description}
                        </p>
                      </div>

                      {/* Price statement bottom bar wrapper */}
                      <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-4">
                        <div>
                          <p className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase leading-none">
                            Price
                          </p>
                          <p className="text-[#E64A19] font-mono text-sm font-black mt-0.5 leading-none">
                            {p.isFromPrice ? "From " : ""}${p.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(p);
                          }}
                          className="bg-[#1E2229] hover:bg-neutral-800 text-white text-[10px] font-black tracking-widest uppercase px-4 py-2 border-2 border-black rounded-xl shadow-retro-sm active:scale-95 transition-transform cursor-pointer add-to-cart-shake"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Explore all teas footer link */}
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                setActiveVibe(null);
                const el = document.getElementById("best-sellers-section");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                alert("Filters reset! You can now browse all organic, loose-leaf, and barista mix varieties.");
              }}
              className="bg-[#1E2229] text-white hover:bg-neutral-800 border-2 border-black px-6 py-3.5 font-bold text-xs uppercase tracking-widest shadow-retro transform active:scale-95 transition-all outline-none cursor-pointer rounded-xl"
            >
              Explore All Teas
            </button>
          </div>

        </div>
      </section>


      {/* SECTION 4: DISCOVER THE VIBES & LIVE SEARCH PANEL */}
      <section className="bg-[#FFFDF4] border-b-4 border-black py-16 px-4 md:py-24 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="inline-block bg-[#FF9800]/70 text-black text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro-orange mb-4 uppercase tracking-widest leading-none">
            Discover
          </div>

          <h3 className="font-serif italic font-bold text-2xl md:text-4xl text-center text-[#1E2229] leading-snug">
            Let's find a cup that fits the <span className="font-extrabold text-[#00838F] not-italic underline decoration-amber-400 decoration-wavy decoration-2">moment</span>. <br/>What are you searching for?
          </h3>

          {/* Search bar inputs */}
          <div className="relative w-full max-w-xl mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-[#00838F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const sellers = document.getElementById("best-sellers-section");
                if (sellers) sellers.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              placeholder="Type flavor keywords (e.g., Ice, Matcha, Peppermint, Chai, Organic)"
              className="w-full bg-white border-2 border-black rounded-2xl pl-12 pr-4 py-4 md:py-5 text-sm font-semibold placeholder:text-stone-400 drop-shadow-sm shadow-retro-sm transition-transform focus:-translate-y-0.5 focus:outline-none"
            />
          </div>

          {/* Explorer Vibe Tag Cloud */}
          <div className="mt-8 text-center space-y-3.5">
            <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest font-mono">
              Or Explore by Vibe:
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:grid-cols-4 max-w-2xl px-2">
              {VIBES.map((vb) => {
                const isSelected = activeVibe === vb;
                return (
                  <button
                    key={vb}
                    onClick={() => {
                      const newVibe = isSelected ? null : vb;
                      setActiveVibe(newVibe);
                      const sellers = document.getElementById("best-sellers-section");
                      if (sellers) sellers.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 border-black tracking-wide shadow-retro-sm cursor-pointer transition-all transform hover:-translate-y-0.5 ${
                      isSelected 
                        ? "bg-[#00838F] text-white" 
                        : "bg-white text-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    {vb} {isSelected ? "✓" : ""}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 5: OUR ORIGINS - BORN IN COLORADO */}
      <section 
        className="relative min-h-[500px] md:min-h-[640px] bg-neutral-900 text-white flex flex-col justify-center py-16 px-4 md:py-24 md:px-8 border-b-4 border-black" 
        id="origins-section"
      >
        {/* Deep pines mountain high contrast visual overlay background pattern */}
        <div className="absolute inset-0 bg-[#1E2522] opacity-75 pointer-events-none select-none">
          {/* Mock nature layer */}
          <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.9),transparent)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          
          <div className="inline-block bg-[#1565C0] text-white text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro-blue uppercase tracking-widest leading-none">
            Our Origins
          </div>

          <h2 className="font-display font-black text-4xl md:text-7xl uppercase tracking-tighter text-[#FFFDE7] select-none leading-none">
            BORN IN <br/> COLORADO
          </h2>

          <p className="font-serif italic text-base md:text-xl text-[#C8E6C9] max-w-3xl mx-auto leading-relaxed">
            "Our founder, Richard, started Two Leaves and a Bud in pursuit of a truly great cup. Two decades later, that same care and curiosity guide everything we make."
          </p>

          {/* Highlight features icon widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xl mb-3">
                <Leaf className="w-5 h-5 text-[#8BC34A]" />
              </div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-[#8BC34A] font-mono">Quality - without pretense</h4>
              <p className="text-[11px] text-neutral-300 mt-1 max-w-[200px] mx-auto font-light leading-normal">
                Sourcing whole leaf teas cleanly, skipping wasteful frills to support local communities.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-xl mb-3">
                <Globe className="w-5 h-5 text-blue-300" />
              </div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-blue-300 font-mono">Care for - people & planet</h4>
              <p className="text-[11px] text-neutral-300 mt-1 max-w-[200px] mx-auto font-light leading-normal">
                Ensuring plant-based compostable packet bags and carbon-mindful bulk shipping programs.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xl mb-3">
                <Compass className="w-5 h-5 text-cyan-300" />
              </div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-cyan-300 font-mono">Transparent Sourcing</h4>
              <p className="text-[11px] text-neutral-300 mt-1 max-w-[200px] mx-auto font-light leading-normal">
                Full seed-to-shred documentation. Know your tea farmer, your mountain elevation, and soil profiles.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                alert("The story begins in Carbondale, Colorado, where we set out to craft the gold standard of organic teas! Thank you for joining our journey.");
              }}
              className="bg-white text-black hover:bg-neutral-100 font-black text-xs uppercase tracking-widest px-6 py-3 border-2 border-black shadow-retro transform active:scale-95 transition-all outline-none cursor-pointer rounded-xl"
            >
              Our Story
            </button>
          </div>

        </div>

        {/* Dynamic circular absolute stamp */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-white/5 border border-white/10 rounded-full flex flex-col items-center justify-center rotate-6 select-none pointer-events-none text-center">
          <span className="text-[6px] font-mono text-neutral-400 uppercase tracking-widest">Est. Carbondale</span>
          <span className="text-[10px] font-serif italic font-extrabold text-[#8BC34A] mt-0.5">Colorado</span>
          <span className="text-[6px] font-mono text-neutral-500 uppercase mt-0.5 font-bold">2005</span>
        </div>
      </section>


      {/* SECTION 6: CUSTOMER TESTIMONIALS */}
      <section className="bg-[#FFFDF4] py-12 px-4 md:py-20 md:px-8 border-b-4 border-black" id="reviews-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block bg-[#C5E1A5]/70 text-[#2E7D32] text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro-green uppercase tracking-widest leading-none">
              Reviews
            </div>
            
            <h2 className="font-serif italic font-black text-2xl md:text-4xl text-neutral-900 tracking-tight">
              Loved by tea people <span className="font-extrabold text-[#00838F] not-italic">everywhere</span>.
            </h2>
            <p className="text-neutral-500 text-xs md:text-sm max-w-xl font-light">
              Don’t just take our word for it. Here is what real baristas, coffee houses, and daily builders are saying:
            </p>
          </div>

          {/* Testimonial Cards row horizontal swipeable */}
          <div className="overflow-x-auto pb-4 scrollbar-thin scroll-smooth">
            <div className="flex gap-6 min-w-max px-2 py-4">
              {REVIEWS.map((rev) => (
                <TestimonialCard key={rev.id} review={rev} />
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 6.5: FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />


      {/* SECTION 7: OUR CAFE AND WHOLESALE PARTNERS SPLIT BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-black" id="cafe-wholesale">
        
        {/* Left column visual showcase: matcha cup cream lattes */}
        <div className="md:col-span-6 min-h-[300px] md:min-h-[440px] bg-[#E8F5E9] border-b-2 md:border-b-0 md:border-r-4 border-black flex flex-col justify-center items-center py-6 px-4 relative overflow-hidden select-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          
          {/* Graphic: A delicious frothy green matcha latte cup with latte art, hand drawing details */}
          <div className="relative transform hover:rotate-2 duration-500 transition-transform">
            {/* Custom crafted mug */}
            <div className="w-48 h-48 bg-stone-100 border-4 border-black rounded-full flex flex-col justify-center items-center relative shadow-retro overflow-hidden">
              {/* Matcha liquid inside */}
              <div className="absolute inset-3 bg-[#8BC34A] rounded-full border-2 border-black p-4 flex items-center justify-center">
                {/* Latte foam swirl art */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-white">
                  <path d="M50,15 C40,30 30,45 30,55 C30,70 45,80 50,85 C55,80 70,70 70,55 C70,45 60,30 50,15 Z" fill="currentColor" fillOpacity="0.8" />
                  <path d="M50,30 C45,40 38,50 38,58 C38,68 47,72 50,75 C53,72 62,68 62,58 C62,50 55,40 50,30 Z" fill="#F1F8E9" />
                </svg>
              </div>
            </div>
            {/* Mug Handle */}
            <div className="absolute top-12 -right-4 w-10 h-24 border-4 border-black bg-stone-100 rounded-r-2xl shadow-retro-sm -z-10"></div>
          </div>

          <div className="mt-8 bg-white border-2 border-black rounded-xl p-3 text-center max-w-xs shadow-retro-sm relative z-10">
            <p className="text-[10px] font-black uppercase text-[#00838F] tracking-widest font-mono">Double Plucked Whole Leaf</p>
            <h4 className="font-serif italic font-extrabold text-sm text-neutral-800 mt-1">
              "Preferred by master baristas!"
            </h4>
          </div>
        </div>

        {/* Right column textual context */}
        <div className="md:col-span-6 bg-[#1B203E] text-white py-12 px-6 md:py-20 md:px-12 flex flex-col justify-center items-start space-y-6">
          <div className="inline-block bg-[#FFF59D] text-black text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro-orange uppercase tracking-widest leading-none">
            Cafes & Teahouses
          </div>

          <h3 className="font-serif italic font-black text-3xl md:text-5xl text-[#FFFDE7] tracking-tight leading-none">
            Our Cafe & <br/>Wholesale Partners
          </h3>

          <p className="text-sm text-neutral-200 font-light leading-relaxed max-w-lg">
            From local organic cafes to high-volume national teahouse chains, our teas power thousands of baristas every day with our easy bulk naked bags and certified organic loose leaf blends. Get wholesale custom menu pricing and starter equipment kits.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={() => {
                alert("Thank you for your interest! Cafe partners receive customized bulk trade discounts. Our partner team will reach out with samples.");
              }}
              className="bg-[#00ACC1] hover:bg-[#00838F] text-black hover:text-white border-2 border-black text-xs font-black px-6 py-3.5 rounded-xl uppercase tracking-widest shadow-retro transform active:scale-95 transition-all text-center cursor-pointer"
            >
              Wholesale Application
            </button>
            <a 
              href="#cafe-lattes"
              className="border-2 border-white/40 hover:border-white px-6 py-3.5 rounded-xl text-xs font-bold text-center uppercase tracking-widest transition-colors"
            >
              View Barista Blends
            </a>
          </div>
        </div>

      </section>


      {/* SECTION 8: LATTES / BARISTA SLIDER */}
      <LatteSlider />


      {/* SECTION 9: MAGAZINE ARTICLES JOURNAL */}
      <JournalGrid />


      {/* SECTION 10: "GREAT TEA. IN GOOD COMPANY." SPLIT BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-4 border-black" id="about-banner-company">
        
        {/* Left side: Vibrant brand block */}
        <div className="md:col-span-4 bg-[#E64A19] text-white p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase font-mono text-amber-200">Our Community</span>
            <h2 className="font-serif italic font-extrabold text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-white">
              Great Tea. <br /> In Good <br /> Company.
            </h2>
          </div>

          <div className="space-y-4 pt-6">
            <p className="text-xs text-neutral-100 font-light max-w-sm">
              Discover the lovely people, beautiful organic places, and green carbon-mindful purpose behind every pluck of Two Leaves.
            </p>
            <button
              onClick={() => {
                alert("We work with small, sustainable growers around the globe! Feel free to subscribe & read more on our blog.");
              }}
              className="bg-white text-black font-bold text-xs uppercase px-5 py-2.5 rounded-xl border-2 border-black shadow-retro transform active:scale-95 transition-all cursor-pointer"
            >
              About Us
            </button>
          </div>
        </div>

        {/* Right side: Beautiful setup of tea bags setup with glass cup */}
        <div className="md:col-span-8 bg-[#EF6C00]/10 p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,orange/30,transparent)]" />
          
          <div className="relative grid sm:grid-cols-2 gap-8 items-center max-w-3xl w-full z-10">
            {/* Displaying two Leaves packages side by side nicely */}
            <div className="flex justify-center gap-4">
              <div className="transform -rotate-6 hover:rotate-0 duration-300 shadow-xl">
                <ProductIllustration type="peppermint-naked" badgeColor="bg-teal-500" />
              </div>
              <div className="transform rotate-3 hover:rotate-0 duration-300 shadow-xl mt-6">
                <ProductIllustration type="tropical-green" badgeColor="bg-lime-500" />
              </div>
            </div>

            <div className="space-y-4 bg-white/95 border-2 border-black rounded-2xl p-5 shadow-retro">
              <h4 className="font-serif italic font-bold text-base text-neutral-900 flex items-center gap-2">
                <span>🍀</span> Biodegradable Pyramidal Sachets
              </h4>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Ordinary paper tea bags are ground up dust, but our plant-based space-pyramidal shape houses whole, uncrushed leaves so hot water flows freely, maximizing pure flavor notes without plastic toxins.
              </p>
              
              <div className="flex gap-2.5 pt-2">
                <div className="bg-[#FAF9F5] border rounded-lg p-2 flex flex-col items-center flex-1 text-center">
                  <span className="text-base">🌲</span>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono mt-1">100% Compostable</span>
                </div>
                <div className="bg-[#FAF9F5] border rounded-lg p-2 flex flex-col items-center flex-1 text-center">
                  <span className="text-base">🗻</span>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono mt-1">Non-GMO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* SECTION 11: NEWSLETTER STEEP WITH US */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-12 px-4 md:py-16 text-center border-b-4 border-black">
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="flex justify-center items-center gap-1 text-[#00838F]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif italic font-black text-xl md:text-2xl uppercase tracking-wider text-neutral-800">
              STEEP WITH US
            </h3>
            <Sparkles className="w-5 h-5" />
          </div>

          <p className="text-xs md:text-sm text-neutral-600 max-w-lg mx-auto font-light leading-relaxed">
            Get exciting Colorado steep stories, hand-brewed barista recipes, and member-only coupons straight to your inbox.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-emerald-500/20 text-emerald-800 border-2 border-emerald-500 p-4 rounded-xl text-xs font-bold font-mono">
              🎉 Joined! Use secret coupon <span className="font-bold underline">BUD15</span> for 15% OFF your initial tea order!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto items-stretch">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-white border-2 border-black rounded-lg px-4 py-3 text-xs font-semibold placeholder:text-neutral-400 focus:outline-[#00838F]"
              />
              <button
                type="submit"
                className="bg-[#1E2229] hover:bg-neutral-800 text-white font-bold text-xs uppercase px-6 py-3 rounded-lg border-2 border-black active:translate-y-0.5 shadow-retro-sm transition-all cursor-pointer"
              >
                Submit
              </button>
            </form>
          )}

          {/* Social Icons row */}
          <div className="flex justify-center items-center gap-4 pt-4 text-neutral-600 select-none">
            <button 
              onClick={() => alert("Heading to Instagram!")} 
              aria-label="Instagram link"
              className="p-2 bg-white/75 border border-neutral-300 rounded-full hover:bg-white hover:text-[#00838F] transform hover:scale-115 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Heading to Facebook!")} 
              aria-label="Facebook link"
              className="p-2 bg-white/75 border border-neutral-300 rounded-full hover:bg-white hover:text-[#00838F] transform hover:scale-115 transition-all"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Heading to LinkedIn!")} 
              aria-label="LinkedIn link"
              className="p-2 bg-white/75 border border-neutral-300 rounded-full hover:bg-white hover:text-[#00838F] transform hover:scale-115 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("We are based in Carbondale, Colorado!")} 
              aria-label="Colorado location link"
              className="p-2 bg-white/75 border border-[#E64A19]/30 rounded-full hover:bg-white text-[#E64A19] transform hover:scale-115 transition-all flex items-center font-bold text-[10px] gap-1"
            >
              <MapPin className="w-3.5 h-3.5" /> <span>Colorado USA</span>
            </button>
          </div>

        </div>
      </section>


      {/* SECTION 12: SITE FOOTER WITH LANDSCAPE VECTOR DRAWING */}
      <footer className="bg-neutral-900 text-white pt-16 relative overflow-hidden">
        
        {/* Navigation columns listings */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-6 gap-8 pb-12">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-[#8BC34A]">
                <path d="M50,85 C50,85 45,55 25,45 C45,45 50,25 50,15 C50,25 55,45 75,45 C55,55 50,85 50,85 Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif italic text-lg font-bold leading-none">two leaves</span>
                <span className="text-[10px] font-light text-neutral-400 tracking-widest uppercase leading-none">and a bud</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 font-light max-w-xs leading-relaxed">
              We started Two Leaves and a Bud to offer honest, delicious, and simple cup selections with pure organic transparency. 
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ACC1] font-mono">Teas</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Tea Sachets</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Naked Sachets</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Bulk Builder Packets</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Iced Tea Pouches</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Matcha Canister</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ACC1] font-mono">Collections</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Matcha Organic</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Spiced Chai</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Herbal Decaf</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Holiday Tea Gifts</a></li>
              <li><a href="#best-sellers-section" className="hover:text-white transition-colors">Best Sellers</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ACC1] font-mono">Company</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#origins-section" className="hover:text-white transition-colors">Our Spirit</a></li>
              <li><a href="#origins-section" className="hover:text-white transition-colors">Carbon Policy</a></li>
              <li><a href="#journal-section" className="hover:text-white transition-colors">Tea Journal Recipes</a></li>
              <li><a href="#reviews-section" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#cafe-wholesale" className="hover:text-white transition-colors">Wholesale Sign Up</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ACC1] font-mono">Support</h4>
            <ul className="space-y-1.5 text-xs text-neutral-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Loyalty Rewards</a></li>
              <li>
                <button 
                  onClick={() => setTrackingOpen(true)} 
                  className="hover:text-white transition-colors bg-transparent border-0 p-0 text-left cursor-pointer font-light text-neutral-400"
                >
                  Track Shipment
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Trade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Hand-drawn brand graphic: Colorado majestic Rocky Mountains with pine trees outline */}
        <div className="border-t border-neutral-800 bg-white text-neutral-800 py-12 px-4 relative select-none">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* Cursive handwritten logo overlay */}
            <div className="flex items-center gap-1 justify-center mb-4">
              <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#5D8B2C]">
                <path d="M50,85 C50,85 45,55 25,45 C45,45 50,25 50,15 C50,25 55,45 75,45 C55,55 50,85 50,85 Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-serif italic text-2xl font-black text-neutral-900 leading-none">two leaves</span>
                <span className="text-xs font-light text-neutral-500 tracking-widest uppercase leading-none">and a bud</span>
              </div>
            </div>

            {/* Custom SVG Rocky mountain panorama with tall pine forest contours. Identical brand signature! */}
            <svg viewBox="0 0 1200 300" className="w-full max-w-3xl h-auto text-neutral-900 fill-none mb-4">
              {/* Mountain Lines */}
              <path d="M50,250 L200,80 L350,180 L500,40 L680,240 L880,110 L1050,220 L1150,160 L1200,250" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M100,250 L280,120 L420,210 L580,90 L750,230 L950,140 L1120,250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
              
              {/* Sun element */}
              <circle cx="500" cy="90" r="24" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />

              {/* Rows of Pines vector indicators at the bottom */}
              <path d="M150,250 L150,220 M140,230 L160,230 M144,224 L156,224 M150,220 L145,215 M150,220 L155,215" stroke="currentColor" strokeWidth="2" />
              <path d="M180,250 L180,200 M165,220 L195,220 M170,210 L190,210 M180,200 L175,195 M180,200 L185,195" stroke="currentColor" strokeWidth="2" />
              <path d="M300,250 L300,210 M288,225 L312,225 M292,217 L308,217" stroke="currentColor" strokeWidth="2" />
              <path d="M600,250 L600,190 M585,215 L615,215 M590,205 L610,205 M600,190 L595,185 M600,190 L605,185" stroke="currentColor" strokeWidth="2" />
              <path d="M640,250 L640,220 M630,232 L650,232" stroke="currentColor" strokeWidth="2" />
              <path d="M780,250 L780,195 M765,215 L795,215 M770,205 L790,205" stroke="currentColor" strokeWidth="2" />
              <path d="M900,250 L900,205 M888,220 L912,220 M892,212 L908,212" stroke="currentColor" strokeWidth="2" />
              <path d="M1020,250 L1020,215 M1008,230 L1032,230" stroke="currentColor" strokeWidth="2" />

              {/* Ground base */}
              <line x1="0" y1="250" x2="1200" y2="250" stroke="currentColor" strokeWidth="4" />
            </svg>

            <p className="text-[10px] text-neutral-400 font-mono tracking-widest font-semibold">
              © {new Date().getFullYear()} TWO LEAVES AND A BUD TEA CO. Carbondale, Colorado, USA. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[8px] text-neutral-400 font-mono tracking-wider italic mt-0.5">
              Pixel perfected clone constructed for maximum high fidelity performance and absolute responsivity.
            </p>
          </div>
        </div>

      </footer>

      {/* MODAL OVERLAYS & floating widgets */}
      <OrderTrackingModal />
      <ProductDetailModal />
      <FloatingTimer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
