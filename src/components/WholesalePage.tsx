import React, { useState } from "react";
import { Award, Calculator, Clipboard, Mail, ShieldCheck, Star } from "lucide-react";

export const WholesalePage: React.FC = () => {
  const [teaType, setTeaType] = useState<"compostable" | "naked" | "barista">("compostable");
  const [boxQuantity, setBoxQuantity] = useState(25);
  const [customBrand, setCustomBrand] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Contact state
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const pricingMap = {
    compostable: { unitPrice: 0.45, name: "Pyramid Compostable Sachets (Cases of 100)" },
    naked: { unitPrice: 0.35, name: "Naked Whole Leaf Bulk Bags (Loose 500ct)" },
    barista: { unitPrice: 0.60, name: "Concentrated Barista Latte Mixes" },
  };

  const selectedPrice = pricingMap[teaType].unitPrice;
  const baseCost = boxQuantity * selectedPrice * 100; // multiplied by wholesale counts
  const brandingSurcharge = customBrand ? 45.00 : 0.00;
  
  // Volumetric wholesale discount tiers
  let discountPercent = 0;
  if (boxQuantity >= 100) discountPercent = 20;
  else if (boxQuantity >= 50) discountPercent = 15;
  else if (boxQuantity >= 20) discountPercent = 10;

  const totalCost = baseCost * (1 - discountPercent / 100) + brandingSurcharge;

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName && email) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="bg-[#FFFDF4] min-h-screen text-[#1E2229]">
      {/* Page Header banner */}
      <section className="bg-gradient-to-r from-[#00838F] to-[#00ACC1] text-white py-16 px-4 md:py-24 text-center border-b-4 border-black relative select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto space-y-4">
          <div className="inline-block bg-[#FF9800] text-black text-[10px] font-black px-4.5 py-1.5 border-2 border-black shadow-retro-orange uppercase tracking-widest">
            Partner Portal
          </div>
          <h1 className="font-serif italic font-extrabold text-4xl md:text-6xl tracking-tight leading-tight text-[#FFFDE7]">
            Café & Wholesale Program
          </h1>
          <p className="text-sm md:text-lg max-w-2xl mx-auto text-neutral-100 font-light leading-relaxed">
            Enhance your beverage menu with high-elevation, award-winning organic tea. We supply specialty cafes, boutique hotels, dynamic offices, and bakeries worldwide.
          </p>
        </div>
      </section>

      {/* Main Grid Content Area */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 grid md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left column: Interactive bulk calculator */}
        <div className="col-span-12 md:col-span-7 space-y-8">
          
          {/* Concept summary cards */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-retro relative overflow-hidden">
            <h3 className="font-serif italic font-extrabold text-xl md:text-2xl text-[#1E2229] mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#00838F]" /> Why Partners Choose Us
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="bg-[#FAF9F5] p-3.5 border border-neutral-200 rounded-xl space-y-1">
                <p className="font-black text-[#00838F] uppercase tracking-wider text-[10px]">Zero Waste</p>
                <p className="font-light text-neutral-500 text-2xs leading-snug">100% compostable plant-based bio-materials, no petroleum plastics.</p>
              </div>
              <div className="bg-[#FAF9F5] p-3.5 border border-neutral-200 rounded-xl space-y-1">
                <p className="font-black text-[#FF9800] uppercase tracking-wider text-[10px]">Exceptional Cup</p>
                <p className="font-light text-neutral-500 text-2xs leading-snug">Intact whole leaves pluck, retaining all delicate aromatic oils.</p>
              </div>
              <div className="bg-[#FAF9F5] p-3.5 border border-neutral-200 rounded-xl space-y-1">
                <p className="font-black text-rose-500 uppercase tracking-wider text-[10px]">Wholesale Tier</p>
                <p className="font-light text-neutral-500 text-2xs leading-snug">Dynamic pricing structures matching any commercial volume.</p>
              </div>
            </div>
          </div>

          {/* BULK CALCULATOR BOX */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-retro space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <div className="p-2 bg-[#E0F2F1] rounded-xl border border-black text-[#00838F]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif italic font-extrabold text-xl text-[#1E2229]">Bulk Sourcing Price Estimator</h3>
                <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono">Real-time commercial calculations</p>
              </div>
            </div>

            {/* Select product type */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 block">1. Select Commercial Packaging</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "compostable", title: "Pyramid Cases", description: "100 Sachets / Case", priceLabel: "$45/case" },
                  { id: "naked", title: "Naked Bulk Bags", description: "500 Loose / Bag", priceLabel: "$175/bag" },
                  { id: "barista", title: "Barista Mix Cases", description: "Barista Liquid Base", priceLabel: "$60/case" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTeaType(item.id as any)}
                    className={`p-3.5 rounded-2xl text-left border-2 leading-tight transition-all cursor-pointer flex flex-col justify-between h-24 ${
                      teaType === item.id 
                        ? "bg-[#00838F]/10 border-[#00838F] shadow-sm" 
                        : "bg-[#FAF9F5] border-black/10 hover:border-black/30"
                    }`}
                  >
                    <div>
                      <h4 className="font-black text-xs text-neutral-800">{item.title}</h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{item.description}</p>
                    </div>
                    <span className="text-[10px] font-black text-[#00838F] font-mono block mt-2">{item.priceLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-3 mt-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-600">2. Sourcing Volume Quantity</label>
                <span className="font-mono text-xs font-black bg-[#E0F2F1] text-[#00838F] px-2.5 py-1 rounded-lg border border-[#00838F]/2s">
                  {boxQuantity} Packages / Cases
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                value={boxQuantity}
                onChange={(e) => setBoxQuantity(Number(e.target.value))}
                className="w-full accent-[#00838F] cursor-pointer h-2 bg-neutral-200 rounded-lg outline-none"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono uppercase tracking-widest font-bold">
                <span>Min: 5 Units</span>
                <span>Tier 1: 20 units (10% off)</span>
                <span>Tier 2: 50 units (15% off)</span>
                <span>Max: 500+ units</span>
              </div>
            </div>

            {/* Custom Branding Checkbox */}
            <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="custom-brand"
                  checked={customBrand}
                  onChange={(e) => setCustomBrand(e.target.checked)}
                  className="w-4.5 h-4.5 accent-[#00838F] cursor-pointer"
                />
                <div>
                  <label htmlFor="custom-brand" className="text-xs font-black uppercase text-neutral-700 block cursor-pointer">
                    Apply Custom Branded Canister Sleeves (+$45)
                  </label>
                  <p className="text-[10px] text-neutral-500">Includes free layout design and high fidelity bamboo lid branding.</p>
                </div>
              </div>
            </div>

            {/* Summary cost placard */}
            <div className="bg-[#FAF9F5] rounded-3xl border-2 border-black p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-bold text-neutral-400 font-mono tracking-widest uppercase mb-0.5">Sourcing Quote Estimate</p>
                <h4 className="font-serif italic font-black text-xs text-neutral-600 leading-none">
                  Sourced: {pricingMap[teaType].name}
                </h4>
                {discountPercent > 0 && (
                  <p className="text-[10px] font-black text-emerald-600 font-mono mt-1">
                    ✓ VOLUME DISCOUNT APPLIED: -{discountPercent}%
                  </p>
                )}
              </div>
              <div className="text-center sm:text-right">
                <p className="text-[8px] font-bold text-neutral-400 tracking-widest font-mono uppercase">EST. WHOLESALE TOTAL</p>
                <div className="flex items-center justify-center sm:justify-end gap-2 mt-1">
                  <span className="text-3xl font-black font-mono text-[#00838F]">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className="text-[9px] text-neutral-500">USD</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right column: Form submission / Contact block */}
        <div className="col-span-12 md:col-span-5 space-y-6">
          <div className="bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-retro relative">
            
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#E0F2F1] border-2 border-[#00838F] text-[#00838F] rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="font-serif italic font-extrabold text-2xl text-[#1E2229]">Quote Request Sent!</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Thank you! Our wholesale account manager is already packing sample bundles. We will send you custom quotes and pricing terms within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setBusinessName("");
                    setEmail("");
                    setNotes("");
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#00838F] text-white font-bold text-xs uppercase border-2 border-black rounded-xl shadow-retro-sm cursor-pointer"
                >
                  Calculate Another Quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                  <div className="p-1 px-2 bg-amber-50 rounded-lg text-amber-600 border border-amber-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif italic font-extrabold text-[#1E2229] text-lg">Partner Sourcing Portal</h3>
                </div>

                <p className="text-xs text-neutral-500 leading-relaxed">
                  Enter your establishment details to activate corporate billing terms and lock this custom bulk discount estimate.
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block">Business / Coffee Shop Name</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Summit Coffee Roasters CO"
                    className="w-full bg-[#FAF9F5] border border-black/15 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#00838F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block">Corporate Contact Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@business.com"
                    className="w-full bg-[#FAF9F5] border border-black/15 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#00838F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest block">Add Special Sourcing Notes / Samples requested</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ask us for complimentary wholesale tasting boxes! Tell us what equipment you utilize."
                    className="w-full bg-[#FAF9F5] border border-black/15 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-[#00838F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#E64A19] hover:bg-[#D84315] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.1 active:translate-y-1 cursor-pointer transition-transform"
                >
                  Send Sourcing Inquiry & Request Samples
                </button>

                <div className="flex gap-2 items-center justify-center pt-3 text-[10px] font-bold text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed under Organic Sourcing Standards US-CO</span>
                </div>
              </form>
            )}

          </div>

          {/* Sourcing credentials card */}
          <div className="bg-[#E0F2F1] rounded-3xl border border-[#00838F]/20 p-5 flex items-center gap-3.5">
            <span className="text-2xl">🌱</span>
            <div className="leading-tight">
              <p className="text-xs font-black text-neutral-800 uppercase">Complimentary Samples Packet</p>
              <p className="text-[11px] text-neutral-600 mt-0.5">Contact us to lock custom rates on compostable whole leaf sachets with logo layout support.</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};
