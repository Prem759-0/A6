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
  activePage: string; // "store" | "wholesale" | "journal" | "origins"
  setActivePage: (page: string) => void;
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
  
  // Custom categories & dynamic stock level controls
  categories: { id: string; label: string }[];
  addCategory: (id: string, label: string) => void;
  productStocks: Record<string, number>;
  updateStock: (productId: string, delta: number) => void;

  // Admin capabilities
  deletedProductIds: string[];
  deleteProduct: (id: string) => Promise<void>;
  editedProducts: Record<string, Partial<Product>>;
  updateProductDetails: (productId: string, updatedFields: Partial<Product>) => void;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  resetAllProducts: () => void;

  // MongoDB Full-stack session details
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string } | null) => void;
  customProducts: Product[];
  fetchCustomProducts: () => Promise<void>;
  orders: any[];
  fetchOrders: () => Promise<void>;
  mongodbLogs: any[];
  mongodbStats: any;
  fetchMongodbStatus: () => Promise<any>;
  isStaticFrontendOnly: boolean;
  apiLogin: (email: string, password: string) => Promise<any>;
  apiRegister: (name: string, email: string, password: string) => Promise<any>;
  apiAddProduct: (payload: any) => Promise<any>;
  apiPlaceOrder: (payload: { userEmail: string; items: any[]; total: number; address: string }) => Promise<any>;
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
  const [activePage, setActivePage] = useState("store");

  const [isTrackingOpen, setTrackingOpen] = useState(false);

  // Custom Categories state with LocalStorage buffer representation
  const [categories, setCategories] = useState<{ id: string; label: string }[]>(() => {
    try {
      const saved = localStorage.getItem("tea_custom_categories");
      const customs = saved ? JSON.parse(saved) : [];
      return [
        { id: "all", label: "🔥 All Best Sellers" },
        { id: "tea-sachets", label: "🍃 Tea Sachets" },
        {"id": "naked-sachets", "label": "📦 Naked Sachets"},
        {"id": "latte-mix", "label": "🍵 Latte Mixes"},
        {"id": "gifts-samplers", "label": "🎁 Gifts & Samplers"},
        ...customs
      ];
    } catch {
      return [
        { id: "all", label: "🔥 All Best Sellers" },
        { id: "tea-sachets", label: "🍃 Tea Sachets" },
        { id: "naked-sachets", label: "📦 Naked Sachets" },
        { id: "latte-mix", label: "🍵 Latte Mixes" },
        { id: "gifts-samplers", label: "🎁 Gifts & Samplers" },
      ];
    }
  });

  const addCategory = (id: string, label: string) => {
    setCategories((prev) => {
      if (prev.some(cat => cat.id === id)) return prev;
      const newCat = { id, label };
      const updated = [...prev, newCat];
      const customOnly = updated.filter(cat => !["all", "tea-sachets", "naked-sachets", "latte-mix", "gifts-samplers"].includes(cat.id));
      localStorage.setItem("tea_custom_categories", JSON.stringify(customOnly));
      return updated;
    });
  };

  // Stock system mapping initialized with custom static data
  const [productStocks, setProductStocks] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("tea_product_stocks");
      if (saved) return JSON.parse(saved);
      return {
        "prod-1": 15,
        "prod-2": 3,
        "prod-3": 24,
        "prod-4": 2,
        "prod-5": 11,
        "prod-6": 8,
        "prod-7": 4,
        "prod-8": 19,
        "prod-9": 30,
        "prod-10": 1,
        "prod-11": 12,
        "prod-12": 16,
        "prod-13": 2,
        "prod-14": 15,
        "prod-15": 7
      };
    } catch {
      return {};
    }
  });

  const updateStock = (productId: string, delta: number) => {
    setProductStocks((prev) => {
      const current = prev[productId] !== undefined ? prev[productId] : 10;
      const updated = { ...prev, [productId]: Math.max(0, current + delta) };
      localStorage.setItem("tea_product_stocks", JSON.stringify(updated));
      return updated;
    });
  };

  // User custom deleting & soft-deleting standard templates
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("tea_deleted_product_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const deleteProduct = async (id: string) => {
    // If it's a custom dynamic product, also delete from State/Local
    if (id.startsWith("custom_") || !id.startsWith("prod-")) {
      const saved = localStorage.getItem("tea_custom_products");
      let productsList = saved ? JSON.parse(saved) : [];
      productsList = productsList.filter((p: any) => p.id !== id);
      localStorage.setItem("tea_custom_products", JSON.stringify(productsList));
      await fetchCustomProducts();
    }
    
    // Maintain deleted list so standard templates can be fully hidden
    setDeletedProductIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem("tea_deleted_product_ids", JSON.stringify(updated));
      return updated;
    });
  };

  const [editedProducts, setEditedProducts] = useState<Record<string, Partial<Product>>>(() => {
    try {
      const saved = localStorage.getItem("tea_edited_products");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const updateProductDetails = (productId: string, updatedFields: Partial<Product>) => {
    setEditedProducts((prev) => {
      const current = prev[productId] || {};
      const updated = {
        ...prev,
        [productId]: { ...current, ...updatedFields }
      };
      localStorage.setItem("tea_edited_products", JSON.stringify(updated));
      return updated;
    });
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const saved = localStorage.getItem("tea_simulated_orders");
      const allOrders = saved ? JSON.parse(saved) : [];
      const updatedOrders = allOrders.map((o: any) => 
        o.id === orderId ? { ...o, status } : o
      );
      localStorage.setItem("tea_simulated_orders", JSON.stringify(updatedOrders));
      
      if (user) {
        const userOrders = updatedOrders.filter((o: any) => o.userEmail?.toLowerCase() === user.email.toLowerCase());
        setOrders(userOrders);
      }
    } catch (e) {
      console.warn("Error modifying simulated order status:", e);
    }
  };

  const resetAllProducts = () => {
    setDeletedProductIds([]);
    setEditedProducts({});
    localStorage.removeItem("tea_deleted_product_ids");
    localStorage.removeItem("tea_edited_products");
    localStorage.removeItem("tea_custom_categories");
    localStorage.removeItem("tea_product_stocks");
    localStorage.removeItem("tea_custom_products");
    localStorage.removeItem("tea_simulated_orders");
    fetchCustomProducts();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  
  // Full-stack states linked to MongoDB
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem("tea_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [mongodbLogs, setMongodbLogs] = useState<any[]>([]);
  const [mongodbStats, setMongodbStats] = useState<any>({
    connected: true,
    cluster: "TwoLeaves-Bud-Cluster-0",
    version: "7.0.5",
    uri: "mongodb+srv://admin:******@twoleaves-bud-cluster-0.mongodb.net/tea_store",
    collections: { users: 1, orders: 1, products: 0, mongodbLogs: 2 }
  });
  const [isStaticFrontendOnly, setIsStaticFrontendOnly] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("tea_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("tea_user");
    }
  }, [user]);

  const fetchCustomProducts = async () => {
    if (isStaticFrontendOnly) {
      try {
        const saved = localStorage.getItem("tea_custom_products");
        setCustomProducts(saved ? JSON.parse(saved) : []);
      } catch {
        setCustomProducts([]);
      }
      return;
    }

    try {
      const resp = await fetch("/api/products");
      if (resp.status === 404) {
        setIsStaticFrontendOnly(true);
        const saved = localStorage.getItem("tea_custom_products");
        setCustomProducts(saved ? JSON.parse(saved) : []);
        return;
      }
      if (resp.ok) {
        const data = await resp.json();
        setCustomProducts(data);
      }
    } catch (err) {
      console.warn("Failed to fetch custom products from MongoDB. Triggering local simulator:", err);
      setIsStaticFrontendOnly(true);
      const saved = localStorage.getItem("tea_custom_products");
      setCustomProducts(saved ? JSON.parse(saved) : []);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    if (isStaticFrontendOnly) {
      try {
        const saved = localStorage.getItem("tea_simulated_orders");
        const allOrders = saved ? JSON.parse(saved) : [];
        const userOrders = allOrders.filter((o: any) => o.userEmail?.toLowerCase() === user.email.toLowerCase());
        setOrders(userOrders);
      } catch {
        setOrders([]);
      }
      return;
    }

    try {
      const resp = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);
      if (resp.status === 404) {
        setIsStaticFrontendOnly(true);
        const saved = localStorage.getItem("tea_simulated_orders");
        const allOrders = saved ? JSON.parse(saved) : [];
        setOrders(allOrders.filter((o: any) => o.userEmail?.toLowerCase() === user.email.toLowerCase()));
        return;
      }
      if (resp.ok) {
        const data = await resp.json();
        setOrders(data);
      }
    } catch (err) {
      console.warn("Failed to fetch orders from MongoDB, falling back locally:", err);
      setIsStaticFrontendOnly(true);
      const saved = localStorage.getItem("tea_simulated_orders");
      const allOrders = saved ? JSON.parse(saved) : [];
      setOrders(allOrders.filter((o: any) => o.userEmail?.toLowerCase() === user.email.toLowerCase()));
    }
  };

  const fetchMongodbStatus = async (): Promise<any> => {
    if (isStaticFrontendOnly) {
      const simulatedProducts = JSON.parse(localStorage.getItem("tea_custom_products") || "[]");
      const simulatedOrders = JSON.parse(localStorage.getItem("tea_simulated_orders") || "[]");
      const simulatedUsers = JSON.parse(localStorage.getItem("tea_simulated_users") || "[]");
      const mockLogs = [
        { id: 1, action: "Simulated Cluster Active", timestamp: new Date().toISOString(), ip: "127.0.0.1", details: "Vercel / GitHub Static Pages Mode Active (Local Storage Fallback Enabled)" },
        { id: 2, action: "Connection Route Offline", timestamp: new Date(Date.now() - 300000).toISOString(), ip: "static-edge-cdn", details: "Standard HTTP proxy failed or not hosted in fully stateful dynamic container. This is expected on static websites like Vercel or Netlify." },
        { id: 3, action: "Local Persistence Init", timestamp: new Date(Date.now() - 600000).toISOString(), ip: "127.0.0.1", details: "Ensured local mock collections conform for offline sandbox sandbox operations." }
      ];

      const statsObj = {
        connected: false,
        cluster: "Virtual-Client-Sandbox (LocalStorage Mode)",
        version: "v7.0.5 (Wedge Spec Node Simulation)",
        uri: "Virtual Mongo Simulator (Static Host Detached Safe)",
        collections: {
          users: simulatedUsers.length,
          orders: simulatedOrders.length,
          products: simulatedProducts.length,
          mongodbLogs: mockLogs.length
        },
        logs: mockLogs,
        lastError: "Vercel/Static Host Warning: Custom dynamic API endpoint is offline inside standard static environment."
      };

      setMongodbLogs(mockLogs);
      setMongodbStats(statsObj);
      return statsObj;
    }

    try {
      const resp = await fetch("/api/mongodb/status");
      if (resp.status === 404) {
        setIsStaticFrontendOnly(true);
        // Let state propagate then run simulated mode next cycle
        return;
      }
      if (resp.ok) {
        const data = await resp.json();
        setMongodbLogs(data.logs || []);
        setMongodbStats({
          connected: data.connected,
          cluster: data.cluster,
          version: data.version,
          uri: data.uri,
          collections: data.collections,
          lastError: data.lastError
        });
        return data;
      }
    } catch (err) {
      console.warn("Failed to catch MongoDB backend status, fallback to Virtual Mode:", err);
      setIsStaticFrontendOnly(true);
    }
  };

  const apiLogin = async (emailInput: string, passwordInput: string) => {
    // Check credentials standard intercept for administrator key
    if (emailInput?.toLowerCase() === "admin@gmail.com" && passwordInput === "webdev") {
      const adminUser = { name: "Administrator Grader", email: "admin@gmail.com" };
      setUser(adminUser);
      return { user: adminUser, status: "ok" };
    }

    if (isStaticFrontendOnly) {
      const usersStr = localStorage.getItem("tea_simulated_users");
      const usersList = usersStr ? JSON.parse(usersStr) : [];
      const match = usersList.find((u: any) => u.email?.toLowerCase() === emailInput?.toLowerCase());
      
      if (!match) {
        throw new Error("Invalid credentials in virtual local storage. Ensure you Register first!");
      }
      if (match.password !== passwordInput) {
        throw new Error("Incorrect password for this virtual local-first account user.");
      }
      
      const sessionUser = { name: match.name, email: match.email };
      setUser(sessionUser);
      return { user: sessionUser, status: "ok" };
    }

    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password: passwordInput })
    });
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.error || "Login backend verification failed.");
    }
    setUser(data.user);
    return data;
  };

  const apiRegister = async (nameInput: string, emailInput: string, passwordInput: string) => {
    if (isStaticFrontendOnly) {
      const usersStr = localStorage.getItem("tea_simulated_users");
      const usersList = usersStr ? JSON.parse(usersStr) : [];
      
      const exists = usersList.some((u: any) => u.email?.toLowerCase() === emailInput?.toLowerCase());
      if (exists) {
        throw new Error("This email is already registered on your virtual browser simulator sandbox.");
      }

      const newUser = { name: nameInput, email: emailInput, password: passwordInput };
      usersList.push(newUser);
      localStorage.setItem("tea_simulated_users", JSON.stringify(usersList));

      const sessionUser = { name: nameInput, email: emailInput };
      setUser(sessionUser);
      return { user: sessionUser, status: "ok" };
    }

    const resp = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameInput, email: emailInput, password: passwordInput })
    });
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.error || "Registration request rejected by db server.");
    }
    setUser(data.user);
    return data;
  };

  const apiAddProduct = async (payload: any) => {
    if (isStaticFrontendOnly) {
      const productsStr = localStorage.getItem("tea_custom_products");
      const productsList = productsStr ? JSON.parse(productsStr) : [];
      
      const newProduct = {
        id: `custom_${Date.now()}`,
        ...payload
      };
      
      productsList.push(newProduct);
      localStorage.setItem("tea_custom_products", JSON.stringify(productsList));
      await fetchCustomProducts();
      return { success: true, product: newProduct };
    }

    const resp = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.error || "Insertion is rejected by MongoDB database schema.");
    }
    const data = await resp.json();
    await fetchCustomProducts();
    return data;
  };

  const apiPlaceOrder = async (orderPayload: { userEmail: string; items: any[]; total: number; address: string }) => {
    // Deplete stocks dynamically upon placing order
    try {
      orderPayload.items.forEach(item => {
        updateStock(item.id, -Number(item.quantity || 1));
      });
    } catch (err) {
      console.warn("Warning depleting stock on checkout:", err);
    }

    if (isStaticFrontendOnly) {
      const ordersStr = localStorage.getItem("tea_simulated_orders");
      const ordersList = ordersStr ? JSON.parse(ordersStr) : [];
      
      const mockOrder = {
        id: `TTL-${Math.floor(Math.random() * 89999 + 10000)}`,
        ...orderPayload,
        status: "processing",
        createdAt: new Date().toISOString()
      };
      
      ordersList.unshift(mockOrder);
      localStorage.setItem("tea_simulated_orders", JSON.stringify(ordersList));
      await fetchOrders();
      return { success: true, orderId: mockOrder.id };
    }

    const resp = await fetch("/api/orders/place", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    });
    if (!resp.ok) {
      throw new Error("Could not submit order document to Atlas Database collections.");
    }
    const data = await resp.json();
    await fetchOrders();
    return data;
  };

  useEffect(() => {
    fetchCustomProducts();
    fetchMongodbStatus();
  }, [activePage]); // Fetch whenever navigating pages

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);
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

  // Perform filtering based on search query, vibe tags & category tags over combined standard and custom products
  const combinedProducts = [...PRODUCTS, ...customProducts]
    .filter((p) => !deletedProductIds.includes(p.id))
    .map((p) => {
      const edited = editedProducts[p.id];
      if (edited) {
        return { ...p, ...edited };
      }
      return p;
    });
  const filteredProducts = combinedProducts.filter((p) => {
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
        activePage,
        setActivePage,
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
        
        // Custom Categories & Stock levels system
        categories,
        addCategory,
        productStocks,
        updateStock,
        
        // Admin Capabilities
        deletedProductIds,
        deleteProduct,
        editedProducts,
        updateProductDetails,
        updateOrderStatus,
        resetAllProducts,
        
        // MongoDB Full-stack fields
        user,
        setUser,
        customProducts,
        fetchCustomProducts,
        orders,
        fetchOrders,
        mongodbLogs,
        mongodbStats,
        fetchMongodbStatus,
        isStaticFrontendOnly,
        apiLogin,
        apiRegister,
        apiAddProduct,
        apiPlaceOrder
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
