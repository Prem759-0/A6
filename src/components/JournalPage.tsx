import React, { useState } from "react";
import { BookOpen, Calendar, Clock, User, X, ChevronRight, Share2, Heart } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  imageEmoji: string;
  bgDecorative: string;
  contentMarkdown: string;
}

const JOURNAL_ARTICLES: Article[] = [
  {
    id: "1",
    title: "The Shaded Agronomy of Organic Uji Matcha",
    category: "Sourcing & Origins",
    readTime: "6 Min Read",
    date: "June 12, 2026",
    author: "Richard, Founder",
    summary: "Discover how Japanese farmers restrict up to 90% of sunlight 20 days prior to plucking to yield deep amino concentrations and that unmistakable emerald jade hue.",
    imageEmoji: "🍵",
    bgDecorative: "bg-emerald-50",
    contentMarkdown: "To understand true, ceremonial-worthy Uji Matcha, one must look at the shade. Unlike normal green teas that are grown in full sun, premium Uji tea gardens are covered with straw screens or black vinyl nets called 'Koba' starting twenty days before harvest.\n\n### Why Shade Matters\nBy restricting solar rays, the tea leaves are forced to grow extremely thin and wide to catch every glimmer of light. This prevents the chemical conversion of sweet, calming L-Theanine amino acids into stringent catechins. The result? A smooth, creamy matcha with an earthy umami flavor profile that tastes like sweet grass instead of bitter spinach.\n\n### The Whisking Ritual\nWhen stone-ground into micro-particles, we whisk the leaf itself into your water. This means you absorb 100% of the raw, whole leaf wellness benefits!"
  },
  {
    id: "2",
    title: "Does Your Mug Contain Petroleum? Sachet Breakdown",
    category: "Sustainability",
    readTime: "4 Min Read",
    date: "May 25, 2026",
    author: "Elena, Agronomist",
    summary: "Many premium tea bags rely on heat-sealed nylon plastics that shed microplastics under high temperatures. We explain how plant-based cornstarch resolves this.",
    imageEmoji: "📦",
    bgDecorative: "bg-[#00838F]/5",
    contentMarkdown: "For decades, industrial tea bag production utilized basic bleached paper, which easily rips. To resolve this, major brands moved to triangular bags made of nylon or polyethene terephthalate (PET).\n\n### The Microplastic Menace\nWhen steeped at 208°F, synthetic polymers break down. A single plastic tea bag can release billions of microplastic fibers directly into your clean morning cup. This is why we absolutely reject plastic in our sachets!\n\n### The Renewable Alternative\nOur pyramidal sachets are manufactured using 100% plant-based compostable polylactic starch derived from non-GMO corn. This bio-material breaks down fully and naturally inside local backyard soil compost within a few weeks, leaving absolutely zero chemical synthetics behind!"
  },
  {
    id: "3",
    title: "Celsius Chemistry: Sachet Steeping Temp Guide",
    category: "Brewing Science",
    readTime: "5 Min Read",
    date: "May 10, 2026",
    author: "Marc, Master Brewer",
    summary: "Ever wondered why green tea tastes bitter when brewed with boiling water? Learn the temperature points to optimize sweetness.",
    imageEmoji: "🌡️",
    bgDecorative: "bg-amber-50",
    contentMarkdown: "Water temperature is the most critical variable when steeping loose whole leaves. Simply dumping boiling (212°F) water over delicate herbs can scorch them instantly.\n\n### Green & Matcha: The Gentle Zone (175°F)\nDelicate green leaves should never feel water over 175°F. High heat releases bitter tannins and alkaloids rapidly, masking sweet notes, while gentle warmth coaxes clean amino sweetness out.\n\n### Herbal & Fruit: The Intense Zone (208°F)\nRoot bark, citrus peels, and mountain herbs are incredibly robust. They require high heat (208°F) to release their full-bodied minerals and essential oils. Let them steep for 5-6 minutes for the absolute richest elixir."
  }
];

