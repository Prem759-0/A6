import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Check, 
  Database, 
  Lock, 
  User, 
  Trash2, 
  ShieldCheck, 
  Cpu, 
  Power, 
  Server, 
  RefreshCw 
} from "lucide-react";
import { ProductIllustration } from "./ProductIllustration";

export const AdminPage: React.FC = () => {
  const { 
    customProducts, 
    fetchCustomProducts, 
    setActivePage, 
    apiAddProduct, 
    isStaticFrontendOnly,
    mongodbStats
  } = useShop();

  // Authentication states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("tea_admin_authenticated") === "true";
  });
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Product form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("12.50");
  const [category, setCategory] = useState("tea-sachets");
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("HERITAGE");
  const [steepTime, setSteepTime] = useState("240");
  const [notes, setNotes] = useState("");
  const [selectedIllustration, setSelectedIllustration] = useState("jasmine-pearls");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Extended botanical illustration presets supported by <ProductIllustration />
  const ILLUSTRATION_PRESETS = [
    { type: "jasmine-pearls", label: "Dragon Jasmine Pearls", category: "tea-sachets" },
    { type: "matcha-canister", label: "Ceremonial Uji Matcha Canister", category: "latte-mix" },
    { type: "chamomile-serene", label: "Alpine Serene Chamomile", category: "tea-sachets" },
    { type: "earl-grey", label: "Royal Earl Grey Imperial", category: "tea-sachets" },
    { type: "peppermint-naked", label: "Naked Peppermint Bulk Pack", category: "naked-sachets" },
    { type: "turmeric-naked", label: "Naked Golden Turmeric Pack", category: "naked-sachets" },
    { type: "bamboo-chest", label: "Classic Wood Bamboo Chest", category: "gifts-samplers" },
    { type: "matcha-latte", label: "Stone Ground Sweet Matcha Latte", category: "latte-mix" },
    { type: "nice-chai", label: "Sweet Masala Chai Premix", category: "latte-mix" },
    { type: "golden-latte", label: "Ginger Herbal Golden Latte", category: "latte-mix" },
    { type: "iced-pouches", label: "Cold Brew Hibiscus Breeze Pouches", category: "gifts-samplers" },
    { type: "peach-blossom", label: "Peach Blossom Deluxe Tin", category: "gifts-samplers" },
    { type: "tropical-green", label: "Sun-Dried Tropical Green Box", category: "tea-sachets" },
    { type: "herbal-trio", label: "Decaffeinated Tea Trio Sampler", category: "gifts-samplers" }
  ];

  useEffect(() => {
    fetchCustomProducts();
  }, []);

  // Admin credentials verification form
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const emailInput = adminEmail.trim().toLowerCase();
    const passwordInput = adminPassword.trim();

    // Restricted strictly to admin@gmail.com or admin@gamil.com and password "webdev"
    const isValidUsername = emailInput === "admin@gmail.com" || emailInput === "admin@gamil.com";
    const isValidPassword = passwordInput === "webdev" || passwordInput === "admin@gmail.com,webdev";

    if (isValidUsername && isValidPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("tea_admin_authenticated", "true");
    } else {
      setLoginError("Invalid Administrator Credentials. Access Strictly Denied.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("tea_admin_authenticated");
    setAdminEmail("");
    setAdminPassword("");
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);
    setLoading(true);

    if (!name.trim() || !price) {
      setFormError("Product title and retail price are strictly required.");
      setLoading(false);
      return;
    }

    const payload = {
      name: name.trim(),
      price: Number(price),
      category,
      badgeText: badgeText.trim() || "NEW BLEND",
      description: description.trim() || "Exceptional loose-leaf tea blend carefully plucked in high altitudes.",
      steepTime: Number(steepTime) || 240,
      image: selectedIllustration,
      notes: notes.trim() || "Rich refreshing finish with hints of forest wind and morning mountain steam."
    };

    try {
      await apiAddProduct(payload);
      setFormSuccess(true);
      
      // Clear form inputs for subsequent creations
      setName("");
      setDescription("");
      setNotes("");
      setBadgeText("HERITAGE");
      setSteepTime("240");
      
      // Auto refresh ledger list
      fetchCustomProducts();
    } catch (err: any) {
      setFormError(err?.message || "Communication issue writing document to MongoDB Atlas server.");
    } finally {
      setLoading(false);
    }
  };

  // Allow admin to purge local custom creations
  const handleDeleteCustomItem = async (itemId: string) => {
    if (confirm("Are you sure you want to delete this custom product from the active ledger?")) {
      try {
        const saved = localStorage.getItem("tea_custom_products");
        let productsList = saved ? JSON.parse(saved) : [];
        productsList = productsList.filter((p: any) => p.id !== itemId);
        localStorage.setItem("tea_custom_products", JSON.stringify(productsList));
        
        // Also attempt custom delete endpoints if needed or simply refresh local virtual collection state
        await fetchCustomProducts();
        alert("Product record removed from local MongoDB virtual storage successfully.");
      } catch (err) {
        alert("Failed to delete product record cleanly.");
      }
    }
  };

  // Render Login Gate standard layout
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] py-20 px-4 flex items-center justify-center font-sans selection:bg-[#00838F] selection:text-white">
        <div className="max-w-md w-full bg-white rounded-3xl border-4 border-black shadow-retro p-8 relative">
          
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 border-2 border-black rounded-full p-3 font-semibold shadow-retro-sm">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center mt-4 mb-8">
            <h2 className="font-serif italic font-black text-2xl text-neutral-900">
              MongoDB Admin Gate
            </h2>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              restricted developer operations console
            </p>
          </div>

          {loginError && (
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-red-50 border-2 border-red-300 text-red-700 text-xs rounded-xl p-3 font-bold mb-5 flex items-center gap-2"
            >
              <span>❌</span>
              <span>{loginError}</span>
            </motion.div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 block mb-1 font-bold">
                Admin Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full pl-9 bg-neutral-50 border-2 border-black rounded-xl py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-600 block mb-1 font-bold">
                Access Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full pl-9 bg-neutral-50 border-2 border-black rounded-xl py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E2229] hover:bg-[#2C323D] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl border-2 border-black shadow-retro-sm hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer mt-4"
            >
              Authenticate Admin Key
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-dotted border-neutral-200 flex justify-between items-center">
            <button
              onClick={() => setActivePage("store")}
              className="text-[10px] font-bold text-neutral-500 uppercase hover:text-black hover:underline cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Store</span>
            </button>
            <span className="text-[9px] font-mono text-neutral-400">RESTRICTED ZONE v1.2</span>
          </div>
        </div>
      </div>
    );
  }

  // Render Full Admin Workspace
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#00838F] selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => setActivePage("store")}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-600 hover:text-[#00838F] transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Exit Admin Panel</span>
            </button>
            <h1 className="font-serif italic text-2xl md:text-3xl font-black text-neutral-900 mt-2 flex items-center gap-2">
              <span>MongoDB Operations Dashboard</span>
              <ShieldCheck className="w-6 h-6 text-[#00838F]" />
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Session: admin@gmail.com</span>
            </span>
            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg border border-red-200 cursor-pointer transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Telemetry quick indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-retro-small flex items-center gap-4">
            <div className="p-3 bg-teal-50 border border-teal-300 rounded-xl text-[#00838F]">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Write Collection</p>
              <p className="text-sm font-black font-serif text-neutral-900 leading-snug">db.products</p>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-retro-small flex items-center gap-4">
            <div className="p-3 bg-indigo-50 border border-indigo-300 rounded-xl text-indigo-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Custom Tea Blends</p>
              <p className="text-lg font-mono font-black text-neutral-950 leading-none">{customProducts.length}</p>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-retro-small flex items-center gap-4">
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-700">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Platform Mode</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 uppercase">
                {isStaticFrontendOnly ? "Virtual Staging" : "Atlas Sync Active"}
              </span>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-retro-small flex items-center gap-4">
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-700">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-bold">Latency Telemetry</p>
              <p className="text-xs font-mono font-bold text-emerald-800">
                {mongodbStats?.connected ? "4ms Connection Stable" : "Fallback Offline Active"}
              </p>
            </div>
          </div>
        </div>

        {/* Master workspace layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Product creation channel */}
          <div className="col-span-12 lg:col-span-12">
            <div className="bg-white rounded-3xl border-4 border-black p-6 md:p-8 shadow-retro">
              <h2 className="font-serif italic font-black text-xl text-neutral-900 border-b border-neutral-150 pb-4 mb-6 flex items-center gap-2">
                <span>➕ custom_blend_editor: insertOne()</span>
                <span className="text-[10px] font-mono bg-neutral-100 text-neutral-500 uppercase py-1 px-2.5 rounded font-bold">MongoDB Document Structure</span>
              </h2>

              {formError && (
                <div className="bg-red-50 border-2 border-red-300 text-red-600 rounded-xl p-4 text-xs font-semibold mb-6">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="bg-teal-50 border-4 border-teal-600 text-[#004D40] rounded-2xl p-5 text-xs font-semibold mb-6 flex items-center gap-3 shadow-retro-small">
                  <Check className="w-6 h-6 text-teal-700 shrink-0" />
                  <div>
                    <strong className="block text-sm">Successfully Written to db.products!</strong>
                    <span className="text-[11px] opacity-90 mt-0.5 block">
                      The product has been converted to an organic sachet document template and correctly appended to the live catalogue registry.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleProductSubmit} className="space-y-6">
                
                {/* Visual preset selection section */}
                <div className="border bg-[#FAF9F5]/80 rounded-2xl p-4 border-neutral-200">
                  <h3 className="text-xs font-mono font-black uppercase tracking-widest text-[#00838F] mb-3 flex items-center gap-1.5">
                    <span>🎨 step 1: choose botanical visual packaging artwork preset</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 h-[250px] overflow-y-auto pr-1 no-scrollbar border-b border-neutral-250/20 pb-4">
                    {ILLUSTRATION_PRESETS.map((preset) => (
                      <button
                        key={preset.type}
                        type="button"
                        onClick={() => {
                          setSelectedIllustration(preset.type);
                          setCategory(preset.category);
                        }}
                        className={`p-2 border-2 rounded-xl text-left bg-white hover:bg-neutral-50 transition-all flex flex-col items-center justify-between cursor-pointer ${
                          selectedIllustration === preset.type 
                            ? "border-[#00838F] bg-teal-50/20 ring-2 ring-[#00ACC1]/50 scale-[1.03]" 
                            : "border-neutral-300 opacity-80"
                        }`}
                      >
                        <ProductIllustration type={preset.type} badgeColor="bg-emerald-600" className="scale-[0.55] -my-11 pointer-events-none" />
                        <span className="text-[8px] font-sans font-bold text-center mt-1 leading-tight line-clamp-2 w-full text-neutral-800">
                          {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Active selected packaging showcase */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-white border border-neutral-200 rounded-xl p-3">
                    <span className="text-xs text-neutral-400 font-mono hidden sm:block">Real-time SVG Output Preview:</span>
                    <div className="scale-75 -my-5">
                      <ProductIllustration type={selectedIllustration} badgeColor="bg-[#00838F]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">
                        Preset Style: <span className="font-mono text-[#00838F]">{selectedIllustration}</span>
                      </h4>
                      <p className="text-[10px] text-neutral-500 mt-1">This SVG vector box template will render in high fidelity on the client catalog, featuring the exact botanical badges and brand layout.</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      tea blend title *
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
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      retail product price (USD) *
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
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      product category tag
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
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      ribbon badge label
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
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      steeping recommendation (seconds)
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
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      flavor notes & aromatic bouquet
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
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                    tea blossom story / detailed description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide a story detailing the high-altitude origin, morning plucks, leaf density characteristics, and recommended cup warmers..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00838F] hover:bg-[#00ACC1] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2 font-mono"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "executing db.products.insertOne()..." : "execute insertOne() query"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Bottom ledger block: Lists all currently created products */}
          <div className="col-span-12">
            <div className="bg-white rounded-3xl border-4 border-black p-6 shadow-retro overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-150 pb-4 mb-6">
                <div>
                  <h3 className="font-serif italic font-black text-lg text-neutral-900 flex items-center gap-2">
                    <Database className="w-5 h-5 text-neutral-700 animate-pulse" />
                    <span>Live Catalogue Ledger (Standard & Custom)</span>
                  </h3>
                  <p className="text-[10px] text-neutral-500 font-mono mt-0.5">query: db.products.find({})</p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  Total Records Mapped: <strong className="text-neutral-950 font-sans">{customProducts.length} custom</strong>
                </div>
              </div>

              {customProducts.length === 0 ? (
                <div className="bg-[#FAF9F5] border-2 border-dashed border-neutral-200 rounded-2xl py-12 text-center text-xs text-neutral-500 font-mono">
                  No custom tea documents present in the active collection. Apply the insertOne() form above to initialize one!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead>
                      <tr className="border-b-2 border-black text-neutral-500 uppercase tracking-wider text-[9px] bg-neutral-50">
                        <th className="py-3 px-4">Box Preview</th>
                        <th className="py-3 px-4 text-left">Document fields (Key-Values)</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4 text-right">Database action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {customProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF9F5]/50 transition-colors">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="scale-50 -my-10 -mx-8">
                              <ProductIllustration type={p.image} badgeColor="bg-[#00838F]" />
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-0.5 max-w-sm">
                              <p className="font-bold text-neutral-900 font-sans text-sm">{p.name}</p>
                              <p className="text-[10px] text-neutral-500 font-mono truncate leading-relaxed">
                                id: <span className="text-[#00838F]">{p.id}</span> | label: "{p.badgeText}"
                              </p>
                              <p className="text-[10px] text-stone-500 line-clamp-1 italic">
                                notes: {p.notes}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-[#E0F2F1] text-[#006064] border border-[#00838F]/10">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap font-bold text-neutral-900 font-sans text-sm">
                            ${(p.price || 0).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteCustomItem(p.id)}
                              className="p-2 border-2 border-red-200 hover:border-red-500 hover:bg-red-50 rounded-xl text-red-600 transition-colors cursor-pointer"
                              title="Delete Product Document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
