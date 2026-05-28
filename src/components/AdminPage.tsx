import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";
import { ArrowLeft, Save, Sparkles, Check, Database, HelpCircle } from "lucide-react";

export const AdminPage: React.FC = () => {
  const { fetchCustomProducts, setActivePage, apiAddProduct, isStaticFrontendOnly } = useShop();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("11.95");
  const [category, setCategory] = useState("tea-sachets");
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("NEW BLEND");
  const [steepTime, setSteepTime] = useState("240");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-styled image templates for great visuals
  const IMAGE_PRESETS = [
    { url: "https://picsum.photos/seed/teablend1/500/500", label: "Mountain Herbal Green" },
    { url: "https://picsum.photos/seed/teablend2/500/500", label: "Amber Rooibos Sunrise" },
    { url: "https://picsum.photos/seed/teablend5/500/500", label: "Spiced Chai Pods" },
    { url: "https://picsum.photos/seed/teablend4/500/500", label: "Special Matcha Reserve" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!name || !price) {
      setError("Name and Price are required.");
      setLoading(false);
      return;
    }

    const payload = {
      name,
      price: Number(price),
      category,
      badgeText,
      description: description || `Exceptional loose-leaf tea blend carefully plucked by hand.`,
      steepTime: Number(steepTime) || 240,
      image: image || IMAGE_PRESETS[0].url,
      notes: notes || "Rich refreshing finish with hints of alpine forest leaves."
    };

    try {
      await apiAddProduct(payload);
      setSuccess(true);
      
      // Reset form fields
      setName("");
      setDescription("");
      setNotes("");
    } catch (err: any) {
      setError(err?.message || "Communication issue with MongoDB database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#00838F] selection:text-white">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation back and header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActivePage("store")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1E2229] hover:text-[#00838F] transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Storefront</span>
          </button>
          
          <button
            onClick={() => setActivePage("mongodb")}
            className="px-3 py-1.5 bg-[#E0F2F1] hover:bg-[#B2DFDB] text-[#004D40] text-xs font-bold rounded-lg transition-all border border-[#00838F]/20 cursor-pointer"
          >
            🍃 View MongoDB Telemetry
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border-4 border-black shadow-retro p-6 md:p-10"
        >
          <div className="flex items-center gap-3 border-b-2 border-dashed border-neutral-200 pb-6 mb-8">
            <div className="p-3 bg-amber-50 rounded-xl border-2 border-amber-500 text-amber-600">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif italic text-2xl md:text-3xl font-black text-neutral-900 flex items-center gap-2">
                Custom Tea Blend Creator <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              </h2>
              <p className="text-xs text-neutral-500 font-mono mt-1">
                Insert new products directly into MongoDB. They will instantly populate the main shop list!
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 rounded-xl p-4 text-xs font-semibold mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-2 border-green-200 text-green-700 rounded-xl p-4 text-xs font-semibold mb-6 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>
                Document successfully created in <strong>products</strong> collection on MongoDB! Navigating to storefront will show your new tea blend.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                  Tea Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Organic Colorado Gold Oolong"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                  Blend Price (USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                  Tea Category Badge
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3 uppercase text-xs font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                >
                  <option value="tea-sachets">🍃 tea-sachets</option>
                  <option value="naked-sachets">📦 naked-sachets</option>
                  <option value="latte-mix">🍵 latte-mix</option>
                  <option value="gifts-samplers">🎁 gifts-samplers</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                  Badge Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. BARISTA CHIEF"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                  Steeping Recommendation (Seconds)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 240 (4 Minutes)"
                  value={steepTime}
                  onChange={(e) => setSteepTime(e.target.value)}
                  className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                  Custom Blend Notes/Aroma
                </label>
                <input
                  type="text"
                  placeholder="e.g. Woody finish, hints of fresh pine"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-2">
                Choose Aesthetic Product Artwork Preset
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`p-1.5 border-2 rounded-xl text-left bg-[#FAF9F5] hover:bg-neutral-100 transition-all flex flex-col items-center cursor-pointer ${
                      image === preset.url ? "border-[#00838F] bg-[#E0F2F1]/30 ring-2 ring-[#00ACC1]/50" : "border-neutral-300"
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-square object-cover rounded-lg border border-black/10 pointer-events-none mb-1 shadow-sm"
                    />
                    <span className="text-[9px] font-bold text-neutral-600 block text-center leading-tight truncate w-full">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black tracking-widest text-neutral-700 block mb-1">
                Description / Story *
              </label>
              <textarea
                rows={3}
                placeholder="Write a charming, detailed description highlighting the selective pluck and carefully harvested whole leaf teas..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00838F] hover:bg-[#00ACC1] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "executing db.products.insertOne()..." : "Save custom blend to MongoDB"}</span>
            </button>
          </form>

        </motion.div>
      </div>
    </div>
  );
};
