import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { ProductIllustration } from "./ProductIllustration";
import { X, Plus, Minus, Trash2, ShoppingBag, Gift, Check, ArrowRight } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, clearCart } = useShop();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(1); // 1 = cart, 2 = shipping details, 3 = success
  
  // Checkout Form states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingThreshold = 75;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 5.95;
  
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "BUD15" || code === "TEA15") {
      setDiscountPercent(15);
      setPromoSuccess("15% OFF Promo applied successfully!");
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try using BUD15 for 15% OFF!");
      setPromoSuccess("");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !address) {
      return;
    }
    setCheckoutStep(3);
    setTimeout(() => {
      clearCart();
    }, 4000);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-container">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => {
          setCartOpen(false);
          setCheckoutStep(1);
        }}
      />

      {/* Main Drawer Shell */}
      <div className="relative w-full max-w-md h-full bg-[#FAF9F5] shadow-2xl flex flex-col z-10 overflow-hidden border-l border-neutral-200">
        
        {/* Header line */}
        <div className="p-4 border-b border-neutral-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-800">
            <ShoppingBag className="w-5 h-5 text-[#00838F]" />
            <span className="font-serif italic font-bold text-lg">Your Tea Cart</span>
          </div>
          <button 
            onClick={() => {
              setCartOpen(false);
              setCheckoutStep(1);
            }}
            className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer"
            id="close-cart-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {checkoutStep === 1 && (
          <>
            {/* Free Shipping Meter */}
            <div className="bg-[#E0F2F1] p-4 border-b border-[#B2DFDB]/50">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-[#00838F]" />
                <p className="text-xs font-semibold text-neutral-700">
                  {isFreeShipping 
                    ? "✨ Congrats! You've unlocked FREE Standard Shipping!" 
                    : `You are only $${(shippingThreshold - subtotal).toFixed(2)} away from Free Shipping!`}
                </p>
              </div>
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#00838F] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Free standard shipping on orders $75+</p>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="font-serif italic font-bold text-lg text-neutral-800">Your cart is empty</h3>
                  <p className="text-sm text-neutral-500 mt-1 max-w-xs">
                    Start adding our organic plant-based compostable wholesale tea sachets to fits your moment!
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 px-5 py-2.5 bg-[#00838F] text-white font-semibold rounded-full text-xs uppercase tracking-widest hover:bg-[#006064] transition-all transform active:scale-95 shadow-sm"
                  >
                    Browse Best Sellers
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-3 border border-neutral-100 shadow-xs flex gap-4 items-center">
                    {/* Compact Product Illustration overlay */}
                    <div className="shrink-0 scale-75 origin-center -my-2">
                      <ProductIllustration type={item.image} badgeColor="bg-teal-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[8px] font-bold text-[#00838F] bg-[#E0F2F1] px-1.5 py-0.5 rounded uppercase font-mono">
                        {item.badgeText}
                      </span>
                      <h4 className="font-serif font-bold text-xs text-neutral-900 truncate mt-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#E64A19] mt-0.5">${item.price.toFixed(2)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg bg-[#FAF9F5]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-neutral-600 hover:bg-neutral-200 rounded-l-lg cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold font-mono text-neutral-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-neutral-600 hover:bg-neutral-200 rounded-r-lg cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code & Summary Block */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-neutral-200 p-4 space-y-3 shadow-md">
                {/* Promo application form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ENTER PROMO (BUD15)"
                    className="flex-1 bg-[#FAF9F5] border border-neutral-300 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold placeholder:text-neutral-400 uppercase focus:outline-none focus:border-[#00838F]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1E2229] text-white text-xs font-semibold px-4 rounded-lg hover:bg-neutral-800 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoError && <p className="text-[10px] font-bold text-rose-600">{promoError}</p>}
                {promoSuccess && <p className="text-[10px] font-bold text-emerald-600">{promoSuccess}</p>}

                <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="font-mono font-bold text-neutral-900">
                      {isFreeShipping ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-900 font-bold border-t border-neutral-100 pt-2">
                    <span>Estimated Total</span>
                    <span className="font-mono text-[#E64A19] text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep(2)}
                  className="w-full bg-[#00838F] hover:bg-[#006064] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest transition-colors shadow-sm cursor-pointer mt-1"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {checkoutStep === 2 && (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex items-center gap-2 text-[#00838F] border-b pb-2 border-neutral-100">
                <Check className="w-5 h-5 animate-pulse" />
                <h3 className="font-serif italic font-bold text-lg text-neutral-800">Shipping Details</h3>
              </div>
              <p className="text-xs text-neutral-500">Provide shipping address to finalize simulated order.</p>

              <div className="space-y-3">
                <div className="grid gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-white border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-[#00838F]"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="bg-white border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-[#00838F]"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Mailing Address</label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Tea Leaves Pl, Ste B, Colorado, CO 80202"
                    className="bg-white border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-800 focus:outline-[#00838F]"
                  />
                </div>
              </div>

              {/* Order review subset */}
              <div className="p-3 bg-neutral-100/50 rounded-xl border border-neutral-250 mt-4">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Order Review</p>
                <div className="text-xs text-neutral-600 flex justify-between">
                  <span>Subtotal ({cart.reduce((ac, x) => ac + x.quantity, 0)} Items)</span>
                  <span className="font-mono text-neutral-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="text-xs text-neutral-600 flex justify-between mt-1">
                  <span>Estimated Total</span>
                  <span className="font-mono text-neutral-900 font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-t p-4 flex gap-3 shadow-md">
              <button
                type="button"
                onClick={() => setCheckoutStep(1)}
                className="flex-1 border border-neutral-300 py-3 text-xs font-semibold rounded-xl uppercase tracking-widest text-neutral-600 hover:bg-neutral-50 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#E64A19] hover:bg-[#D84315] text-white py-3 text-xs font-bold rounded-xl uppercase tracking-widest shadow-md transition-colors cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 3 && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 animate-bounce">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="font-serif italic font-bold text-2xl text-neutral-800">Thank You, {fullName}!</h3>
            <p className="text-sm font-semibold text-emerald-600 mt-1">Order #TTL-{Math.floor(Math.random() * 89999 + 10000)} Placed!</p>
            
            <p className="text-xs text-neutral-500 mt-4 max-w-sm">
              We have sent a confirmation email to <strong>{email}</strong>. Live order processing is simulated for this demo — your credit card has not been charged, but the packages are on their imaginary way to Colorado!
            </p>

            <button
              onClick={() => {
                setCartOpen(false);
                setCheckoutStep(1);
              }}
              className="mt-8 px-6 py-3 bg-[#00838F] hover:bg-[#006064] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-transform transform active:scale-95 cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
