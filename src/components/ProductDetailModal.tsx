import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { ProductIllustration } from "./ProductIllustration";
import { X, Play, Pause, RotateCcw, Plus, Minus, Star, ShoppingCart, HelpCircle, Flame, Droplet } from "lucide-react";

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart,
    timerSecondsTotal,
    timerSecondsLeft,
    isTimerRunning,
    timerProductName,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    setTimerSecondsLeft
  } = useShop();

  // Local adjustments for timer before launching it
  const [customMinutes, setCustomMinutes] = useState(3);
  const [tempTimerStarted, setTempTimerStarted] = useState(false);

  // Sync preset time whenever product changes
  useEffect(() => {
    if (selectedProduct) {
      const defaultSeconds = getOptimalSeconds(selectedProduct);
      setCustomMinutes(Math.floor(defaultSeconds / 60));
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  // Settle optimal steeping requirements per category & name
  function getOptimalSeconds(product: any): number {
    const nameStr = product.name.toLowerCase();
    const catStr = product.category.toLowerCase();

    if (nameStr.includes("green") || nameStr.includes("matcha")) {
      return 120; // 2 minutes
    }
    if (nameStr.includes("peppermint") || nameStr.includes("mint") || nameStr.includes("berry") || nameStr.includes("chamomile") || nameStr.includes("turmeric") || catStr.includes("samplers")) {
      return 300; // 5 minutes (Herbal standard)
    }
    return 240; // 4 minutes (Chai and Black standard)
  }

  const optimalSeconds = getOptimalSeconds(selectedProduct);
  const isThisProductTimerRunning = isTimerRunning && timerProductName === selectedProduct.name;
  const isAnyTimerRunning = isTimerRunning && timerProductName !== selectedProduct.name;

  // Calculations for circle path
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  // Progress calculations
  const activeSecondsTotal = isThisProductTimerRunning || (timerProductName === selectedProduct.name) ? timerSecondsTotal : (customMinutes * 60);
  const activeSecondsLeft = isThisProductTimerRunning || (timerProductName === selectedProduct.name) ? timerSecondsLeft : (customMinutes * 60);
  const progressPercent = activeSecondsTotal > 0 ? (activeSecondsLeft / activeSecondsTotal) : 1;
  const strokeDashoffset = circumference * (1 - progressPercent);

  const formatTimerDigits = (secsTotal: number) => {
    const m = Math.floor(secsTotal / 60);
    const s = secsTotal % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleAdjustTimer = (deltaMinutes: number) => {
    setCustomMinutes((prev) => {
      const val = prev + deltaMinutes;
      return val < 1 ? 1 : val > 10 ? 10 : val;
    });
  };

  const startSelectedTimer = () => {
    startTimer(selectedProduct.name, customMinutes * 60);
    setTempTimerStarted(true);
  };

  // Determine steeping color
  let steepColorClass = "text-amber-500 fill-amber-500";
  if (selectedProduct.name.toLowerCase().includes("green") || selectedProduct.name.toLowerCase().includes("matcha")) {
    steepColorClass = "text-emerald-500 fill-emerald-500";
  } else if (selectedProduct.name.toLowerCase().includes("peppermint") || selectedProduct.name.toLowerCase().includes("mint")) {
    steepColorClass = "text-teal-500 fill-teal-500";
  } else if (selectedProduct.name.toLowerCase().includes("berry")) {
    steepColorClass = "text-rose-500 fill-rose-500";
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      
      {/* Modal Canvas Container */}
      <div className="bg-white border-4 border-black rounded-3xl w-full max-w-3xl overflow-hidden shadow-retro relative flex flex-col max-h-[92vh]">
        
        {/* Top bar header */}
        <div className="bg-[#1E2229] text-white p-4 md:p-5 border-b-4 border-black flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[#00ACC1]">
            🌿 Product Detail & Brew Guide
          </span>
          
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1 px-3 bg-white text-black border-2 border-black rounded-xl hover:bg-neutral-100 transition-colors uppercase font-black text-[10px] tracking-widest cursor-pointer"
          >
            Close ✕
          </button>
        </div>

        {/* Inner layout split */}
        <div className="p-5 md:p-8 overflow-y-auto grid md:grid-cols-12 gap-8 bg-[#FAF9F5] flex-1">
          
          {/* Column A: Left Product Image Side */}
          <div className="col-span-12 md:col-span-5 flex flex-col items-center space-y-4">
            <div className={`w-full aspect-square rounded-2xl border-2 border-black flex items-center justify-center p-6 relative overflow-hidden shadow-inner bg-gradient-to-br ${selectedProduct.bgGradient}`}>
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              <ProductIllustration type={selectedProduct.image} badgeColor="bg-black" className="scale-120 md:scale-135 drop-shadow-lg" />
              
              <span className={`absolute top-4 left-4 px-3 py-1 border border-black rounded-lg text-[9px] font-black uppercase tracking-wider ${selectedProduct.badgeColor} ${selectedProduct.badgeTextColor}`}>
                {selectedProduct.badgeText}
              </span>
            </div>

            {/* Price Badge */}
            <div className="w-full bg-white border-2 border-black rounded-xl p-3 text-center shadow-retro-sm">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block">PRICE POINT</span>
              <span className="font-mono text-xl font-black text-[#E64A19] mt-0.5 inline-block">
                {selectedProduct.isFromPrice ? "From " : ""}${selectedProduct.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Column B: Right Specs & Interactive Timer */}
          <div className="col-span-12 md:col-span-7 space-y-6">
            
            {/* Title, Category & Stars */}
            <div className="space-y-2">
              <h3 className="font-serif italic font-black text-2xl md:text-3xl text-neutral-900 leading-tight">
                {selectedProduct.name}
              </h3>
              
              {/* Review line */}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-600 underline">
                  {selectedProduct.rating.toFixed(2)} based on {selectedProduct.reviewCount} pluck verify reviews
                </span>
              </div>
            </div>

            {/* Description details */}
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light">
              {selectedProduct.description}
            </p>

            {/* Add to Cart drawer button */}
            <div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-[#E64A19] hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.5 active:translate-y-1 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" /> Add This Blend To Cart
              </button>
            </div>

            {/* INTERACTIVE DIGITAL TEA TIMER WIDGET */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-retro-sm space-y-4">
              
              {/* Header inside widget */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 tracking-tighter h-4 text-orange-600 stroke-[2.5]" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-neutral-900">
                    Sachets Steeping Clock
                  </span>
                </div>
                
                <span className="text-[10px] font-mono font-bold bg-[#E0F2F1] text-[#006064] px-2 py-0.5 border rounded">
                  Goal: {Math.floor(optimalSeconds / 60)} mins optimal
                </span>
              </div>

              {/* Grid content split: Clock SVG and Controls */}
              <div className="grid sm:grid-cols-12 gap-6 items-center">
                
                {/* Left: SVG Circular Gauge countdown */}
                <div className="sm:col-span-5 flex justify-center relative">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    
                    {/* Rotator SVG ring */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="5"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className={`transition-all duration-300 ${isThisProductTimerRunning ? "text-[#00838F]" : "text-neutral-400"}`}
                      />
                    </svg>

                    {/* Numeric clock displays inside circular circle */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-xl font-bold tracking-tighter text-neutral-900">
                        {formatTimerDigits(activeSecondsLeft)}
                      </span>
                      <span className="text-[7px] font-bold text-neutral-400 font-mono uppercase tracking-widest">
                        {isThisProductTimerRunning ? "STEEPING" : "SECONDS"}
                      </span>
                    </div>

                    {/* Steeping bubbling wave design inside the ring if countdown is actively running */}
                    {isThisProductTimerRunning && (
                      <div className="absolute inset-5 rounded-full overflow-hidden -z-10 bg-opacity-10 pointer-events-none">
                        {/* Bubbles */}
                        <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-40"></div>
                        <div className="absolute bottom-2 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
                        <div className="absolute bottom-3 left-6 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-30"></div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Right: Triggers + adjusters */}
                <div className="sm:col-span-7 space-y-4">
                  
                  {/* If timer state is active somewhere else */}
                  {isAnyTimerRunning && (
                    <div className="p-2 bg-amber-50 border border-amber-300 rounded text-[10px] text-amber-900 font-bold leading-none">
                      ⚠️ "{timerProductName}" timer is running. Click 'Reset' to override.
                    </div>
                  )}

                  {!isThisProductTimerRunning && (timerProductName !== selectedProduct.name || timerSecondsLeft === 0) ? (
                    // Adjustment View: If offline, setup timing Goal
                    <div className="flex items-center justify-between gap-2 border p-2 rounded-xl bg-[#FAF9F5]">
                      <button
                        onClick={() => handleAdjustTimer(-1)}
                        className="p-1 px-2.5 bg-white border border-black rounded-lg hover:bg-stone-50 text-xs font-black cursor-pointer"
                        title="Minus 1 minute"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <div className="text-center font-serif italic text-xs leading-none">
                        <span className="text-sm font-extrabold not-italic font-mono pr-0.5">{customMinutes}</span> Min steep
                      </div>

                      <button
                        onClick={() => handleAdjustTimer(1)}
                        className="p-1 px-2.5 bg-white border border-black rounded-lg hover:bg-stone-50 text-xs font-black cursor-pointer"
                        title="Plus 1 minute"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    // Running context View statement
                    <div className="p-2.5 rounded-xl border bg-emerald-50 border-emerald-300 text-[11px] font-bold text-emerald-900 flex items-center gap-1.5 animate-pulse">
                      <Droplet className="w-4 h-4 text-emerald-600 animate-spin" /> Perfect steeping in progress. Look at those leaves unfold!
                    </div>
                  )}

                  {/* Actions buttons row */}
                  <div className="flex gap-2.5">
                    {/* Launch trigger */}
                    {!isThisProductTimerRunning && (timerProductName !== selectedProduct.name || timerSecondsLeft === 0) ? (
                      <button
                        onClick={startSelectedTimer}
                        className="flex-1 bg-[#1E2229] hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest py-2.5 px-4 border-2 border-black rounded-xl shadow-retro-sm active:translate-y-0.5 flex items-center justify-center gap-1 cursor-pointer transition-transform"
                      >
                        <Play className="w-3.5 h-3.5" /> Start Timer
                      </button>
                    ) : (
                      <>
                        {isThisProductTimerRunning ? (
                          <button
                            onClick={pauseTimer}
                            className="flex-1 bg-amber-400 hover:bg-amber-500 text-neutral-900 font-black text-xs uppercase tracking-widest py-2.5 px-4 border-2 border-black rounded-xl shadow-retro-sm active:translate-y-0.5 flex items-center justify-center gap-1 cursor-pointer transition-transform"
                          >
                            <Pause className="w-3.5 h-3.5" /> Pause
                          </button>
                        ) : (
                          <button
                            onClick={resumeTimer}
                            className="flex-1 bg-[#00838F] hover:bg-[#00ACC1] text-white font-black text-xs uppercase tracking-widest py-2.5 px-4 border-2 border-black rounded-xl shadow-retro-sm active:translate-y-0.5 flex items-center justify-center gap-1 cursor-pointer transition-transform"
                          >
                            <Play className="w-3.5 h-3.5" /> Resume
                          </button>
                        )}

                        <button
                          onClick={resetTimer}
                          className="p-2.5 bg-white hover:bg-red-50 text-red-600 border-2 border-black rounded-xl shadow-retro-sm active:translate-y-0.5 flex items-center justify-center cursor-pointer transition-transform"
                          title="Reset Timer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Preset quick shortcuts row inside widget */}
                  {!isThisProductTimerRunning && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCustomMinutes(2)}
                        className={`text-[9px] uppercase font-black px-2 py-1 border rounded cursor-pointer ${customMinutes === 2 ? "bg-stone-200 border-neutral-400" : "bg-white hover:bg-stone-50 text-stone-500"}`}
                      >
                        Green / Matcha (2m)
                      </button>
                      <button
                        onClick={() => setCustomMinutes(4)}
                        className={`text-[9px] uppercase font-black px-2 py-1 border rounded cursor-pointer ${customMinutes === 4 ? "bg-stone-200 border-neutral-400" : "bg-white hover:bg-stone-50 text-stone-500"}`}
                      >
                        Chai / Black (4m)
                      </button>
                      <button
                        onClick={() => setCustomMinutes(5)}
                        className={`text-[9px] uppercase font-black px-2 py-1 border rounded cursor-pointer ${customMinutes === 5 ? "bg-stone-200 border-neutral-400" : "bg-white hover:bg-stone-50 text-stone-500"}`}
                      >
                        Decaf / Herbal (5m)
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Tip statement banner */}
        <div className="bg-amber-50 p-3.5 text-center text-[10px] text-amber-900 font-mono border-t border-amber-200 flex items-center justify-center gap-1.5">
          💡 <strong>Pro Steep Tip:</strong> Feel free to close this detailed window! The steeping timer will run in the background and pop open as a floating tool in the bottom right corner when finished!
        </div>

      </div>
    </div>
  );
};
