import React, { useState } from "react";
import { JOURNAL_ARTICLES } from "../data";
import { JournalArticle } from "../types";
import { BookOpen, Calendar, Clock, X, Heart, MessageSquare, Share2 } from "lucide-react";

export const JournalGrid: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const handleLikeToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Generate generic stylish mockup step content for the blog post expansion drawer!
  const getRecipeContent = (article: JournalArticle) => {
    switch (article.category) {
      case "RECIPE":
        return {
          intro: "There’s nothing quite like the soothing aroma of an aromatic London Fog Earl Grey Latte. Making this luxurious, sweet, and comforting drink at home using whole-leaf organic tea takes only a few minutes and will rival your favorite mountain cafe.",
          ingredients: [
            "2 Two Leaves and a Bud Organic Earl Grey Sachets",
            "1/2 cup of Boiling Water",
            "1/2 cup of Steamed Milk (Oat, Soy, or Whole Milk)",
            "1/2 tsp of Sweet Vanilla Extract",
            "1 tsp of Organic Local Colorado Honey (optional)"
          ],
          steps: [
            "Steep the Earl Grey tea sachets in 1/2 cup of boiling water for exactly 5 minutes to release robust bergamot oils.",
            "While steeping, heat and froth your milk of choice until thick, creamy, and micro-foamed.",
            "Remove sachets (compost them!) and stir the honey and vanilla extract directly into the hot concentrated tea.",
            "Pour frothed hot milk over the sweetened tea base, spooning remaining warm foam on top. Dust with cinnamon or lavender stems."
          ]
        };
      case "MATCHA":
        return {
          intro: "Matcha green tea is renowned for its smooth, balanced, non-jittery clean energy boost. Elevate your morning stone-ground matcha latte formula using these essential barista parameters.",
          ingredients: [
            "1 tsp of Nice Matcha Tea Latte Mix powder",
            "2 oz of Hot Water (175°F - do not boil!)",
            "6 oz of Cold/Warm Coconut or Oat Milk",
            "Ice cubes (if serving over ice)"
          ],
          steps: [
            "Sift your Uji Matcha powder into an organic wide bowl to prevent clumping.",
            "Pour in the hot water and whisk vigorously in a rapid 'W' or 'M' pattern using a bamboo whisk for 30 seconds until a fine jade-green froth develops.",
            "In your glass cup, fill half with ice and cold milk.",
            "Slowly pour the frothed matcha concentrate over the top of the milk to create a stunning, Instagram-worthy layered look. Stir gently before sipping!"
          ]
        };
      default:
        return {
          intro: "Steeping organic ingredients is about more than just great taste. It is about transparency, supporting farms, and honoring the careful pluck where only the top two leaves and a bud are harvested.",
          ingredients: [
            "Pure loose leaf tea or plant-based pyramidal sachets",
            "Fresh filtered spring water",
            "An appreciation of slow tea rituals"
          ],
          steps: [
            "Always use freshly drawn cold filtered water. Re-boiling depletes water oxygen levels, making tea taste flat.",
            "Respect strict steeping temperatures: Green teas thrive around 175°F, Black & Herbal teas want a rolling boil at 212°F.",
            "Do not squeeze the sachets after brewing! Squeezing releases bitter tannins into the cup. Let it drip naturally.",
            "Sip slowly. Inhale the aroma first to activate olfactory pathways, then take a small sip to let the flavors hit your palate."
          ]
        };
    };
  };

  return (
    <section className="bg-[#FAF9F5] py-12 px-4 md:py-20 md:px-8 border-b-4 border-black" id="journal-section">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Title highlights */}
        <div className="inline-block bg-[#FFF59D] text-black text-xs font-black px-4 py-1.5 border-2 border-black shadow-retro mb-4 uppercase tracking-widest leading-none">
          Journal
        </div>

        <h3 className="font-serif italic font-bold text-2xl md:text-3xl text-neutral-950 text-center leading-snug max-w-2xl">
          A community steeped in <span className="text-[#00838F] font-extrabold not-italic">curiosity</span>. Explore brewing recipes, tea culture, and everyday wisdom.
        </h3>

        {/* Scrollable / Grid of Blog Cards */}
        <div className="w-full overflow-x-auto pb-6 mt-12 scrollbar-thin">
          <div className="flex gap-6 min-w-max px-2">
            {JOURNAL_ARTICLES.map((art) => {
              const isLiked = likedArticles[art.id] || false;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="w-[280px] bg-white border-2 border-black rounded-2xl overflow-hidden shadow-retro hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] cursor-pointer transition-all flex flex-col group"
                >
                  {/* Image container representation */}
                  <div className="h-44 bg-neutral-100 border-b-2 border-black relative flex items-center justify-center overflow-hidden">
                    {/* Retro Grid background pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                    
                    {/* Stylized custom drawing corresponding to the article */}
                    <div className="w-20 h-20 bg-[#FAF9F5] rounded-full border-2 border-black flex items-center justify-center shadow-md relative group-hover:scale-110 duration-500 transition-transform">
                      <span className="text-3xl">
                        {art.category === "RECIPE" ? "☕" : art.category === "MATCHA" ? "🍵" : art.category === "CHAI" ? "🌶" : "🍃"}
                      </span>
                      {/* Steaming elements on hover */}
                      <div className="absolute -top-1 w-1.5 h-4 bg-orange-400/25 rounded-full blur-[1px] animate-pulse"></div>
                    </div>

                    {/* Left corner floating badge */}
                    <div className={`absolute top-3 left-3 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border border-black rounded-md shadow-retro-sm ${art.badgeColor} ${art.badgeTextColor}`}>
                      {art.category}
                    </div>

                    {/* Like heart */}
                    <button
                      onClick={(e) => handleLikeToggle(art.id, e)}
                      className="absolute top-3 right-3 p-1.5 bg-white border border-black rounded-lg shadow-retro-sm hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                      aria-label="Like post"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-600" : "text-neutral-700"}`} />
                    </button>
                  </div>

                  {/* Body textual context */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-400 font-mono uppercase">
                        <Clock className="w-3 h-3 text-[#00838F]" /> <span>{art.readTime}</span>
                        <span className="text-neutral-300">•</span>
                        <span>{art.date}</span>
                      </div>
                      <h4 className="font-serif italic font-extrabold text-sm text-neutral-800 tracking-tight group-hover:text-[#00838F] transition-colors mt-2 leading-snug">
                        {art.title}
                      </h4>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-[11px] font-bold text-[#00838F] border-t border-dashed border-neutral-200 pt-3">
                      <span className="group-hover:underline">Read Recipe Steps →</span>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono">{isLiked ? 1 : 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => {
            alert("Taking you to the Two Leaves Teas full tea collection & culture archives! Subscribed readers will get updates automatically.");
          }}
          className="mt-8 bg-[#1E2229] hover:bg-neutral-800 text-white text-xs font-bold py-3.5 px-6 rounded-xl uppercase tracking-widest border-2 border-black shadow-retro transform active:scale-95 transition-all outline-none cursor-pointer"
        >
          Explore More Articles
        </button>

      </div>

      {/* Blog Article Popup Modal Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer" 
            onClick={() => setSelectedArticle(null)} 
          />

          <div className="bg-[#FAF9F5] border-4 border-black w-full max-w-xl rounded-2xl overflow-hidden shadow-retro relative z-10 flex flex-col max-h-[85vh]">
            {/* Header toolbar */}
            <div className="bg-white border-b-2 border-black p-4 flex justify-between items-center">
              <span className={`px-2 py-0.5 border border-black text-[9px] font-black rounded uppercase ${selectedArticle.badgeColor} ${selectedArticle.badgeTextColor}`}>
                {selectedArticle.category}
              </span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-1 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
                id="close-article-modal-btn"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Scrollable recipe text */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
                  <Calendar className="w-3.5 h-3.5" /> <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" /> <span>{selectedArticle.readTime}</span>
                </div>
                <h3 className="font-serif italic font-black text-2xl text-neutral-950 leading-tight">
                  {selectedArticle.title}
                </h3>
              </div>

              {/* Intro quote content */}
              <p className="text-sm text-neutral-700 leading-relaxed font-sans font-light">
                {getRecipeContent(selectedArticle).intro}
              </p>

              {/* Ingredients list block */}
              <div className="bg-white border-2 border-black rounded-xl p-4 shadow-retro-sm">
                <h4 className="font-serif italic font-bold text-sm text-[#00838F] mb-3 uppercase tracking-wider">
                  🍃 Barista Ingredients
                </h4>
                <ul className="space-y-2">
                  {getRecipeContent(selectedArticle).ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-2 text-xs font-semibold text-neutral-800">
                      <span className="text-[#FF9800]">✔</span> <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions steps list */}
              <div className="space-y-4">
                <h4 className="font-serif italic font-bold text-sm text-[#E64A19] uppercase tracking-wider">
                  📖 Step-by-Step Instructions
                </h4>
                <ol className="space-y-3.5">
                  {getRecipeContent(selectedArticle).steps.map((st, i) => (
                    <li key={i} className="flex gap-3 text-xs text-neutral-700 font-light leading-relaxed">
                      <span className="w-5 h-5 shrink-0 bg-[#00838F] text-white border border-black rounded-lg text-[9px] font-black flex items-center justify-center font-mono">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Footer action buttons inside modal */}
              <div className="flex items-center justify-between border-t border-neutral-200 pt-4 mt-8">
                <button
                  onClick={(e) => {
                    handleLikeToggle(selectedArticle.id, e);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-rose-600"
                >
                  <Heart className={`w-4 h-4 ${likedArticles[selectedArticle.id] ? "fill-rose-500 text-rose-600" : ""}`} />
                  <span>{likedArticles[selectedArticle.id] ? "Loved it!" : "Like Recipe"}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied! Tell your tea companions!");
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#00838F] hover:underline"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
