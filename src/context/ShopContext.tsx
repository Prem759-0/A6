import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  badgeText: string;
}

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product | { id: string; name: string; price: number; image: string; badgeText: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeVibe: string | null;
  setActiveVibe: (vibe: string | null) => void;
  filteredProducts: Product[];
  activeCategory: string; // "all" | "tea-sachets" | "gifts-samplers" | "naked-sachets" | "latte-mix"
  setActiveCategory: (cat: string) => void;
  isTrackingOpen: boolean;
  setTrackingOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  timerSecondsTotal: number;
  timerSecondsLeft: number;
  isTimerRunning: boolean;
  timerProductName: string;
  startTimer: (productName: string, seconds: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  setTimerSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("tea_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [isCartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVibe, setActiveVibe] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const [isTrackingOpen, setTrackingOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [timerSecondsTotal, setTimerSecondsTotal] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [timerProductName, setTimerProductName] = useState("");

  useEffect(() => {
    localStorage.setItem("tea_cart", JSON.stringify(cart));
  }, [cart]);

  // Steeping Timer countdown tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            triggerAudioBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSecondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  const triggerAudioBeep = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      
      // Note 1 (D5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Note 2 (A5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.15);
      gain2.gain.setValueAtTime(0.12, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.55);
    } catch (err) {
      console.warn("Audio chime unsupported or failed:", err);
    }
  };

  const startTimer = (productName: string, seconds: number) => {
    setTimerProductName(productName);
    setTimerSecondsTotal(seconds);
    setTimerSecondsLeft(seconds);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  const resumeTimer = () => {
    if (timerSecondsLeft > 0) {
      setTimerRunning(true);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSecondsLeft(0);
    setTimerSecondsTotal(0);
    setTimerProductName("");
  };

  const addToCart = (product: Product | { id: string; name: string; price: number; image: string; badgeText: string }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          badgeText: product.badgeText,
        },
      ];
    });
    setCartOpen(true); // Automatically slide open cart to give great UX feedback!
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Perform filtering based on search query, vibe tags & category tags
  const filteredProducts = PRODUCTS.filter((p) => {
    // 1. Filter by category if not "all"
    if (activeCategory !== "all" && p.category !== activeCategory) {
      return false;
    }

    // 2. Filter by search query (checks name, description, category, and badgeText)
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.badgeText.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Filter by Vibe tag mapping
    let matchesVibe = true;
    if (activeVibe) {
      const vibe = activeVibe.toLowerCase();
      if (vibe === "a sweet treat") {
        matchesVibe = p.name.toLowerCase().includes("fruit") || p.description.toLowerCase().includes("sweet") || p.name.toLowerCase().includes("chai");
      } else if (vibe === "evening unwind" || vibe === "calm & cozy" || vibe === "caffeine-free") {
        matchesVibe = p.category === "gifts-samplers" || p.description.toLowerCase().includes("soothing") || p.name.toLowerCase().includes("peppermint") || p.name.toLowerCase().includes("herbal");
      } else if (vibe === "focused & clear") {
        matchesVibe = p.name.toLowerCase().includes("green") || p.name.toLowerCase().includes("matcha");
      } else if (vibe === "over ice") {
        matchesVibe = p.name.toLowerCase().includes("tropical") || p.name.toLowerCase().includes("matcha");
      } else if (vibe === "lattes") {
        matchesVibe = p.category === "latte-mix" || p.name.toLowerCase().includes("chai") || p.name.toLowerCase().includes("latte");
      } else if (vibe === "black tea") {
        matchesVibe = p.name.toLowerCase().includes("chai") || p.description.toLowerCase().includes("black");
      } else if (vibe === "green tea") {
        matchesVibe = p.name.toLowerCase().includes("green") || p.name.toLowerCase().includes("matcha");
      } else if (vibe === "herbal tea") {
        matchesVibe = p.name.toLowerCase().includes("peppermint") || p.name.toLowerCase().includes("herbal") || p.name.toLowerCase().includes("trio");
      } else if (vibe === "organic") {
        matchesVibe = p.name.toLowerCase().includes("organic");
      } else if (vibe === "barista favorite") {
        matchesVibe = p.category === "latte-mix" || p.name.toLowerCase().includes("chai") || p.name.toLowerCase().includes("matcha");
      } else if (vibe === "fruit forward") {
        matchesVibe = p.name.toLowerCase().includes("tropical") || p.name.toLowerCase().includes("berries") || p.description.toLowerCase().includes("fruity");
      } else if (vibe === "whole leaf") {
        matchesVibe = p.category === "tea-sachets" || p.description.toLowerCase().includes("whole");
      } else if (vibe === "ceremony-worthy") {
        matchesVibe = p.name.toLowerCase().includes("matcha") || p.name.toLowerCase().includes("bamboo");
      }
    }

    return matchesSearch && matchesVibe;
  });

  return (
    <ShopContext.Provider
      value={{
        cart,
        isCartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        searchQuery,
        setSearchQuery,
        activeVibe,
        setActiveVibe,
        filteredProducts,
        activeCategory,
        setActiveCategory,
        isTrackingOpen,
        setTrackingOpen,
        selectedProduct,
        setSelectedProduct,
        timerSecondsTotal,
        timerSecondsLeft,
        isTimerRunning,
        timerProductName,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        setTimerSecondsLeft,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
