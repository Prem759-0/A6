import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";
import { User, Lock, Mail, ShoppingBag, ArrowLeft, LogOut, CheckCircle2, Clock, Calendar, MapPin, Sparkles } from "lucide-react";

export const AccountPage: React.FC = () => {
  const { user, setUser, orders, fetchOrders, setActivePage, clearCart } = useShop();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Authentication Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const bodyObj = isLogin ? { email, password } : { email, password, name };

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj)
      });
      const data = await resp.json();

      if (!resp.ok) {
        setError(data.error || "Authentication failed. Model error on MongoDB query.");
      } else {
        setUser(data.user);
        setSuccessMsg(isLogin ? "Logged in successfully!" : "Account created and synced to MongoDB successfully!");
        if (!isLogin) {
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError("Failed to communicate with MongoDB backend server.");
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
              <h3 className="font-serif font-black text-xl text-neutral-950 flex items-center gap-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-[#00838F]" />
                Your MongoDB Order History
              </h3>

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
                      className="border-2 border-black rounded-2xl p-5 md:p-6 bg-neutral-50 hover:bg-white transition-all shadow-retro-small"
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
                                  Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900">
                              ${(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-dashed border-neutral-200 text-sm">
                        <div className="flex items-start gap-1.5 text-[#1E2229]">
                          <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
                          <div className="text-xs text-neutral-500 max-w-sm">
                            <span className="font-bold text-neutral-600">Shipped To: </span>
                            {order.address}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-neutral-500 block">Total Checked Out</span>
                          <span className="text-lg font-black text-neutral-900 font-serif">
                            ${order.total.toFixed(2)}
                          </span>
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
