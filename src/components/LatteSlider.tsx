import React, { useState } from "react";
import { ProductIllustration } from "./ProductIllustration";
import { useShop } from "../context/ShopContext";
import { PRODUCTS } from "../data";
import { ChevronLeft, ChevronRight, Check, CupSoda } from "lucide-react";

export const LatteSlider: React.FC = () => {
  const { addToCart } = useShop();
  const [activeIdx, setActiveIdx] = useState(0);

  // Retrieve our three specialty latte mixes from PRODUCTS
  const lattesList = [
    {
      id: "prod-6", // Nice Chai
      name: "Nice Chai Latte Mix",
      title: "Chai Latte Mix",
      badge: "NICE",
      badgeBg: "bg-[#FFCC80]",
      desc: "Our Nice Chai is a not too sweet, not too spicy, real black tea and custom spiced powdered latte mix meant for making traditional tea lattes simple.",
      imageType: "nice-chai",
      price: 12.95,
      pairDesc: "Pairs beautifully with oat milk or whole milk for a thick, indulgent creamy cup."
    },
    {
      id: "prod-5", // Nice Matcha
      name: "Nice Matcha Tea Latte Mix",
      title: "Matcha Tea Latte Mix",
      badge: "SWEET & SHARP",
      badgeBg: "bg-[#C5E1A5]",
      desc: "Our Nice Matcha is a lightly sweetened powdered mix of genuine stone-ground Japanese green tea, perfect for crafting barista matcha lattes in seconds.",
      imageType: "matcha-latte",
      price: 12.95,
      pairDesc: "Delicious hot or poured over ice with a splash of almond milk and raw honey."
    },
    {
      id: "prod-9", // Turmeric Golden Latte (Custom variant for slider)
      name: "Nice Turmeric Golden Latte Mix",
      title: "Golden Latte Mix",
      badge: "HEALTH BOOST",
      badgeBg: "bg-[#FFE082]",
      desc: "A warm, earthy barismix of vibrant golden turmeric root, ginger, black pepper, and refreshing citrus peel for the ultimate caffeine-free immunity boost.",
      imageType: "golden-latte",
      price: 12.95,
      pairDesc: "Steep in hot milk with a dash of cinnamon for a cozy sunset evening ritual."
    },
  ];

  const currentLatte = lattesList[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? lattesList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === lattesList.length - 1 ? 0 : prev + 1));
  };

  const handleShop = () => {
    // Find matching product list item
    const prod = PRODUCTS.find((p) => p.id === currentLatte.id) || {
      id: currentLatte.id,
      name: currentLatte.name,
      price: currentLatte.price,
      image: currentLatte.imageType,
      badgeText: "LATTE MIX",
    };
    addToCart(prod);
  };

  return (
    <section 
      className="bg-[#9E5B26] text-white py-12 px-4 md:py-20 md:px-8 border-y-4 border-black relative overflow-hidden"
      id="cafe-lattes"
    >
      {/* Decorative large circle cup badge similar to "DRINK MORE TEA" in image */}
      <div className="absolute -top-10 -right-10 w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#E57373]/20 border border-white/20 flex items-center justify-center rotate-12 select-none pointer-events-none">
        <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest text-[#FFF9C4]/40 text-center uppercase leading-none">
          DRINK MORE<br/>NICE LATTES<br/>★
        </span>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Highlight badge tag */}
        <div className="inline-block bg-[#00ACC1] text-black text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro mb-4 uppercase tracking-widest leading-none">
          Our Lattes
        </div>

        <h3 className="font-display font-bold text-2xl md:text-4xl text-center uppercase tracking-tight text-[#FFFDE7]">
          BARISTA BLENDS FOR EVERY MOOD
        </h3>
        <p className="text-[#FFE0B2] text-xs font-mono tracking-widest uppercase mt-1 mb-8">
          (NO BARISTA TRAINING REQUIRED)
        </p>

        {/* Carousel Window Panel Card */}
        <div className="relative w-full grid md:grid-cols-12 gap-8 items-center bg-[#FAF9F5] text-neutral-900 border-4 border-black rounded-3xl p-6 md:p-10 shadow-retro max-w-4xl">
          
          {/* Navigation Controls over the Container */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer shadow-retro-sm hover:-translate-x-0.5"
            aria-label="Previous blend"
            id="latte-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer shadow-retro-sm hover:translate-x-0.5"
            aria-label="Next blend"
            id="latte-next-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Left half: Product Graphic Presentation with shadows */}
          <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-center gap-6 md:border-r border-neutral-300 md:pr-10">
            <div className="relative transform hover:scale-105 duration-350 transition-transform">
              {/* Product Card Box */}
              <ProductIllustration 
                type={currentLatte.imageType} 
                badgeColor="bg-teal-500" 
                className="scale-110 md:scale-125 my-4" 
              />
              
              {/* Decorative dynamic background glow mimicking physical tea container setup */}
              <div className="absolute -inset-4 bg-orange-400/10 blur-xl rounded-full -z-10" />
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="flex gap-2">
              {lattesList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-3 h-3 rounded-full border border-black cursor-pointer ${
                    activeIdx === i ? "bg-[#00ACC1]" : "bg-neutral-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right half: Text Details + Add interaction */}
          <div className="col-span-12 md:col-span-6 md:pl-4 space-y-4">
            
            {/* Custom brand tag inside card */}
            <div className="flex items-center gap-2">
              <span className="bg-[#E64A19] text-white border border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded">
                {currentLatte.badge}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-bold uppercase flex items-center gap-1">
                <CupSoda className="w-3.5 h-3.5 text-[#00838F]" /> BARISTA SELECTION
              </span>
            </div>

            <h4 className="font-serif italic font-extrabold text-2xl md:text-3xl text-neutral-900 leading-tight">
              {currentLatte.title}
            </h4>

            <p className="text-sm text-neutral-600 leading-relaxed font-sans font-light">
              {currentLatte.desc}
            </p>

            <blockquote className="border-l-4 border-[#00ACC1] pl-3 italic text-xs text-neutral-500 py-1 font-sans">
              " {currentLatte.pairDesc} "
            </blockquote>

            <div className="flex items-center justify-between border-t border-neutral-200 pt-4 mt-6">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold tracking-wider">PREMIUM PRICE</span>
                <p className="text-[#E64A19] text-lg font-black font-mono leading-none">${(currentLatte.price ?? 0).toFixed(2)}</p>
              </div>

              <button
                onClick={handleShop}
                className="bg-[#00ACC1] text-black font-black uppercase tracking-widest text-xs px-6 py-3 rounded-xl border-2 border-black shadow-retro hover:bg-neutral-900 hover:text-white transition-all transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Shop Now</span>
                <Check className="w-4 h-4 font-black" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
