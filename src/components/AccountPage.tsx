import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";
import { User, Lock, Mail, ShoppingBag, ArrowLeft, LogOut, CheckCircle2, Clock, Calendar, MapPin, Sparkles, Truck } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const getStepDateStr = (baseDateStr: string, minutesToAdd: number) => {
  try {
    const d = new Date(baseDateStr);
    if (isNaN(d.getTime())) return null;
    d.setMinutes(d.getMinutes() + minutesToAdd);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric"
    }) + " • " + d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  } catch (e) {
    return null;
  }
};

export const AccountPage: React.FC = () => {
  const { user, setUser, orders, fetchOrders, setActivePage, clearCart, apiLogin, apiRegister, isStaticFrontendOnly } = useShop();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<any | null>(null);

  // Generate last 6 months of user spending data
  const getSpendingChartData = () => {
    const months = [];
    const now = new Date();
    
    // Build list of last 6 months in correct chronological order
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const name = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      months.push({
        name,
        total: 0,
        ordersCount: 0,
        monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      });
    }

    // Accumulate total spend from dynamic orders matching each month
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      if (isNaN(orderDate.getTime())) return;
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth() + 1;
      const orderMonthKey = `${orderYear}-${String(orderMonth).padStart(2, '0')}`;

      const matchedMonth = months.find(m => m.monthKey === orderMonthKey);
      if (matchedMonth) {
        matchedMonth.total += Number(order.total || 0);
        matchedMonth.ordersCount += 1;
      }
    });

    return months;
  };

  // Authentication Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        const data = await apiLogin(email, password);
        setSuccessMsg(isStaticFrontendOnly 
          ? "Logged back in successfully via local virtual simulation!" 
          : "Logged in successfully!");
      } else {
        const data = await apiRegister(name, email, password);
        setSuccessMsg(isStaticFrontendOnly 
          ? "Account registered and saved locally in your browser sandbox!" 
          : "Account created and synced to MongoDB successfully!");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err?.message || "Communication issue checking backend server credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    clearCart();
    setSuccessMsg("Logged out successfully.");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#00838F] selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation back and header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setActivePage("store")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-600 hover:text-[#00838F] transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Storefront</span>
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActivePage("mongodb")}
              className="px-3 py-1.5 bg-[#E0F2F1] hover:bg-[#B2DFDB] text-[#004D40] text-xs font-bold rounded-lg transition-all border border-[#00838F]/20 cursor-pointer"
            >
              🍃 View MongoDB Telemetry
            </button>
            <button
              onClick={() => setActivePage("admin")}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-lg transition-all border border-amber-200 cursor-pointer"
            >
              ➕ Admin Panel (Add Products)
            </button>
          </div>
        </div>

        {user ? (
          /* LOGGED IN ACCOUNT FLOW */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border-4 border-black shadow-retro p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-dashed border-neutral-200 pb-8 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00838F] to-[#00ACC1] text-white flex items-center justify-center border-2 border-black">
                  <span className="text-xl font-black uppercase">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="font-serif italic text-2xl md:text-3xl font-black text-neutral-900 flex items-center gap-2">
                    Hello, {user.name}! <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                  </h2>
                  <p className="text-xs text-neutral-500 font-mono mt-1">MongoDB Document Email: {user.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-widest rounded-xl border-2 border-red-200 hover:border-red-400 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Account Dashboard Content Options */}
            <div>
              {/* Dynamic 6-Month Spending History Chart via Recharts */}
              <div className="mb-10 bg-[#FAF9F5] border-2 border-black rounded-3xl p-6 shadow-retro-small">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-dashed border-neutral-300 pb-4 mb-5">
                  <div>
                    <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-[#00838F] flex items-center gap-1.5 leading-none">
                      <span>📊 database_insights: aggregateSpend()</span>
                      <span className="text-[8px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded font-bold">LIVE TELEMETRY</span>
                    </h3>
                    <h4 className="font-serif italic font-black text-lg text-neutral-900 mt-1.5 leading-tight">
                      Your 6-Month Rolling Spending Ledger
                    </h4>
                  </div>
                  
                  <div className="bg-white border-2 border-black rounded-2xl py-2 px-4 shadow-retro-mini flex flex-col">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-400 uppercase leading-none">Total Aggregate Spend</span>
                    <strong className="text-neutral-950 font-sans font-black text-lg mt-0.5 leading-none">
                      ${getSpendingChartData().reduce((acc, m) => acc + m.total, 0).toFixed(2)}
                    </strong>
                  </div>
                </div>

                {getSpendingChartData().reduce((acc, m) => acc + m.total, 0) === 0 ? (
                  <div className="bg-white border-2 border-dashed border-neutral-200 rounded-2xl py-8 px-4 text-center font-mono text-neutral-500 text-xs">
                    <p className="font-sans font-bold text-neutral-700">No transaction telemetry detected on this profile yet.</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Submit high-fidelity simulated checkout orders to draw dynamic spending curves instantly!</p>
                  </div>
                ) : (
                  <div className="h-52 w-full select-none" style={{ minWidth: "150px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getSpendingChartData()} margin={{ top: 10, right: 10, left: -22, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E4DE" />
                        <XAxis 
                          dataKey="name" 
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#6E6D64", fontSize: 9, fontFamily: "monospace" }}
                        />
                        <YAxis 
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(val) => `$${val}`}
                          tick={{ fill: "#6E6D64", fontSize: 9, fontFamily: "monospace" }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "#1E2229", 
                            borderColor: "#000",
                            borderWidth: "1px",
                            borderRadius: "12px", 
                            color: "#fff", 
                            fontFamily: "monospace", 
                            fontSize: "11px",
                            boxShadow: "4px 4px 0px rgba(0,0,0,1)"
                          }}
                          formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "Monthly Spend"]}
                          labelFormatter={(label) => `Billing Epoch: ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="total" 
                          stroke="#00838F" 
                          strokeWidth={3} 
                          dot={{ r: 4, strokeWidth: 2, stroke: "#00ACC1", fill: "#fff" }}
                          activeDot={{ r: 6, stroke: "#00838F", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 border-b border-neutral-200 pb-4">
                <h3 className="font-serif font-black text-xl text-neutral-950 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#00838F]" />
                  Your MongoDB Order History
                </h3>
                {orders.length > 0 && (
                  <span className="text-[11px] font-mono text-neutral-500">
                    Showing <strong className="text-[#00838F]">{orders.length}</strong> dynamic order documents mapped
                  </span>
                )}
              </div>

              {/* INTEGRACTIVE LIVE LOGISTICS JOURNEY TRACKER */}
              {selectedTrackOrder && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-gradient-to-br from-[#E0F2F1] via-white to-stone-50 border-4 border-[#00838F] rounded-3xl shadow-retro-small relative overflow-hidden text-neutral-800"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#00838F]/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#004D40] bg-[#B2DFDB] px-3 py-1.5 rounded-md border border-[#00838F]/20">
                        🚚 staging active route tracking
                      </span>
                      <h4 className="text-xl font-black font-serif italic text-neutral-900 mt-2">
                        Logistics Timeline for Order #{selectedTrackOrder.id}
                      </h4>
                      <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                        Interactive journey log synced with simulated MongoDB collection
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedTrackOrder(null)}
                      className="text-[10px] bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 rounded-xl font-bold uppercase cursor-pointer border border-black shadow-retro-mini transition-transform active:translate-y-0.5"
                    >
                      Close Map
                    </button>
                  </div>

                  {/* Horizontal Timeline flow */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 py-4 relative">
                    {/* Background connector line */}
                    <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#00838F] via-[#A2C97A] to-neutral-200 z-0 rounded-full" />
                    
                    {[
                      { 
                        title: "Order Placed", 
                        desc: "Document generated in users.orders collection", 
                        offset: 0, 
                        isTerminalStatus: true 
                      },
                      { 
                        title: "Leaves Farmed & Plucked", 
                        desc: "Artisanal high-altitude whole tea leaf harvesting", 
                        offset: 45, 
                        isTerminalStatus: true 
                      },
                      { 
                        title: "Freshness Sealing Completed", 
                        desc: "Biodegradable sachet packaging and quality test passed", 
                        offset: 120, 
                        isTerminalStatus: true 
                      },
                      { 
                        title: "In Transit to Transit Center", 
                        desc: "Dispatched to regional sorting center", 
                        offset: 360, 
                        isTerminalStatus: selectedTrackOrder.status === "delivered" || selectedTrackOrder.status === "transit" 
                      },
                      { 
                        title: "Arrived & Brewed", 
                        desc: "Delivered cleanly to recipient's mailbox", 
                        offset: 720, 
                        isTerminalStatus: selectedTrackOrder.status === "delivered" 
                      }
                    ].map((step, idx) => {
                      const isCompleted = step.isTerminalStatus;
                      const isCurrentActive = !step.isTerminalStatus && idx === (selectedTrackOrder.status === "delivered" ? 4 : 3);
                      
                      const orderTime = selectedTrackOrder.createdAt;
                      const stepTimeFormatted = getStepDateStr(orderTime, step.offset);

                      return (
                        <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3.5 relative z-10">
                          {/* Animated state bubble */}
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-300 font-bold ${
                            isCompleted 
                              ? "bg-[#00838F] border-black text-white text-sm shadow-md" 
                              : isCurrentActive 
                              ? "bg-amber-150 border-[#00838F] text-[#00838F] text-xs animate-pulse ring-4 ring-[#00ACC1]/20" 
                              : "bg-[#FAF9F5] border-neutral-300 text-neutral-400 text-xs"
                          }`}>
                            {isCompleted ? "✓" : idx + 1}
                          </div>
                          <div>
                            <p className="text-xs font-black text-neutral-900 tracking-tight leading-tight md:mt-1">{step.title}</p>
                            
                            {/* VISUALLY ENHANCED TIMESTAMP */}
                            <p className="text-[9px] font-mono font-extrabold text-[#00838F] bg-[#E0F2F1]/60 px-1.5 py-0.5 rounded inline-block mt-1">
                              {isCompleted ? (stepTimeFormatted || "Completed") : idx < 3 ? "Process complete" : "Pending execution..."}
                            </p>

                            <p className="text-[10px] text-neutral-500 leading-normal mt-1 max-w-[150px] md:mx-auto">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t border-dashed border-neutral-200 text-[11px] font-mono text-neutral-500 flex flex-col md:flex-row justify-between gap-4">
                    <span>⚡ Est. Arrival: <strong className="text-neutral-950 font-sans font-black">1-2 Business Days</strong></span>
                    <span>📍 Destination Address: <strong className="text-neutral-950 font-sans font-black">{selectedTrackOrder.address}</strong></span>
                  </div>
                </motion.div>
              )}

              {orders.length === 0 ? (
                <div className="bg-[#FAF9F5] border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center">
                  <p className="text-sm font-medium text-neutral-500">You haven't placed any orders yet on this account.</p>
                  <p className="text-xs text-neutral-400 mt-1">Items checked out from your shopping cart will instantly record here via MongoDB query.</p>
                  <button
                    onClick={() => setActivePage("store")}
                    className="mt-4 inline-block bg-[#00838F] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-[#00ACC1] transition-colors shadow-sm cursor-pointer"
                  >
                    Go Shop Some Teas
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className={`border-2 rounded-2xl p-5 md:p-6 transition-all shadow-retro-small duration-350 ${
                        selectedTrackOrder?.id === order.id 
                          ? "border-[#00838F] bg-teal-50/10 shadow-lg" 
                          : "border-black bg-neutral-50 hover:bg-white"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 mb-4 border-neutral-200">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xs font-black uppercase bg-[#004D40] text-[#E0F2F1] px-2.5 py-1 rounded-md">
                            #{order.id}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neutral-500">Status:</span>
                          <span className={`inline-flex items-center gap-1 text-xs font-black uppercase px-2 py-0.5 rounded-full ${
                            order.status === "delivered" 
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {order.status === "delivered" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Delivered
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 animate-spin-slow" /> Processing
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Order items nested */}
                      <div className="space-y-4">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#E0F2F1] rounded-lg border border-black/10 flex items-center justify-center text-xs font-bold text-[#004D40]">
                                🍃
                              </div>
                              <div>
                                <p className="font-bold text-neutral-800">{item.name}</p>
                                <p className="text-[11px] text-neutral-500">
                                  Quantity: {item.quantity} × ${(item.price ?? 0).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900">
                              ${((item.quantity ?? 1) * (item.price ?? 0)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-dashed border-neutral-200 text-sm">
                        <div className="flex items-start gap-1.5 text-[#1E2229] flex-1">
                          <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
                          <div className="text-xs text-neutral-500 max-w-sm">
                            <span className="font-bold text-neutral-600">Shipped To: </span>
                            {order.address}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
                          <button
                            onClick={() => {
                              setSelectedTrackOrder(order);
                              window.scrollTo({ top: 180, behavior: "smooth" });
                            }}
                            className={`px-3 py-1.5 rounded-lg border-2 border-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-0.5 ${
                              selectedTrackOrder?.id === order.id
                                ? "bg-[#00838F] text-white"
                                : "bg-white text-neutral-800 hover:bg-[#FAF9F5] shadow-retro-mini"
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>{selectedTrackOrder?.id === order.id ? "Tracking Active" : "Track Journey"}</span>
                          </button>
                          
                          <div className="text-right">
                            <span className="text-[10px] text-neutral-500 block uppercase font-mono">Invoice Total</span>
                            <span className="text-base font-black text-[#1E2229] font-serif block">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* ANONYMOUS PASS: SYNCED TO LOGIN/REGISTER */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border-4 border-black shadow-retro overflow-hidden max-w-md mx-auto"
          >
            {/* Header style */}
            <div className="bg-gradient-to-r from-[#00838F] to-[#00ACC1] text-white p-6 border-b-4 border-black text-center relative select-none">
              <div className="absolute top-3 left-4 text-emerald-300 text-[9px] font-mono tracking-widest uppercase">
                ⚙️ mongodb atlas
              </div>
              <h2 className="font-serif italic text-2xl font-black text-[#FFFDE7] mt-3">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[11px] text-teal-50 mt-1 uppercase tracking-wider">
                {isLogin ? "Sign in to view order histories" : "Register to database and place order"}
              </p>
            </div>

            <div className="p-6 md:p-8">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-600 rounded-xl p-3.5 text-xs text-center mb-5 font-semibold">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="bg-green-50 border-2 border-green-200 text-green-700 rounded-xl p-3.5 text-xs text-center mb-5 font-semibold">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="text-[10px] uppercase font-black tracking-widest text-[#1E2229] block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#1E2229] block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="demo@twoleaves.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#1E2229] block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#FAF9F5] border-2 border-black rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#1E2229] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl border-2 border-black shadow-retro hover:translate-y-0.5 active:translate-y-1 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? "querying mongodb..." : isLogin ? "Sign In" : "Register Now"}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-xs font-semibold text-[#00838F] hover:underline cursor-pointer"
                >
                  {isLogin ? "New to Two Leaves? Create an account" : "Already have an account? Sign In"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
