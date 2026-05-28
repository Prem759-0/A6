import React from "react";
import { Review } from "../types";
import { useShop } from "../context/ShopContext";
import { PRODUCTS } from "../data";
import { Star, ShoppingCart } from "lucide-react";

interface TestimonialCardProps {
  review: Review;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  const { addToCart } = useShop();

  const handleShopClick = () => {
    // Find matching product or add a custom one
    const product = PRODUCTS.find((p) => p.name.includes(review.teaName)) || {
      id: review.id,
      name: review.teaCategoryBadge,
      price: 11.95,
      image: review.teaImage,
      badgeText: "LIMITED TEA",
    };
    addToCart(product);
  };

  return (
    <div 
      className={`min-w-[280px] md:min-w-[320px] max-w-[340px] flex-1 border-2 border-black rounded-2xl p-5 flex flex-col justify-between shadow-retro transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${review.teaCategoryColor}`}
      id={`testimonial-card-${review.id}`}
    >
      <div>
        {/* Five stars header */}
        <div className="flex gap-0.5 text-neutral-950 mb-3.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current text-yellow-400 stroke-black stroke-2" />
          ))}
        </div>

        {/* Quote text in Playfair Display italics */}
        <blockquote className="font-serif italic font-bold text-base md:text-lg text-neutral-900 leading-snug">
          "{review.quote}"
        </blockquote>
      </div>

      <div className="mt-8 pt-4 border-t border-black/15">
        <cite className="not-italic text-xs font-bold text-neutral-800 font-mono">
          — {review.author}
        </cite>

        {/* Small capsule for shopping preview at bottom of the review */}
        <div className="mt-4 flex items-center justify-between bg-white rounded-xl p-2.5 border-2 border-black shadow-retro-sm">
          <div className="flex items-center gap-2 min-w-0">
            {/* Tiny color badge */}
            <div className="w-5 h-5 rounded-full bg-[#FAF9F5] border border-neutral-300 flex items-center justify-center text-[10px]">
              🍃
            </div>
            <div className="min-w-0 leading-tight">
              <p className="text-[7px] font-black uppercase tracking-widest text-[#00838F] truncate">
                {review.teaCategoryBadge}
              </p>
              <p className="text-[10px] font-extrabold text-neutral-800 truncate">
                {review.teaName}
              </p>
            </div>
          </div>
          <button
            onClick={handleShopClick}
            className="shrink-0 bg-[#E64A19] text-white text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border-2 border-black hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Shop</span>
            <ShoppingCart className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
