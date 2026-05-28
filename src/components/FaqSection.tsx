import React, { useState } from "react";
import { HelpCircle, ChevronRight, BookOpen, Coffee, Truck, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "brewing" | "storage" | "shipping" | "packaging";
  icon: React.ReactNode;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: "brewing",
      icon: <Coffee className="w-4 h-4 text-emerald-600" />,
      question: "How do I steep the perfect cup of Two Leaves tea?",
      answer: "A perfect steep depends on the tea type. As a general guide: Green Teas steep best at 175°F-180°F for 2-3 minutes; Black Teas at 206°F-208°F for 4-5 minutes; Herbal/Fruit infusions at 208°F for 5 minutes. Try using our interactive digital tea timer widget (available on any product page) for a helpful automatic double-beep countdown!"
    },
    {
      category: "packaging",
      icon: <HelpCircle className="w-4 h-4 text-cyan-600" />,
      question: "Do your pyramidal tea bags contain plastic toxins?",
      answer: "Absolutely not! We are passionate advocates against microplastics. Our signature pyramidal tea sachets are 100% plant-based compostable, made from non-GMO sugar cane starch (PLA). They represent the pinnacle of green science, allowing unhindered water flow to bloom whole leaves, then returning safely to the earth."
    },
    {
      category: "storage",
      icon: <ShieldCheck className="w-4 h-4 text-amber-600" />,
      question: "How should I store my organic tea to ensure long-term freshness?",
      answer: "Keep your tea stored in an airtight container, placed in a cool, dark, and dry pantry away from spices or direct heat source. For bulk packaging like our 'Naked Sachets', keep the inner food-grade liner tightly folded or empty them into one of our high-quality tea canisters."
    },
    {
      category: "shipping",
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      question: "What are your shipping rates, and can I track my package?",
      answer: "We offer flat-rate standard delivery across the USA, which is entirely FREE for all orders over $75! All orders are dispatched within 24 hours from Carbondale, Colorado. You can track your shipment live at any time by clicking the 'Track Shipment' link in the footer or menu and inputting your simulated order credentials."
    },
    {
      category: "packaging",
      icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
      question: "What is the difference between standard and 'Naked' sachets?",
      answer: "Standard sachets are individually wrapped in paper envelopes—perfect for carrying on-the-go or sharing. 'Naked' sachets are packed directly into a bulk box of 50 without individual plastic-or-paper wrappers, saving material, minimizing shipping weight, and saving you over 20% per cup!"
    },
    {
      category: "brewing",
      icon: <BookOpen className="w-4 h-4 text-pink-600" />,
      question: "Is tea from Two Leaves and a Bud certified Organic and Gluten-Free?",
      answer: "Yes, our core varieties are thoroughly certified USDA Organic and non-GMO. We pluck only the top two leaves and a bud, which ensures incredibly rich flavor and native antioxidants without reliance on added syrups, gluten, or artificial chemicals."
    }
  ];

  return (
    <section className="py-16 px-4 md:py-24 md:px-8 bg-white border-b-4 border-black" id="faq-section">
      <div className="max-w-4xl mx-auto">
        
        {/* Section title header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-block bg-[#FFE082] text-black text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro-yellow uppercase tracking-widest leading-none">
            FAQ Center
          </div>
          
          <h2 className="font-serif italic font-black text-2xl md:text-3.5xl text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm max-w-lg font-light leading-relaxed">
            Got tea questions? We have answers. Learn more about brewing standards, environmental policies, and shipping from Colorado.
          </p>
        </div>

        {/* Collapsible accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF9F5] border-2 border-black rounded-2xl overflow-hidden transition-all duration-300 shadow-retro-sm hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border-2 border-black rounded-xl shadow-retro-xs shrink-0 flex items-center justify-center">
                      {faq.icon}
                    </div>
                    <span className="font-serif italic font-extrabold text-[#1E2229] text-sm md:text-base pr-4">
                      {faq.question}
                    </span>
                  </div>
                  
                  <span className={`p-1.5 bg-white border-2 border-black rounded-lg transition-transform duration-350 shrink-0 ${isOpen ? "rotate-90 bg-amber-100" : ""}`}>
                    <ChevronRight className="w-4 h-4 text-black" />
                  </span>
                </button>

                {/* Animated expand-collapse card body */}
                <div
                  className={`transition-all duration-300 ease-in-out border-black ${
                    isOpen ? "max-h-72 border-t-2 p-5 md:p-6 bg-white" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                  
                  {/* Small tag decorator */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider font-bold text-neutral-400 uppercase">
                      Category: {faq.category}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      🍃 Verified Green Sourced
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
