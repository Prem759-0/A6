import React, { useState } from "react";
import { Globe, Leaf, MapPin, Compass, ArrowRight, Star } from "lucide-react";

export const OriginsPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepsList = [
    {
      title: "1. The High Harvest Pluck",
      region: "Assam, India & Uji, Japan",
      altitude: "4,500 - 6,200 ft",
      text: "Every piece of our tea is hand-plucked at the absolute absolute agricultural pinnacle: only the tiny emergent top bud and the following two young leaves. These represent the purest concentrations of delicate L-Theanine and amino acids, completely free of the bitter heavy tannins located on lower tier branches.",
      flavorNote: "Sweet, highly aromatic flavor without a trace of bitterness.",
      symbol: "🌱"
    },
    {
      title: "2. The Micro-Oven Drying",
      region: "Mountain Drying Lofts",
      altitude: "Low Atmospheric Temp",
      text: "Leaves undergo gentle outdoor drying inside shaded loft compartments to slow cell oxidation. Following natural wilting, the whole leaves are panfired or steam-whisked to seal the emerald color molecules and dynamic structural oils intact.",
      flavorNote: "Fragrant, floral, and deeply complex organic profiles.",
      symbol: "🔥"
    },
    {
      title: "3. Colorado High Peak Design",
      region: "Boulder, Colorado Laboratories",
      altitude: "5,300 ft",
      text: "Our blending studio is nestled high in the clean, dry air of Colorado's alpine country. Here, we design customized custom spice pairings with freshly chopped cinnamon chips, raw fruit chunks, and high-altitude peppermint leaves to create robust blends tailored specifically to modern palates.",
      flavorNote: "Vibrant, comforting, and incredibly cozy taste profiles.",
      symbol: "⛰️"
    },
    {
      title: "4. Compostable Sachet Packing",
      region: "Colorado Green Facility",
      altitude: "Zero Waste Mandate",
      text: "We reject typical petroleum-plastic or bleached-paper tea bags! We seal complete whole leaves inside roomy, plant-based compostable pyramidal cornstarch sachets. These allow whole leaf botanical curls to swell and saturate completely under hot water.",
      flavorNote: "Brews perfectly clear, fully aerated tea with zero plastic particles.",
      symbol: "📦"
    }
  ];

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1E2229]">
      
      {/* Narrative Intro Hero Banner */}
      <section className="bg-gradient-to-r from-[#5D8B2C] to-[#00838F] text-white py-16 px-4 md:py-24 text-center border-b-4 border-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-block bg-[#00838F] text-white text-[10px] font-black px-4 py-1 border-2 border-white shadow-retro-xs uppercase tracking-widest leading-none">
            Agronomy & Story
          </div>
          <h1 className="font-serif italic font-extrabold text-4xl md:text-6xl tracking-tight leading-tight text-[#FFFDE7]">
            The Journey of the Apex Pluck
          </h1>
          <p className="text-sm md:text-lg max-w-2xl mx-auto text-neutral-100 font-light leading-relaxed">
            Our name is our process. "Two Leaves and a Bud" represents the absolute zenith of premium loose leaf tea harvesting. Let's trace how simple mountain leaves become your favorite organic brew.
          </p>
        </div>
      </section>

      {/* Philosophy block with interactive anatomical leaf visual */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left column text explaining anatomical pluck */}
        <div className="col-span-12 md:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF9F5] p-1 border-2 border-amber-400 rounded-lg p-2 font-black uppercase text-[10px] text-amber-600 tracking-wider">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Harvest Standard</span>
          </div>

          <h2 className="font-serif italic font-extrabold text-2xl md:text-3xl text-neutral-800 leading-snug">
            Why only “Two Leaves and a Bud”?
          </h2>

          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            Typical mass-market tea bags are filled with "dust and fannings" — the leftover floor sweeps of industrial gardens, packed with bitter ground stems. We select the topmost shoot of the tea plant (<span className="italic">Camellia sinensis</span>), consisting of the young emergent bud and the adjacent pair of delicate leaves.
          </p>

          {/* Core breakdown points */}
          <div className="grid gap-3 pt-2">
            {[
              { t: "The Emergent Bud", c: "Possesses natural sweet oils, offering soft aroma compounds.", em: "💮" },
              { t: "The Young Upper Leaves", c: "Contains intense concentrated caffeine compounds, providing focused energy.", em: "🍃" },
              { t: "Lower Tannic Leaves (Excluded!)", c: "Full of astringency and bitter minerals. We discard these entirely.", em: "❌" }
            ].map((p, i) => (
              <div key={i} className="flex gap-3 bg-white border border-neutral-100 p-3.5 rounded-2xl shadow-sm hover:border-neutral-300 transition-colors">
                <span className="text-xl shrink-0 mt-0.5">{p.em}</span>
                <div>
                  <h4 className="font-black text-xs text-neutral-800">{p.t}</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{p.c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Gorgeous Anatomical pluck drawing container */}
        <div className="col-span-12 md:col-span-6 bg-white border-2 border-black rounded-3xl p-6 shadow-retro flex flex-col items-center">
          <h3 className="font-serif italic font-black text-xs text-neutral-400 mb-6 uppercase tracking-widest text-center">
            Pluck Anatomy Drawing - Camellia Sinensis
          </h3>

          <div className="relative w-64 h-80 flex items-center justify-center bg-stone-50 rounded-2xl border border-dashed border-neutral-200">
            
            {/* The schematic drawing of tea branch shoot leaf */}
            <svg viewBox="0 0 100 120" className="w-48 h-64 text-[#5D8B2C]">
              {/* Branch Stem */}
              <path d="M50,110 L50,15" stroke="#795548" strokeWidth="2.5" fill="none" />
              
              {/* Emergent bud right on top */}
              <path d="M50,15 C48,25 50,35 50,45 C50,35 52,25 50,15 Z" fill="#9CCC65" stroke="#33691E" strokeWidth="1" className="animate-pulse" />
              
              {/* Upper leaf 1 */}
              <path d="M50,45 C35,40 25,55 35,70 C45,70 50,55 50,45 Z" fill="#689F38" stroke="#33691E" strokeWidth="1" />
              
              {/* Upper leaf 2 */}
              <path d="M50,45 C65,40 75,55 65,70 C55,70 50,55 50,45 Z" fill="#689F38" stroke="#33691E" strokeWidth="1" />

              {/* Lower excluded stem leaf */}
              <path d="M50,80 C30,85 20,100 30,110 C40,110 50,95 50,80 Z" fill="#33691E" stroke="#1B5E20" strokeWidth="1" opacity="0.15" />
            </svg>

            {/* Labels floating overlay */}
            <div className="absolute top-4 right-2 bg-[#E0F2F1] border border-[#00838F]/30 text-[#006064] text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded shadow-sm">
              ▲ Bud shoot (Aromatic)
            </div>

            <div className="absolute top-24 left-2 bg-emerald-50 border border-emerald-300 text-[#33691E] text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded shadow-sm">
              ◀ Leaves 1 & 2 (Focused tea oils)
            </div>

            <div className="absolute bottom-8 right-2 bg-rose-50 border border-rose-300 text-rose-600 text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded shadow-sm opacity-55">
              ▼ Leaf 3+ (Bitter stems - EXCLUDED)
            </div>

          </div>

          <p className="text-[10px] text-neutral-400 font-mono text-center max-w-xs mt-4">
            Only 2.5% of total harvest materials globally pass this strict biometric selection standard to form our Pyramidal Canisters.
          </p>
        </div>

      </section>

      {/* Interactive Agronomy Stages timeline cards */}
      <section className="bg-[#FFFDF4] border-t-2 border-b-2 border-black py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h3 className="font-serif italic font-extrabold text-2xl md:text-4xl text-[#1E2229]">
              How the Magic is Brewed: Stages of Harvesting
            </h3>
            <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">
              Click buttons to trace each agricultural stage
            </p>
          </div>

          {/* Stage selection selector pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto bg-white p-2 border-2 border-black rounded-2xl shadow-retro-sm">
            {stepsList.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 min-w-[120px] py-3 px-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeStep === idx 
                    ? "bg-[#00838F] text-white shadow-md" 
                    : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {st.symbol} {st.title.split(".")[1]}
              </button>
            ))}
          </div>

          {/* Active step display panel card */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 md:p-10 shadow-retro grid md:grid-cols-12 gap-6 items-center transform transition-transform duration-300">
            
            <div className="col-span-12 md:col-span-8 space-y-4">
              <span className="text-[9px] font-bold text-neutral-400 tracking-widest font-mono uppercase">ACTIVE STAGE HARVESTER</span>
              <h3 className="font-serif italic font-extrabold text-2xl text-[#1E2229]">{stepsList[activeStep].title}</h3>
              
              <div className="flex gap-4 text-[10px] font-black uppercase text-neutral-600 font-mono tracking-widest border-b pb-3 border-neutral-100">
                <span className="bg-stone-100 p-1 px-2.5 rounded border">📍 Region: {stepsList[activeStep].region}</span>
                <span className="bg-stone-100 p-1 px-2.5 rounded border">🏔️ altitude: {stepsList[activeStep].altitude}</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed pt-2">
                {stepsList[activeStep].text}
              </p>

              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-dotted border-amber-300 flex items-center gap-2 text-xs">
                <span className="text-amber-500 font-bold">✨ Tasting Outcome:</span>
                <span className="italic font-light text-[#1E2229]">{stepsList[activeStep].flavorNote}</span>
              </div>
            </div>

            {/* Stage Visual plaque */}
            <div className="col-span-12 md:col-span-4 flex items-center justify-center p-6 bg-[#FAF9F5] border border-neutral-200 rounded-2xl h-full min-h-[180px]">
              <div className="text-center space-y-3">
                <span className="text-6xl block select-none animate-bounce">{stepsList[activeStep].symbol}</span>
                <p className="text-[9px] font-mono uppercase font-black tracking-widest text-[#00838F] bg-[#E0F2F1] py-1 px-3.5 border border-[#00838F]/30 rounded-full">
                  Verified Organic CO-10
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Final organic credentials summary */}
      <section className="max-w-4xl mx-auto text-center py-16 px-4 space-y-6">
        <h3 className="font-serif italic font-extrabold text-2xl text-neutral-800">100% Honest, Clean Compost Organic Sourcing</h3>
        <p className="text-xs text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Each pyramid sachet is made of renewable cornstarch, which breaks down fully in active compost. We take great care of the environment so that it takes great care of your health.
        </p>
        <span className="text-3xl block filter saturate-50 select-none">🌲⛰️🍵🌲</span>
      </section>

    </div>
  );
};
