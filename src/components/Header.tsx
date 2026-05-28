import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { ShoppingBag, Menu, X, ChevronDown, Award, Sparkles, BookOpen, User, Truck, Database } from "lucide-react";

export const Header: React.FC = () => {
  const { cart, setCartOpen, activeCategory, setActiveCategory, setTrackingOpen, activePage, setActivePage } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dbState, setDbState] = useState<{ connected: boolean; count: number }>({ connected: false, count: 0 });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { id: "all", label: "Shop All" },
    { id: "tea-sachets", label: "Tea Sachets" },
    { id: "naked-sachets", label: "Naked Sachets" },
    { id: "latte-mix", label: "Latte Mixes" },
    { id: "gifts-samplers", label: "Gifts & Samplers" },
  ];

  // Fetch quick DB status for the pulse live dot inside header
  useEffect(() => {
    const checkDb = async () => {
      try {
        const response = await fetch("/api/mongodb/status");
        if (response.ok) {
          const data = await response.json();
          setDbState({
            connected: data.connected,
            count: (data.collections?.users || 0) + (data.collections?.orders || 0)
          });
        }
      } catch (e) {
        // ignore telemetry errors
      }
    };
    checkDb();
    const interval = setInterval(checkDb, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Banner Statement */}
      <div className="bg-[#00838F] text-white text-[11px] font-medium tracking-widest text-center py-2 px-4 uppercase relative z-50 flex items-center justify-center gap-2">
        <span className="hidden sm:inline">🌲</span>
        <span>FREE US SHIPPING FOR ORDERS OVER $75 • 100% ORGANIC & COMPOSTABLE SACHETS</span>
        <span className="hidden sm:inline">🌲</span>
      </div>

      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-neutral-100 z-40 transition-shadow hover:shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-20 flex items-center justify-between gap-4">
          
          {/* Left section: Logo & Moniker */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle mobile menu"
              id="mobile-menu-btn"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>

            <button
              onClick={() => {
                setActivePage("store");
                setActiveCategory("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 select-none group text-left cursor-pointer border-none bg-transparent"
              aria-label="Two Leaves and a Bud Homepage"
            >
              <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-8 md:h-8 text-[#5D8B2C] transform transition-transform group-hover:rotate-12 duration-300">
                <path d="M50,85 C50,85 45,55 25,45 C45,45 50,25 50,15 C50,25 55,45 75,45 C55,55 50,85 50,85 Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif italic text-sm md:text-lg font-bold tracking-tight text-[#1E2229] leading-none">two leaves</span>
                <span className="text-[8px] md:text-[10px] font-sans font-medium text-neutral-400 uppercase tracking-widest leading-none mt-0.5">and a bud</span>
              </div>
            </button>
          </div>

          {/* Desktop Central Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider text-neutral-800 uppercase">
            <div className="relative group py-2">
              <button className="flex items-center gap-0.5 hover:text-[#00838F] transition-colors cursor-pointer">
                Shop <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-neutral-100 rounded-xl shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 p-2.5 z-50">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActivePage("store");
                      setActiveCategory(cat.id);
                      setTimeout(() => {
                        const el = document.getElementById("best-sellers-section");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 120);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-between cursor-pointer border-none bg-transparent text-xs font-semibold ${
                      activeCategory === cat.id && activePage === "store" ? "text-[#00838F] bg-[#E0F2F1]/50 font-bold" : "text-neutral-700"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {activeCategory === cat.id && activePage === "store" && <div className="w-1.5 h-1.5 rounded-full bg-[#00838F]" />}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                setActivePage("origins");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`hover:text-[#00838F] transition-colors nav-link-hover cursor-pointer border-none bg-transparent ${activePage === "origins" ? "text-[#00838F] font-extrabold" : "text-neutral-800"}`}
            >
              Our Origins
            </button>

            <button 
              onClick={() => {
                setActivePage("journal");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`hover:text-emerald-700 transition-colors nav-link-hover cursor-pointer border-none bg-transparent ${activePage === "journal" ? "text-emerald-700 font-extrabold" : "text-neutral-800"}`}
            >
              Tea Journal
            </button>

            <button 
              onClick={() => {
                setActivePage("wholesale");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`hover:text-[#00838F] transition-colors nav-link-hover cursor-pointer border-none bg-transparent ${activePage === "wholesale" ? "text-[#00838F] font-extrabold" : "text-neutral-800"}`}
            >
              Wholesale
            </button>
          </nav>

          {/* Right Section: Interactive Status Indicators and Cart */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            
            {/* Live MongoDB Status Pill indicator - Desktop */}
            <button
              onClick={() => {
                setActivePage("mongodb");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Inspect Live MongoDB Real-time Cloud Collections"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono tracking-wide transition-all hover:bg-neutral-50 ${
                activePage === "mongodb" 
                  ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                  : "bg-white text-neutral-700 border-neutral-200"
              }`}
            >
              <Database className={`w-3.5 h-3.5 ${dbState.connected ? "text-emerald-500" : "text-amber-500 animate-pulse"}`} />
              <span className="font-bold">MongoDB:</span>
              <span className="flex items-center gap-1 font-semibold uppercase text-[9px]">
                {dbState.connected ? "Atlas Live" : "Local Sim"}
                <span className={`w-1.5 h-1.5 rounded-full ${dbState.connected ? "bg-emerald-500 animate-ping" : "bg-amber-400"}`} />
              </span>
            </button>

            {/* My Account link - Desktop */}
            <button
              onClick={() => {
                setActivePage("account");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                activePage === "account" 
                  ? "bg-[#E0F2F1] text-[#00838F] border-[#80CBC4]" 
                  : "bg-transparent text-neutral-700 hover:bg-neutral-50 border-neutral-200"
              }`}
            >
              <User className="w-4 h-4 text-[#00838F]/80" />
              <span>Account</span>
            </button>

            {/* Track Orders Link */}
            <button
              onClick={() => setTrackingOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900"
            >
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Track</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 h-10 w-10 md:h-11 md:w-11 flex items-center justify-center text-neutral-800 hover:text-[#00838F] transition-all transform active:scale-95 cursor-pointer bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-100"
              aria-label="Open your cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-800" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E64A19] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none shadow-sm animate-bounce-short">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-menu-overlay">
          {/* Backdrop screen filter */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative flex flex-col w-4/5 max-w-sm h-full bg-white shadow-xl py-6 px-5 z-10 transition-transform">
            <div className="flex items-center justify-between border-b pb-4 border-neutral-100">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#5D8B2C]">
                  <path d="M50,85 C50,85 45,55 25,45 C45,45 50,25 50,15 C50,25 55,45 75,45 C55,55 50,85 50,85 Z" fill="currentColor" />
                </svg>
                <div className="font-serif italic text-base font-bold text-[#1E2229] leading-none">
                  two leaves & a bud
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 focus:outline-none"
                id="close-mobile-menu-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable list inside Mobile Drawer */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#00838F] mb-3">Tea Categories</h3>
                <div className="grid gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActivePage("store");
                        setActiveCategory(cat.id);
                        setMobileMenuOpen(false);
                        setTimeout(() => {
                          const el = document.getElementById("best-sellers-section");
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 120);
                      }}
                      className={`text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors border-none bg-transparent ${
                        activeCategory === cat.id && activePage === "store"
                          ? "bg-[#E0F2F1] text-[#00838F] font-bold"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-150 pt-5 space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Navigation</h3>
                
                <button
                  onClick={() => {
                    setActivePage("origins");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left font-semibold text-xs py-2 px-3 rounded-lg border-none bg-transparent ${activePage === "origins" ? "bg-neutral-100 text-[#00838F] font-bold" : "text-neutral-700"}`}
                >
                  Our Origins & Tea Story
                </button>

                <button
                  onClick={() => {
                    setActivePage("journal");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left font-semibold text-xs py-2 px-3 rounded-lg border-none bg-transparent ${activePage === "journal" ? "bg-emerald-50 text-emerald-800 font-bold" : "text-neutral-700"}`}
                >
                  Tea Journal Blog
                </button>

                <button
                  onClick={() => {
                    setActivePage("wholesale");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left font-semibold text-xs py-2 px-3 rounded-lg border-none bg-transparent ${activePage === "wholesale" ? "bg-neutral-100 text-neutral-900 font-bold" : "text-neutral-700"}`}
                >
                  Wholesale Coffee & Tea
                </button>

                <button
                  onClick={() => {
                    setActivePage("account");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left font-semibold text-xs py-2 px-3 rounded-lg border-none bg-transparent ${activePage === "account" ? "bg-[#E0F2F1] text-[#00838F] font-bold" : "text-neutral-700"}`}
                >
                  My Account Profile
                </button>

                <button
                  onClick={() => {
                    setActivePage("mongodb");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left font-mono text-[11px] py-1.5 px-3 rounded-lg border border-dashed flex items-center gap-2 ${activePage === "mongodb" ? "bg-slate-900 text-white border-slate-900 font-bold" : "bg-white text-neutral-700 border-neutral-200"}`}
                >
                  <Database className="w-3.5 h-3.5 text-[#00838F]" />
                  <span>MongoDB Live Statistics</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer inside Drawer */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                setTrackingOpen(true);
              }}
              className="bg-neutral-50 rounded-xl p-3.5 flex items-center gap-3 border border-neutral-200 cursor-pointer hover:bg-neutral-100 transition-colors"
            >
              <Truck className="w-5 h-5 text-[#00838F]" />
              <div>
                <p className="text-xs font-bold text-neutral-800">Track Current Shipments</p>
                <p className="text-[10px] text-neutral-500">Live logs & package tracking</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
