export interface Product {
  id: string;
  name: string;
  category: string; // "tea-sachets" | "gifts-samplers" | "naked-sachets" | "latte-mix" | ...
  badgeText: string; // e.g. "TEA SACHETS", "GIFTS & SAMPLERS", "NAKED SACHETS", "LATTE MIX"
  badgeColor: string; // Tailwind bg class
  badgeTextColor: string; // Tailwind text class
  rating: number;
  reviewCount: number;
  price: number;
  isFromPrice: boolean; // True to show "From $11.95" instead of "$11.95"
  description: string;
  image: string; // URL
  bgGradient: string; // Tailwind bg-gradient or custom color for product container
  stock?: number;
  ingredients?: string[];
  brewingNotes?: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  teaName: string;
  teaCategoryBadge: string;
  teaCategoryColor: string;
  teaCategoryTextColor: string;
  teaImage: string;
  shopUrl: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string; // e.g. "RECIPE", "CAFFEINE", "MATCHA", "TEA 101"
  badgeColor: string; // bg-class
  badgeTextColor: string; // text-class
  image: string; // SVG or URL
  readTime: string;
  date: string;
}