export const JournalPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1E2229]">
      
      {/* Journal Title Heading */}
      <section className="bg-white border-b-2 border-black py-12 md:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF9F5] py-1.5 px-3.5 border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest text-[#00838F] shadow-retro-xs">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>The Organic Journal</span>
          </div>
          <h1 className="font-serif italic font-extrabold text-4xl md:text-5xl leading-tight text-neutral-800">
            Tea Sourcing & Culture Magazine
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 max-w-lg mx-auto font-light leading-relaxed">
            Pour yourself a fresh cup of organic loose leaf and dig into our deep explorations of high altitude agronomy, sustainable plastic-free packaging, and green steep science.
          </p>
        </div>
      </section>

      {/* Articles Grid Listing */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((art) => {
            const isSaved = bookmarked.includes(art.id);
            return (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="bg-white border-2 border-black rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-retro hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
              >
                <div>
                  {/* Category badging & Save button */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#E0F2F1] text-[#00838F] border border-[#00838F]/10 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {art.category}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(art.id, e)}
                      className="p-1 px-2 text-rose-500 font-bold text-xs"
                      title={isSaved ? "Saved" : "Save article"}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500" : ""}`} />
                    </button>
                  </div>

                  {/* Decorative Thumbnail Plaque */}
                  <div className={`w-full h-36 ${art.bgDecorative} rounded-2xl flex items-center justify-center text-5xl mb-4 group-hover:scale-[1.02] duration-350 transition-transform relative border border-dashed border-neutral-300`}>
                    <span>{art.imageEmoji}</span>
                  </div>

                  <h3 className="font-serif italic font-extrabold text-[#1E2229] text-lg hover:text-[#00838F] cursor-pointer transition-all leading-tight">
                    {art.title}
                  </h3>

                  <p className="text-[11px] text-neutral-500 mt-2 font-light leading-relaxed truncate-2-lines">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold text-neutral-400 font-mono uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                    <span>{art.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-500 transform group-hover:translate-x-0.5 duration-200" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FULLY WORKING ARTICLE READER DRAWER OVERLAY MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur screen backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedArticle(null)}
          />

          <div className="bg-white border-2 border-black rounded-3xl w-full max-w-2xl h-[85vh] max-h-[750px] overflow-hidden flex flex-col justify-between shadow-retro relative z-10 animate-scale-up">
            
            {/* Overlay Header */}
            <div className="p-4 md:p-6 border-b border-neutral-200 flex items-center justify-between bg-[#FAF9F5]">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold bg-[#E0F2F1] text-[#00838F] px-2.5 py-1 rounded-md text-[10px] uppercase font-mono tracking-widest">
                  {selectedArticle.category}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">• {selectedArticle.readTime}</span>
              </div>
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 px-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 font-bold text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Article Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="space-y-2">
                <h2 className="font-serif italic font-extrabold text-2xl md:text-3xl text-neutral-800 leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                  <span>By {selectedArticle.author}</span>
                  <span>• {selectedArticle.date}</span>
                </div>
              </div>

              {/* Plaque visual inside reader */}
              <div className={`w-full h-44 ${selectedArticle.bgDecorative} rounded-2xl flex items-center justify-center text-6xl border border-dashed border-neutral-300 relative`}>
                <span>{selectedArticle.imageEmoji}</span>
              </div>

              {/* Main typography content markup rendering */}
              <div className="prose prose-stone prose-sm text-neutral-700 leading-relaxed font-light space-y-4 pt-2">
                {selectedArticle.contentMarkdown.split("\n\n").map((para, i) => {
                  if (para.startsWith("###")) {
                    return (
                      <h4 key={i} className="font-serif font-black text-neutral-800 text-sm md:text-base tracking-tight pt-2">
                        {para.replace("###", "").trim()}
                      </h4>
                    );
                  }
                  return (
                    <p key={i} className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </div>

            </div>

            {/* Reader Footer Toolbar */}
            <div className="p-4 bg-[#FAF9F5] border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => alert("Deep appreciation shared! Link copied to clipboard safely.")}
                className="flex items-center gap-1.5 px-3 py-2 border border-black/10 hover:border-black/30 bg-white rounded-lg text-xs font-semibold text-neutral-700 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Article
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-[#00838F] hover:bg-[#006064] text-white font-bold text-xs uppercase rounded-lg border border-black shadow-retro-xs cursor-pointer"
              >
                Close Content
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
