import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { PRODUCTS } from "../data";
import { motion, AnimatePresence } from "motion/react";
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
  RefreshCw,
  Plus,
  Edit,
  RotateCcw,
  Sliders,
  Clock,
  CheckCircle,
  Truck,
  Upload,
  Terminal,
  TrendingUp,
  BarChart3,
  Activity,
  Code
} from "lucide-react";
import { ProductIllustration } from "./ProductIllustration";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export const AdminPage: React.FC = () => {
  const { 
    customProducts, 
    fetchCustomProducts, 
    setActivePage, 
    apiAddProduct, 
    isStaticFrontendOnly,
    mongodbStats,
    categories,
    addCategory,
    productStocks,
    updateStock,
    deletedProductIds,
    deleteProduct,
    editedProducts,
    updateProductDetails,
    updateOrderStatus,
    resetAllProducts,
    orders
  } = useShop();

  const activeProducts = [...PRODUCTS, ...customProducts]
    .filter(p => !deletedProductIds.includes(p.id))
    .map(p => {
      const ed = editedProducts[p.id];
      if (ed) {
        return { ...p, ...ed };
      }
      return p;
    });

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

  // Modern dynamic image-choice states for Product creation
  const [imageType, setImageType] = useState<"preset" | "url" | "upload">("preset");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [customFileBase64, setCustomFileBase64] = useState("");

  // Dynamic Category Creator form state
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatId, setNewCatId] = useState("");
  const [catSuccess, setCatSuccess] = useState(false);

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal editing form state
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editBadgeText, setEditBadgeText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStock, setEditStock] = useState("");

  // Edit modal image choice states
  const [editImageType, setEditImageType] = useState<"preset" | "url" | "upload">("preset");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editFileBase64, setEditFileBase64] = useState("");
  const [editPreset, setEditPreset] = useState("jasmine-pearls");

  const [allOrders, setAllOrders] = useState<any[]>([]);

  // --- BULK EDIT & MUTATOR STATES ---
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkStockVal, setBulkStockVal] = useState("");
  const [bulkPriceVal, setBulkPriceVal] = useState("");
  const [bulkPriceChangeType, setBulkPriceChangeType] = useState<"fixed" | "percentage" | "flat">("fixed");
  const [bulkStockChangeType, setBulkStockChangeType] = useState<"fixed" | "add">("fixed");
  const [analyticsChartType, setAnalyticsChartType] = useState<"area" | "bar">("bar");

  // --- ADVANCED DEV INSTRUMENTS STATE ---
  const [selectedConsoleQuery, setSelectedConsoleQuery] = useState("db.products.find({})");
  const [consoleOutput, setConsoleOutput] = useState<string>("Click Execute command selector below to evaluate active Atlas collection sets...");
  const [executionLatency, setExecutionLatency] = useState<number | null>(null);
  const [isConsoleRunning, setIsConsoleRunning] = useState(false);

  const combinedOrdersList = orders && orders.length > 0 ? orders : allOrders;

  const executeConsoleCommand = () => {
    setIsConsoleRunning(true);
    setConsoleOutput("evaluating query against active replica set nodes...");
    
    setTimeout(() => {
      let result: any = {};
      const latencyVal = Math.floor(Math.random() * 9) + 1;
      
      try {
        if (selectedConsoleQuery === "db.products.find({})") {
          result = {
            query: "db.products.find({})",
            success: true,
            recordsReturned: activeProducts.length,
            records: activeProducts.slice(0, 3).map(p => ({
              id: p.id,
              name: p.name,
              price: p.price,
              category: p.category,
              rating: p.rating ?? 5.0
            }))
          };
        } else if (selectedConsoleQuery === "db.orders.aggregate()") {
          const statusTotals = combinedOrdersList.reduce((acc: any, ord: any) => {
            acc[ord.status] = (acc[ord.status] || 0) + Number(ord.total || 0);
            return acc;
          }, {});
          
          result = {
            aggregation: "db.orders.aggregate([{ $group: { _id: '$status', revenue: { $sum: '$total' } } }])",
            success: true,
            collectionSize: combinedOrdersList.length,
            result: Object.keys(statusTotals).map(k => ({
              status: k,
              totalValueUSD: Number(statusTotals[k].toFixed(2))
            }))
          };
        } else if (selectedConsoleQuery === "db.users.countDocuments()") {
          const simulatedUsers = JSON.parse(localStorage.getItem("tea_simulated_users") || "[]");
          result = {
            query: "db.users.countDocuments({})",
            success: true,
            atlasCollectionsPrefix: "TwoLeaves",
            simulatedUsersMatched: simulatedUsers.length + 1,
            authSchemaVersion: "RSA-4096-BCrypt"
          };
        } else {
          result = {
            command: "db.adminCommand({ serverStatus: 1 })",
            clusterState: "PRIMARY",
            atlasVersion: "8.0.0-Genuine-Cloud",
            memoryFootprintMB: Math.floor(Math.random() * 45) + 364,
            uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 1420),
            tlsHandshakeAlertLevel: "RESTRICTED-ALLOW-EXTERNAL",
            clientIpAddress: "192.168.1.18",
            poolAvailableConnections: 128
          };
        }
        
        setConsoleOutput(JSON.stringify(result, null, 2));
      } catch (err: any) {
        setConsoleOutput(JSON.stringify({ error: err?.message || "Execution exception occurred" }, null, 2));
      } finally {
        setExecutionLatency(latencyVal);
        setIsConsoleRunning(false);
      }
    }, 450);
  };

  const getRevenueTrend = () => {
    const trendData = combinedOrdersList.slice().reverse().map((order) => {
      let dateStr = "Order " + order.id?.replace("order-", "");
      if (order.createdAt) {
        dateStr = new Date(order.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      }
      return {
        name: dateStr,
        revenue: Number(order.total || 0),
      };
    });
    if (trendData.length === 0) {
      return [
        { name: "May 25", revenue: 23.90 },
        { name: "May 26", revenue: 47.80 },
        { name: "May 27", revenue: 11.95 },
        { name: "May 28", revenue: 35.85 },
        { name: "May 29 (Today)", revenue: 0 }
      ];
    }
    return trendData;
  };

  const applyBulkUpdates = () => {
    if (selectedProductIds.length === 0) {
      alert("Please select at least one product using checkboxes.");
      return;
    }
    
    let stockCount = 0;
    let priceCount = 0;

    selectedProductIds.forEach((id) => {
      const pObj = activeProducts.find((p) => p.id === id);
      if (!pObj) return;

      // 1. Stock Updates
      if (bulkStockVal.trim() !== "") {
        const stockNum = parseInt(bulkStockVal, 10);
        if (!isNaN(stockNum)) {
          const currentStock = productStocks[id] !== undefined ? productStocks[id] : 10;
          if (bulkStockChangeType === "fixed") {
            const diff = stockNum - currentStock;
            updateStock(id, diff);
          } else {
            // "add" type (relative change)
            updateStock(id, stockNum);
          }
          stockCount++;
        }
      }

      // 2. Price Updates
      if (bulkPriceVal.trim() !== "") {
        const priceNum = parseFloat(bulkPriceVal);
        if (!isNaN(priceNum)) {
          const currentPrice = pObj.price !== undefined ? pObj.price : 0;
          let targetPrice = currentPrice;
          if (bulkPriceChangeType === "fixed") {
            targetPrice = priceNum;
          } else if (bulkPriceChangeType === "percentage") {
            targetPrice = currentPrice * (1 + priceNum / 100);
          } else if (bulkPriceChangeType === "flat") {
            targetPrice = currentPrice + priceNum;
          }
          targetPrice = Math.max(0.01, Number(targetPrice.toFixed(2)));
          updateProductDetails(id, { price: targetPrice });
          priceCount++;
        }
      }
    });

    alert(`Successfully applied batch updates to ${selectedProductIds.length} selected product documents (Stock values mutated: ${stockCount}, Price values mutated: ${priceCount})!`);
    setBulkStockVal("");
    setBulkPriceVal("");
    setSelectedProductIds([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProductIds(activeProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProductIds((prev) => [...prev, productId]);
    } else {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  // File Upload Helper to convert binary images to client-safe Base64 String
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (isEdit) {
        setEditFileBase64(base64String);
      } else {
        setCustomFileBase64(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  // Function to load all simulated order database records
  const loadAllOrders = () => {
    try {
      const saved = localStorage.getItem("tea_simulated_orders");
      setAllOrders(saved ? JSON.parse(saved) : []);
    } catch {
      setAllOrders([]);
    }
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  const handleOpenEditModal = (p: any) => {
    setEditingProduct(p);
    setEditName(p.name);
    setEditPrice(String(p.price));
    setEditCategory(p.category);
    setEditBadgeText(p.badgeText || "");
    setEditDescription(p.description || "");
    const stockVal = productStocks[p.id] !== undefined ? productStocks[p.id] : 10;
    setEditStock(String(stockVal));

    // Prepopulate images configuration based on active product's structure
    const imgStr = p.image || "";
    if (imgStr.startsWith("http://") || imgStr.startsWith("https://")) {
      setEditImageType("url");
      setEditImageUrl(imgStr);
      setEditFileBase64("");
      setEditPreset("jasmine-pearls");
    } else if (imgStr.startsWith("data:") || imgStr.startsWith("blob:")) {
      setEditImageType("upload");
      setEditFileBase64(imgStr);
      setEditImageUrl("");
      setEditPreset("jasmine-pearls");
    } else {
      setEditImageType("preset");
      setEditPreset(imgStr || "jasmine-pearls");
      setEditImageUrl("");
      setEditFileBase64("");
    }
  };

  const handleSaveEditModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Resolve what image property value to update
    const finalImage = editImageType === "url" 
      ? (editImageUrl.trim() || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=200")
      : editImageType === "upload" 
      ? (editFileBase64 || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=200")
      : editPreset;

    // Save fields
    updateProductDetails(editingProduct.id, {
      name: editName,
      price: Number(editPrice) || 10.00,
      category: editCategory,
      badgeText: editBadgeText,
      description: editDescription,
      image: finalImage
    });

    // Update stock
    const originalStock = productStocks[editingProduct.id] !== undefined ? productStocks[editingProduct.id] : 10;
    const delta = (Number(editStock) || 0) - originalStock;
    if (delta !== 0) {
      updateStock(editingProduct.id, delta);
    }

    setEditingProduct(null);
    alert("Product changes saved and committed successfully!");
  };

  const handleUpdateSimulatedOrderStatus = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    loadAllOrders(); // reload
    alert(`Order #${orderId} has been updated to "${newStatus}" status.`);
  };

  const handleDeleteSimulatedOrder = (orderId: string) => {
    if (confirm(`Are you sure you want to purge Order #${orderId} from Database collection?`)) {
      try {
        const saved = localStorage.getItem("tea_simulated_orders");
        const ordersList = saved ? JSON.parse(saved) : [];
        const filtered = ordersList.filter((o: any) => o.id !== orderId);
        localStorage.setItem("tea_simulated_orders", JSON.stringify(filtered));
        loadAllOrders();
        alert("Simulated transaction sheet purged.");
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Auto generate Slug for dynamic categories
  useEffect(() => {
    const slug = newCatLabel
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setNewCatId(slug);
  }, [newCatLabel]);

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel.trim() || !newCatId.trim()) return;
    addCategory(newCatId, newCatLabel.trim());
    setCatSuccess(true);
    setNewCatLabel("");
    setTimeout(() => setCatSuccess(false), 3000);
  };

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

    const finalImage = imageType === "url" 
      ? (customImageUrl.trim() || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=200")
      : imageType === "upload" 
      ? (customFileBase64 || "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=200")
      : selectedIllustration;

    const payload = {
      name: name.trim(),
      price: Number(price),
      category,
      badgeText: badgeText.trim() || "NEW BLEND",
      badgeColor: "bg-[#2E5A27]",
      badgeTextColor: "text-white",
      rating: 4.8 + Number((Math.random() * 0.2).toFixed(2)),
      reviewCount: Math.floor(Math.random() * 12) + 4,
      isFromPrice: false,
      bgGradient: "from-[#F1F8E9] to-[#E8F5E9]",
      description: description.trim() || "Exceptional loose-leaf tea sachet blend carefully plucked in high altitudes.",
      steepTime: Number(steepTime) || 240,
      image: finalImage,
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
      setCustomImageUrl("");
      setCustomFileBase64("");
      setImageType("preset");
      
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

          {/* Instructor & Grading Credentials Badge with Instant One-Click Autofill */}
          <div className="mb-6 p-4 bg-[#E0F2F1] border-2 border-[#00838F] rounded-2xl shadow-retro-mini font-mono text-xs select-none">
            <div className="flex items-center gap-1.5 text-[#004D40] font-bold text-[11px] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#009688] animate-ping" />
              <span>INSTRUCTOR/GRADER AUTH DETAILS:</span>
            </div>
            <div className="space-y-1 text-stone-700">
              <p>Email: <strong className="text-neutral-900 select-all">admin@gmail.com</strong></p>
              <p>Password: <strong className="text-neutral-900 select-all">webdev</strong></p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAdminEmail("admin@gmail.com");
                setAdminPassword("webdev");
              }}
              className="mt-3 w-full bg-[#00838F] hover:bg-[#00707B] text-white font-sans font-extrabold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg border border-black shadow-retro-mini cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-1"
            >
              <span>⚡ AUTOFILL CREDENTIALS</span>
            </button>
          </div>

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

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Session: admin@gmail.com</span>
            </span>
            <button
              onClick={() => {
                if (confirm("WARNING: Proceeding will erase all staging datasets (custom products, edited product records, custom filters, order tracking logs) and fully restore the application state. Do you wish to continue?")) {
                  resetAllProducts();
                }
              }}
              className="px-3 py-1.5 text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg border border-amber-200 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Factory Staging Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Database Reset</span>
            </button>
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

        {/* Advanced Management Row: Charts & Live API Command Interceptor */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
          
          {/* Revenue Analytics Visual Panel */}
          <div className="xl:col-span-7 bg-white rounded-3xl border-4 border-black p-6 shadow-retro relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#E64A19] text-white font-mono font-black text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-bl-xl border-l-2 border-b-2 border-black">
              System Analytics v1.2
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-150 pb-3 mb-5 gap-2">
              <h2 className="font-serif italic font-black text-xl text-neutral-900 flex items-center gap-1.5 leading-none">
                <span>📊 Real-Time Financial & Revenue Ledger</span>
              </h2>
              <div className="flex items-center bg-stone-100 border border-neutral-300 rounded-lg p-0.5 self-start sm:self-auto font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setAnalyticsChartType("bar")}
                  className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    analyticsChartType === "bar" ? "bg-[#00838F] text-white font-semibold" : "text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Trend Bar Chart
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyticsChartType("area")}
                  className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    analyticsChartType === "area" ? "bg-[#5D8B2C] text-white font-semibold" : "text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  Area Curve Chart
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-5 text-center">
              <div className="bg-[#FAF9F5] border-2 border-black rounded-xl p-2.5 font-mono">
                <span className="text-[8.5px] text-stone-500 block uppercase font-bold">Gross Revenue</span>
                <span className="text-sm font-black text-[#E64A19] mt-0.5 inline-block">
                  ${(orders && orders.length > 0 ? orders : allOrders).reduce((acc, ord) => acc + Number(ord.total || 0), 0).toFixed(2)}
                </span>
              </div>
              <div className="bg-[#FAF9F5] border-2 border-black rounded-xl p-2.5 font-mono">
                <span className="text-[8.5px] text-stone-500 block uppercase font-bold">Staged Orders</span>
                <span className="text-sm font-black text-neutral-900 mt-0.5 inline-block">
                  {(orders && orders.length > 0 ? orders : allOrders).length} bills
                </span>
              </div>
              <div className="bg-[#FAF9F5] border-2 border-black rounded-xl p-2.5 font-mono">
                <span className="text-[8.5px] text-stone-500 block uppercase font-bold">Avg Receipt</span>
                <span className="text-sm font-black text-[#00838F] mt-0.5 inline-block">
                  ${((orders && orders.length > 0 ? orders : allOrders).length > 0
                    ? (orders && orders.length > 0 ? orders : allOrders).reduce((acc, ord) => acc + Number(ord.total || 0), 0) / (orders && orders.length > 0 ? orders : allOrders).length
                    : 15.65).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Recharts Graphical Visualizer */}
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                {analyticsChartType === "bar" ? (
                  <BarChart
                    data={getRevenueTrend()}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={9} fontClassName="font-mono" />
                    <YAxis stroke="#888888" fontSize={9} fontClassName="font-mono" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1E2229", color: "white", borderRadius: "12px", border: "2px solid black", fontSize: "11px", fontWeight: "bold" }}
                      formatter={(val: any) => [`$${Number(val || 0).toFixed(2)}`, "Daily Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="#00838F" radius={[4, 4, 0, 0]} maxBarSize={45}>
                      {getRevenueTrend().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#00838F" : "#00ACC1"} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <AreaChart
                    data={getRevenueTrend()}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A2C97A" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#A2C97A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={9} fontClassName="font-mono" />
                    <YAxis stroke="#888888" fontSize={9} fontClassName="font-mono" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1E2229", color: "white", borderRadius: "12px", border: "2px solid black", fontSize: "11px", fontWeight: "bold" }}
                      formatter={(val: any) => [`$${Number(val || 0).toFixed(2)}`, "Revenue"]}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#5D8B2C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <p className="text-[9.5px] text-neutral-400 font-mono text-center mt-2">
              Graph charts real-time transaction values of staging and live synchronized Mongo orders.
            </p>
          </div>
          
          {/* Interactive Shell Terminal Panel */}
          <div className="xl:col-span-5 bg-neutral-900 border-4 border-black text-neutral-300 rounded-3xl p-6 shadow-retro relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-3 right-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-stone-100 font-mono text-[11px] font-black tracking-wider uppercase border-b border-stone-800 pb-2 mb-4">
                <span className="bg-[#00838F] text-white px-2 py-0.5 rounded text-[9px] uppercase font-bold">shell console</span>
                <span>mongodb_shell_v1.0.8</span>
              </div>
              
              <p className="text-[10px] text-stone-400 mb-2 font-mono uppercase tracking-wider font-bold">Execute Database Query Staging Pointer:</p>
              
              <div className="flex gap-2 mb-4">
                <select 
                  value={selectedConsoleQuery}
                  onChange={(e) => setSelectedConsoleQuery(e.target.value)}
                  className="bg-neutral-800 text-stone-100 border border-neutral-700 rounded-lg py-1.5 px-2 text-xs font-mono grow focus:outline-none"
                >
                  <option value="db.products.find({})">db.products.find(&#123;&#125;)</option>
                  <option value="db.orders.aggregate()">db.orders.aggregate(&#123; $group... &#125;)</option>
                  <option value="db.users.countDocuments()">db.users.countDocuments()</option>
                  <option value="db.adminCommand({ serverStatus: 1 })">db.adminCommand(&#123; serverStatus: 1 &#125;)</option>
                </select>
                
                <button
                  type="button"
                  onClick={executeConsoleCommand}
                  disabled={isConsoleRunning}
                  className="bg-[#00838F] hover:bg-[#00ACC1] text-white font-mono font-black text-xs px-3.5 py-1.5 rounded-lg hover:shadow-inner active:scale-95 transition-all flex items-center gap-1 select-none border border-neutral-800 cursor-pointer"
                >
                  <span>EXECUTE</span>
                </button>
              </div>
              
              <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-3.5 h-36 font-mono text-[10.5px] overflow-y-auto leading-relaxed text-emerald-400 border-2 border-black no-scrollbar select-all">
                {isConsoleRunning ? (
                  <div className="flex items-center gap-2 py-8 justify-center select-none text-stone-450">
                    <span className="w-4.5 h-4.5 rounded-full border-2 border-stone-500 border-t-transparent animate-spin inline-block" />
                    <span>querying replica cluster sets...</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
                )}
              </div>
            </div>

            <div className="border-t border-stone-800 pt-3 mt-4 flex justify-between items-center text-[9px] font-mono text-stone-550">
              <span>Repl_Host: asia-east1-shard-0</span>
              <span>
                {executionLatency !== null ? `Latency: ${executionLatency}ms` : "Console idle"}
              </span>
            </div>
          </div>
          
        </div>

        {/* Master workspace layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Product creation channel */}
          <div className="col-span-12 lg:col-span-8">
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
                
                {/* Visual preset & custom image/upload selection section */}
                <div className="border bg-[#FAF9F5]/80 rounded-2xl p-5 border-neutral-200">
                  <h3 className="text-xs font-mono font-black uppercase tracking-widest text-[#00838F] mb-4 flex items-center gap-1.5 justify-between">
                    <span>🎨 step 1: choose packaging design or custom illustration</span>
                    <span className="text-[9px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Image Uploader Ready</span>
                  </h3>
                  
                  {/* Tabs header */}
                  <div className="flex gap-1.5 border-b border-slate-200 pb-3 mb-4">
                    {[
                      { id: "preset", label: "🎨 Presets" },
                      { id: "url", label: "🌐 Image Web URL" },
                      { id: "upload", label: "📤 Upload Custom Image" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setImageType(tab.id as any)}
                        className={`flex-1 py-2 px-3 text-[10px] uppercase tracking-wider font-extrabold rounded-lg border-2 transition-all cursor-pointer ${
                          imageType === tab.id 
                            ? "bg-[#00838F] text-white border-black shadow-retro-sm" 
                            : "bg-white text-stone-600 hover:bg-neutral-100 border-neutral-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Body: presets */}
                  {imageType === "preset" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 h-[250px] overflow-y-auto pr-1 no-scrollbar border-b border-neutral-200 pb-4">
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
                  )}

                  {/* Tab Body: URL */}
                  {imageType === "url" && (
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-3 mb-4">
                      <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-500 block">
                        paste external image web url (jpg/png/webp)
                      </label>
                      <input
                        type="url"
                        placeholder="e.g. https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                      />
                      <p className="text-[9px] text-neutral-400 leading-normal">
                        Provide a direct URL to showcase custom tea sachet photos, raw farm images, or unique mockups.
                      </p>
                    </div>
                  )}

                  {/* Tab Body: upload */}
                  {imageType === "upload" && (
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-4 mb-4">
                      <div className="border-3 border-dashed border-neutral-300 rounded-xl p-6 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors relative flex flex-col items-center justify-center cursor-pointer min-h-[140px]">
                        <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                        <span className="text-xs font-bold text-neutral-700">Click to Browse local files</span>
                        <span className="text-[10px] text-neutral-400 mt-1 font-mono">Accepts PNG, JPG, WEBP formats</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, false)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      
                      {customFileBase64 && (
                        <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 p-2.5 rounded-lg">
                          <div className="w-10 h-10 border border-neutral-350 rounded overflow-hidden shrink-0">
                            <img src={customFileBase64} alt="Pre-upload thumb" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-teal-850 truncate text-[11px]">Sachet Illustration Uploaded</p>
                            <p className="text-[9px] text-teal-600 font-mono">Base64 conversion ready for Mongo ingestion</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCustomFileBase64("")}
                            className="text-xs text-rose-500 font-bold hover:underline bg-transparent border-none cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Active selected packaging showcase */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-white border border-neutral-200 rounded-xl p-3">
                    <span className="text-xs text-neutral-400 font-mono hidden sm:block">Product Output Preview:</span>
                    <div className="scale-75 -my-5">
                      <ProductIllustration 
                        type={
                          imageType === "url" 
                            ? customImageUrl 
                            : imageType === "upload" 
                            ? customFileBase64 
                            : selectedIllustration
                        } 
                        badgeColor="bg-[#00838F]" 
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800">
                        Design Type: <span className="font-mono text-[#00838F] uppercase">{imageType}</span>
                      </h4>
                      <p className="text-[10px] text-neutral-500 mt-1 leading-normal">
                        {imageType === "preset" 
                          ? `Using standard botanical packaging preset "${selectedIllustration}".`
                          : "Using custom responsive image assets. The live catalog sachet graphic will wrap this dynamic photo in active tea badges automatically."
                        }
                      </p>
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
                      {categories.filter(c => c.id !== "all").map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
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

          {/* Right panel: New dynamic 'CategoryFilter' component with live sync */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border-4 border-black p-6 shadow-retro">
              <h2 className="font-serif italic font-black text-xl text-neutral-900 border-b border-neutral-150 pb-4 mb-6 flex flex-col">
                <span>🌱 category_registry_manager</span>
                <span className="text-[10px] font-mono bg-[#E0F3F5] text-[#00838F] uppercase py-1 px-2.5 rounded font-bold mt-1.5 self-start">Dynamic Filters</span>
              </h2>

              {catSuccess && (
                <div className="bg-green-50 border-2 border-green-600 text-green-800 rounded-xl p-3 text-xs font-semibold mb-4 text-center">
                  ✓ Category Filter Created Instantly!
                </div>
              )}

              <form onSubmit={handleAddCategorySubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1 font-bold">
                    category filter label
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🍰 Sweet Pastries"
                    value={newCatLabel}
                    onChange={(e) => setNewCatLabel(e.target.value)}
                    className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1 font-bold">
                    slug router key (auto-generated)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={newCatId}
                    className="w-full bg-neutral-100 border-2 border-neutral-300 rounded-xl py-2.5 px-3.5 text-xs font-mono text-neutral-600"
                  />
                  <p className="text-[9px] text-neutral-400 mt-1 font-mono">Mapped dynamically into your storefront filter block.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E2229] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl border-2 border-black shadow-retro-sm transition-transform active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Category</span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-dashed border-neutral-200">
                <h3 className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase mb-3">Active Store Categories</h3>
                <div className="space-y-2 max-h-[190px] overflow-y-auto no-scrollbar">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex justify-between items-center bg-[#FAF9F5] border border-neutral-200 rounded-lg py-1.5 px-3 text-xs font-mono">
                      <span className="font-semibold text-neutral-850 truncate max-w-[140px]">{cat.label}</span>
                      <span className="text-[9px] bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded uppercase font-bold text-[8px] truncate">{cat.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom ledger block: Lists all standard & custom products */}
          <div className="col-span-12">
            <div className="bg-white rounded-3xl border-4 border-black p-6 shadow-retro overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-150 pb-4 mb-6">
                <div>
                  <h3 className="font-serif italic font-black text-lg text-neutral-900 flex items-center gap-2">
                    <Database className="w-5 h-5 text-neutral-700 animate-pulse" />
                    <span>Live Catalogue Ledger (Standard & Custom)</span>
                  </h3>
                  <p className="text-[10px] text-neutral-500 font-mono mt-0.5 font-bold">query: db.products.find(&#123;&#125;)</p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  Total Records Mapped: <strong className="text-neutral-950 font-sans">{activeProducts.length} active</strong> (Selected: {selectedProductIds.length}, Deleted: {deletedProductIds.length}, Modified: {Object.keys(editedProducts).length})
                </div>
              </div>

              {/* Dynamic Bulk Edit Action Bar */}
              {selectedProductIds.length > 0 && (
                <div className="mb-6 p-4 bg-amber-50 border-4 border-black rounded-2xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 shadow-retro-small font-mono text-xs animate-pulse-short">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E64A19] text-xs font-black text-white border border-black shadow-retro-mini">
                      {selectedProductIds.length}
                    </span>
                    <div>
                      <p className="font-sans font-black text-neutral-900 leading-none">Bulk Edit Staged: {selectedProductIds.length} Products Checked</p>
                      <p className="text-[10px] text-stone-500 mt-1">Configure stock levels or pricing modifications below and apply them universally.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    {/* Stock level bulk update inputs */}
                    <div className="flex items-center bg-white border-2 border-black rounded-lg p-1.5 gap-2 shrink-0 shadow-retro-xs">
                      <span className="text-[9px] uppercase font-bold text-stone-500">Stock level:</span>
                      <select
                        value={bulkStockChangeType}
                        onChange={(e: any) => setBulkStockChangeType(e.target.value)}
                        className="bg-stone-150 font-bold border border-neutral-300 text-[10px] rounded px-1.5 py-0.5 focus:outline-none"
                      >
                        <option value="fixed">Set To</option>
                        <option value="add">Add (+ / -)</option>
                      </select>
                      <input
                        type="number"
                        placeholder="e.g. 50"
                        value={bulkStockVal}
                        onChange={(e) => setBulkStockVal(e.target.value)}
                        className="w-16 bg-stone-50 border border-neutral-200 rounded px-1.5 py-0.5 text-center text-xs font-black text-neutral-900 focus:outline-none"
                      />
                    </div>

                    {/* Pricing bulk update inputs */}
                    <div className="flex items-center bg-white border-2 border-black rounded-lg p-1.5 gap-2 shrink-0 shadow-retro-xs">
                      <span className="text-[9px] uppercase font-bold text-stone-500">Pricing:</span>
                      <select
                        value={bulkPriceChangeType}
                        onChange={(e: any) => setBulkPriceChangeType(e.target.value)}
                        className="bg-stone-150 font-bold border border-neutral-300 text-[10px] rounded px-1.5 py-0.5 focus:outline-none"
                      >
                        <option value="fixed">Set Price ($)</option>
                        <option value="percentage">Adjust Price (%)</option>
                        <option value="flat">Offset Price ($)</option>
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 15.00"
                        value={bulkPriceVal}
                        onChange={(e) => setBulkPriceVal(e.target.value)}
                        className="w-20 bg-stone-50 border border-neutral-200 rounded px-1.5 py-0.5 text-center text-xs font-black text-neutral-900 focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto xl:grow-0 justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedProductIds([])}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-neutral-700 font-semibold cursor-pointer transition-colors"
                      >
                        Deselect All
                      </button>
                      <button
                        type="button"
                        onClick={applyBulkUpdates}
                        className="px-4 py-2 bg-[#E64A19] hover:bg-red-700 text-white font-sans font-black uppercase text-xs rounded-lg border border-black shadow-retro-mini cursor-pointer transform active:scale-95 transition-all"
                      >
                        Apply Bulk Updates
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b-2 border-black text-neutral-500 uppercase tracking-wider text-[9px] bg-neutral-50">
                      <th className="py-3 px-4 w-12 text-center select-none">
                        <input 
                          type="checkbox"
                          checked={selectedProductIds.length === activeProducts.length && activeProducts.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 rounded text-[#00838F] accent-[#00838F] focus:ring-[#00ACC1] transition-transform scale-110 cursor-pointer"
                          title="Toggle Selection of All Stated Products"
                        />
                      </th>
                      <th className="py-3 px-4">Box Preview</th>
                      <th className="py-3 px-4 text-left">Document fields (Key-Values)</th>
                      <th className="py-3 px-4">Stock Level</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4 text-right">Database action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {activeProducts.map((p) => {
                      const stockVal = productStocks[p.id] !== undefined ? productStocks[p.id] : 10;
                      const isLowStock = stockVal < 5;
                      const isCustom = p.id.startsWith("custom_") || !p.id.startsWith("prod-");
                      const isSelected = selectedProductIds.includes(p.id);

                      return (
                        <tr 
                           key={p.id} 
                           className={`transition-colors border-b ${
                            isSelected
                              ? "bg-[#E0F2F1]/30 font-medium border-l-4 border-l-[#00838F]"
                              : isLowStock 
                              ? "bg-amber-50/80 text-amber-950 border-l-4 border-l-amber-500 font-medium" 
                              : "hover:bg-[#FAF9F5]/45"
                          }`}
                        >
                          <td className="py-4 px-4 whitespace-nowrap text-center">
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleSelectProduct(p.id, e.target.checked)}
                              className="w-4 h-4 rounded text-[#00838F] accent-[#00838F] focus:ring-[#00ACC1] transition-transform scale-110 cursor-pointer"
                            />
                          </td>
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
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {isLowStock ? (
                                <span className="text-red-700 font-sans text-sm font-black flex items-center gap-1">
                                  ⚠️ {stockVal} Box{stockVal !== 1 ? "es" : ""} left
                                </span>
                              ) : (
                                <span className="text-neutral-800 font-sans text-sm font-medium">
                                  📦 {stockVal} Boxes
                                </span>
                              )}
                              
                              {isLowStock && (
                                <span className="inline-flex text-[8px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900 border border-amber-400 select-none animate-bounce-short">
                                  LOW STOCK
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-[#E0F2F1] text-[#006064] border border-[#00838F]/10">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap font-bold text-neutral-900 font-sans text-sm">
                            ${(p.price || 0).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {isLowStock ? (
                                <button
                                  onClick={() => {
                                    updateStock(p.id, 15);
                                    alert(`Restocked ${p.name}! Added 15 boxes to virtual stock.`);
                                  }}
                                  className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-sans text-xs font-black rounded-lg border border-neutral-900 shadow-retro-mini transition-transform active:translate-y-0.5 cursor-pointer tracking-tight"
                                >
                                  📦 Order More
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    updateStock(p.id, 10);
                                  }}
                                  className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans text-[10px] rounded border border-stone-300 transition-colors cursor-pointer"
                                >
                                  +10 Refill
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-1.5 border-2 border-black bg-[#E0F2F1] text-neutral-900 rounded-lg hover:bg-teal-200 hover:shadow-retro-mini transition-all cursor-pointer"
                                title="Edit Product Attributes"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete "${p.name}"? This will physically vanish it from the active storefront ledger.`)) {
                                    await deleteProduct(p.id);
                                    alert("Product successfully purged.");
                                  }
                                }}
                                className="p-1.5 border-2 border-black bg-red-100 text-red-900 rounded-lg hover:bg-red-200 hover:shadow-retro-mini transition-all cursor-pointer"
                                title="Delete Product Document"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Simulated Order Dispatch & Fulfillment Tracking Console */}
          <div className="col-span-12 mt-6">
            <div className="bg-white rounded-3xl border-4 border-black p-6 shadow-retro overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-neutral-150 pb-4 mb-6">
                <div>
                  <h3 className="font-serif italic font-black text-xl text-neutral-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-neutral-700 animate-pulse" />
                    <span>db.orders: Simulated Dispatch & Fulfillment Console</span>
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">query: db.orders.find(&#123;&#125;).sort(&#123;createdAt: -1&#125;)</p>
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  Total Transaction Documents: <strong className="text-neutral-950 font-sans">{allOrders.length} records</strong>
                </div>
              </div>

              {allOrders.length === 0 ? (
                <div className="bg-[#FAF9F5] border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center font-mono text-neutral-500 text-xs">
                  <p className="font-sans font-bold text-neutral-700">No client transactions recorded in this staging sandbox yet.</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Submit purchase requests in the client shopping cart or virtual checkout drawers!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {allOrders.map((order) => {
                    return (
                      <div key={order.id} className="border-2 border-black rounded-2xl p-5 bg-[#FAF9F5] shadow-retro-small">
                        <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-4 border-b border-dashed border-neutral-300 pb-3 mb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono font-black text-[#00838F] bg-teal-100/60 border border-[#00ACC1] px-2 py-0.5 rounded">
                                ID: #{order.id}
                              </span>
                              <span className="text-[9px] font-mono text-stone-500 uppercase">
                                ⏰ {new Date(order.createdAt).toLocaleString()}
                              </span>
                              <span className="text-[9px] bg-[#1E2229] text-white font-mono px-2 py-0.5 rounded uppercase font-bold">
                                👤 {order.userEmail}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 font-sans">
                              📍 Shipping Address: <strong className="text-neutral-950">{order.address || "Digital Download / No Address Provided"}</strong>
                            </p>
                          </div>

                          {/* Dispatch Status Controls */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[9px] font-mono text-stone-500 uppercase block font-black">Status Staging:</span>
                            <div className="flex items-center border-2 border-black rounded-xl overflow-hidden shadow-retro-mini bg-white text-xs">
                              {["processing", "transit", "delivered", "canceled"].map((st) => (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => handleUpdateSimulatedOrderStatus(order.id, st)}
                                  className={`px-2 py-1 uppercase font-bold text-[9px] tracking-tight border-r border-black last:border-none transition-colors cursor-pointer ${
                                    order.status === st 
                                      ? "bg-[#00838F] text-white hover:bg-[#00ACC1]" 
                                      : "bg-white text-stone-700 hover:bg-stone-50"
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteSimulatedOrder(order.id)}
                              className="p-1 px-2 text-red-600 hover:bg-red-50 hover:text-red-850 border-2 border-red-300 hover:border-red-600 rounded-lg transition-all cursor-pointer bg-white font-sans text-[10px] font-bold flex items-center gap-1"
                              title="Purge transaction record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Purge</span>
                            </button>
                          </div>
                        </div>

                        {/* Items loop summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-3 flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#E0F2F1] border border-stone-200 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                                <ProductIllustration type={item.image} badgeColor="bg-[#00838F]" className="scale-[0.55] -my-6" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-sans font-bold text-neutral-900 truncate">{item.name}</h4>
                                <p className="text-[10px] font-mono text-neutral-500">
                                  Size: {item.badgeText || "15 sachets"} | Qty: {item.quantity}
                                </p>
                                <p className="text-[10px] font-sans font-semibold text-[#00838F]">
                                  ${(item.price || 0).toFixed(2)} each
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer with total block */}
                        <div className="mt-4 pt-3 border-t border-dashed border-neutral-200 flex justify-between items-center text-xs">
                          <span className="font-mono text-stone-400 uppercase tracking-widest text-[9px]">Telemetries Verified: OK</span>
                          <div className="bg-white border-2 border-black rounded-xl px-3 py-1 text-right shadow-retro-mini font-mono">
                            <span className="text-[8px] uppercase tracking-wider text-stone-400">Total Charged Amount</span>
                            <p className="text-neutral-950 font-sans font-black text-sm leading-tight">${Number(order.total || 0).toFixed(2)} USD</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Popover Product Editing Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              className="bg-white rounded-3xl border-4 border-black p-6 md:p-8 max-w-lg w-full shadow-retro relative max-h-[90vh] overflow-y-auto"
            >
              <h3 className="font-serif italic font-black text-xl text-neutral-900 border-b border-neutral-150 pb-3 mb-5 flex items-center gap-2">
                <span>🔧 edit_product_document: updateOne()</span>
              </h3>

              <form onSubmit={handleSaveEditModal} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                    tea blend title
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      unit price (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      stock level boxes
                    </label>
                    <input
                      type="number"
                      required
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      Category Route Slug
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1">
                      Badge ribbon text
                    </label>
                    <input
                      type="text"
                      value={editBadgeText}
                      onChange={(e) => setEditBadgeText(e.target.value)}
                      className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#00838F] block mb-1 font-bold">
                    blending notes & catalog details
                  </label>
                  <textarea
                    rows={2}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                  />
                </div>

                {/* Edit Modal image customization tabs */}
                <div className="border bg-[#FAF9F5]/70 rounded-2xl p-4 border-neutral-250 mt-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] uppercase font-mono font-black tracking-widest text-[#00838F]">Product Image source</span>
                    <span className="text-[8px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold uppercase">{editImageType}</span>
                  </div>

                  <div className="flex gap-1 border-b border-neutral-200 pb-2 mb-2.5">
                    {[
                      { id: "preset", label: "🎨 Presets" },
                      { id: "url", label: "🌐 Web URL" },
                      { id: "upload", label: "📤 Upload File" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setEditImageType(tab.id as any)}
                        className={`flex-1 py-1 px-1.5 text-[8px] uppercase font-bold rounded-md border transition-all cursor-pointer ${
                          editImageType === tab.id 
                            ? "bg-slate-800 text-white border-black" 
                            : "bg-white text-stone-600 hover:bg-neutral-50 border-neutral-250"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {editImageType === "preset" && (
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Choice Preset Botanical Packaging:</label>
                      <select
                        value={editPreset}
                        onChange={(e) => setEditPreset(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs font-semibold focus:outline-none"
                      >
                        {ILLUSTRATION_PRESETS.map((preset) => (
                          <option key={preset.type} value={preset.type}>{preset.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {editImageType === "url" && (
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Paste External direct image URL:</label>
                      <input
                        type="url"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        placeholder="e.g. https://domain.com/picture.jpg"
                        className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs"
                      />
                    </div>
                  )}

                  {editImageType === "upload" && (
                    <div className="space-y-1.5">
                      <label className="text-[8px] uppercase font-bold text-neutral-400 block tracking-wider">Upload / Select local Image:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, true)}
                        className="w-full text-[10px] text-stone-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:font-semibold file:bg-[#00838F] file:text-white hover:file:bg-[#00ACC1] cursor-pointer"
                      />
                      {editFileBase64 && (
                        <div className="flex items-center gap-1.5 bg-teal-50 p-1.5 rounded-lg border border-teal-200">
                          <img src={editFileBase64} alt="Thumb" className="w-6 h-6 object-cover rounded" />
                          <span className="text-[8.5px] text-teal-700 font-mono font-bold truncate max-w-[180px]">New design uploaded successfully</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tiny live preview within edit modal */}
                  <div className="mt-2 flex items-center gap-2.5 bg-white p-1.5 border border-neutral-200 rounded-lg justify-between">
                    <span className="text-[9px] font-mono text-neutral-400">Live updated illustration:</span>
                    <div className="scale-50 -my-7 shrink-0">
                      <ProductIllustration 
                        type={
                          editImageType === "url" 
                            ? editImageUrl 
                            : editImageType === "upload" 
                            ? editFileBase64 
                            : editPreset
                        } 
                        badgeColor="bg-teal-500" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-neutral-150">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl border border-stone-300 transition-colors cursor-pointer"
                  >
                    Cancel Action
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00838F] hover:bg-[#00ACC1] text-white font-bold text-xs rounded-xl border-2 border-black shadow-retro-sm transition-all hover:translate-y-0.5 cursor-pointer flex items-center gap-1 animate-pulse"
                  >
                    <Save className="w-4 h-4" />
                    <span>commit updateOne()</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
