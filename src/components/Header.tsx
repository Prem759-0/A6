import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { ShoppingBag, Menu, X, ChevronDown, Award, Sparkles, BookOpen, User, Truck } from "lucide-react";

export const Header: React.FC = () => {
  const { cart, setCartOpen, activeCategory, setActiveCategory, setTrackingOpen, activePage, setActivePage } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { id: "all", label: "Shop All" },
    { id: "tea-sachets", label: "Tea Sachets" },
    { id: "naked-sachets", label: "Naked Sachets" },
    { id: "latte-mix", label: "Latte Mixes" },
    { id: "gifts-samplers", label: "Gifts & Samplers" },
  ];

  return (
    <>
      {/* Top Banner Statement */}
      <div className="bg-[#00838F] text-white text-[11px] font-medium tracking-widest text-center py-2 px-4 uppercase relative z-50">
        🌲 FREE US SHIPPING FOR ORDERS OVER $75 OR ADD A MIXER TO SAVE 🌲
      </div>

      <header className="sticky top-0 bg-white border-b border-neutral-200 z-40 transition-shadow hover:shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-12 md:h-16 flex items-center justify-between">
          
          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 -ml-1 text-neutral-700 hover:text-neutral-900 focus:outline-none"
            aria-label="Toggle mobile menu"
            id="mobile-menu-btn"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left Navigation: Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-widest text-[#1E2229]">
            <div className="relative group py-2">
              <button className="flex items-center gap-1 hover:text-[#00838F] transition-colors uppercase cursor-pointer">
                Shop <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 p-2 grid gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActivePage("store");
                      setActiveCategory(cat.id);
                      setTimeout(() => {
                        const el = document.getElementById("best-sellers-section");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }}
                    className={`text-left px-3 py-2 rounded-md hover:bg-[#FAF9F5] transition-colors flex items-center justify-between cursor-pointer ${
                      activeCategory === cat.id && activePage === "store" ? "text-[#00838F] bg-[#E0F2F1]/40 font-bold" : "text-neutral-700"
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
              className={`hover:text-[#00838F] transition-colors uppercase nav-link-hover inline-block cursor-pointer border-none bg-transparent font-semibold tracking-widest text-xs ${activePage === "origins" ? "text-[#00838F] font-black" : "text-[#1E2229]"}`}
            >
              Learn
            </button>

            <button 
              onClick={() => {
                setActivePage("store");
                setTimeout(() => {
                  const el = document.getElementById("reviews-section");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }}
              className="flex items-center gap-1 hover:text-[#00838F] transition-colors uppercase text-[#FF9800] nav-link-hover inline-block cursor-pointer border-none bg-transparent font-semibold tracking-widest text-xs"
            >
              Reviews <span className="text-yellow-500 font-bold">★</span>
            </button>
          </nav>

          {/* Central Logo Container */}
          <button
            onClick={() => {
              setActivePage("store");
              setActiveCategory("all");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center select-none group text-center cursor-pointer border-none bg-transparent"
            aria-label="Two Leaves and a Bud Homepage"
          >
            <div className="flex items-center gap-1">
              {/* Simple elegant leaves icon */}
              <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-8 md:h-8 text-[#5D8B2C] transform transition-transform group-hover:rotate-12 duration-350">
                <path d="M50,85 C50,85 45,55 25,45 C45,45 50,25 50,15 C50,25 55,45 75,45 C55,55 50,85 50,85 Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-serif italic text-base md:text-xl font-bold tracking-tight text-[#1E2229] leading-none">two leaves</span>
                <span className="text-[9px] md:text-[11px] font-sans font-light text-neutral-500 uppercase tracking-widest leading-none">and a bud</span>
              </div>
            </div>
          </button>

          {/* Right Navigation: Desktop */}
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden lg:flex items-center gap-6 text-[10px] md:text-xs font-semibold tracking-widest text-[#1E2229] uppercase">
              <button 
                onClick={() => {
                  setActivePage("wholesale");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`hover:text-[#00838F] transition-colors flex items-center gap-1 nav-link-hover inline-flex cursor-pointer border-none bg-transparent text-[10px] md:text-xs font-semibold uppercase tracking-widest ${activePage === "wholesale" ? "text-[#00838F] font-black" : "text-neutral-700"}`}
              >
                <Award className="w-4 h-4 text-amber-600 opacity-80" /> Cafe & Wholesale
              </button>
              <button 
                onClick={() => {
                  setActivePage("journal");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`hover:text-[#00838F] transition-colors flex items-center gap-1 nav-link-hover inline-flex cursor-pointer border-none bg-transparent text-[10px] md:text-xs font-semibold uppercase tracking-widest ${activePage === "journal" ? "text-emerald-700 font-black" : "text-neutral-700"}`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600 opacity-80" /> Tea Journal
              </button>
              <button 
                onClick={() => setTrackingOpen(true)}
                className="hover:text-[#00838F] transition-colors flex items-center gap-1 nav-link-hover inline-flex text-[10px] md:text-xs font-semibold uppercase tracking-widest text-neutral-700 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-blue-500 opacity-80" /> Track Order
              </button>
            </nav>

            {/* Shopping Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 font-semibold flex items-center gap-1 text-[#1E2229] hover:text-[#00838F] transition-all transform active:scale-95 cursor-pointer bg-[#FAF9F5] rounded-full hover:bg-neutral-100"
              aria-label="Open your cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-5 h-5 md:w-5.5 md:h-5.5 text-neutral-800" />
              <span className="absolute -top-1 -right-1.5 w-5 h-5 bg-[#E64A19] text-white rounded-full text-[10px] font-bold flex items-center justify-center leading-none shadow-sm animate-bounce-short">
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
                <div className="font-serif italic text-lg font-bold text-[#1E2229] leading-none">
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

            {/* Scrollable container categories */}
            <div className="flex-1 overflow-y-auto py-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#00838F] mb-3">Tea Categories</h3>
              <div className="grid gap-2">
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
                      }, 100);
                    }}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      activeCategory === cat.id && activePage === "store"
                        ? "bg-[#E0F2F1] text-[#00838F]"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 border-t border-neutral-100 pt-6 grid gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#00838F] mb-1">Company</h3>
                <button
                  onClick={() => {
                    setActivePage("origins");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-left font-semibold text-sm cursor-pointer border-none bg-transparent ${activePage === "origins" ? "text-[#00838F]" : "text-neutral-700"}`}
                >
                  Our Origins & Story
                </button>
                <button
                  onClick={() => {
                    setActivePage("store");
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById("reviews-section");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 100);
                  }}
                  className="text-left text-[#FF9800] font-semibold text-sm hover:opacity-80 flex items-center gap-1 cursor-pointer border-none bg-transparent"
                >
                  Testimonials & Reviews ⭐
                </button>
                <button
                  onClick={() => {
                    setActivePage("wholesale");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-left font-semibold text-sm cursor-pointer border-none bg-transparent ${activePage === "wholesale" ? "text-[#00838F]" : "text-neutral-700"}`}
                >
                  Wholesale Coffee & Tea Program
                </button>
                <button
                  onClick={() => {
                    setActivePage("journal");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-left font-semibold text-sm cursor-pointer border-none bg-transparent ${activePage === "journal" ? "text-emerald-700" : "text-neutral-700"}`}
                >
                  Tea Journal Blog
                </button>
              </div>
            </div>

            {/* Mobile Footer Area inside Drawer */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                setTrackingOpen(true);
              }}
              className="bg-[#FAF9F5] rounded-xl p-4 flex items-center gap-3 border border-[#E0F2F1] cursor-pointer hover:bg-[#E0F2F1]/30 transition-colors"
            >
              <Truck className="w-5 h-5 text-[#00838F]" />
              <div>
                <p className="text-xs font-bold text-neutral-800">Track Current Shipments</p>
                <p className="text-[10px] text-neutral-500">Live coordinates & package logging</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
