import { Product, Review, JournalArticle } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Organic Tropical Green Tea",
    category: "tea-sachets",
    badgeText: "TEA SACHETS",
    badgeColor: "bg-[#8BC34A]",
    badgeTextColor: "text-white",
    rating: 4.71,
    reviewCount: 560,
    price: 11.95,
    isFromPrice: true,
    description: "Our Organic Tropical Green is a fruity and fun take on a classic green tea with organic pineapple and mango flavors.",
    image: "tropical-green",
    bgGradient: "from-[#F1F8E9] to-[#DCEDC8]"
  },
  {
    id: "prod-2",
    name: "Herbal Tea Trio",
    category: "gifts-samplers",
    badgeText: "GIFTS & SAMPLERS",
    badgeColor: "bg-[#FFB74D]",
    badgeTextColor: "text-neutral-900",
    rating: 5.0,
    reviewCount: 21,
    price: 33.90,
    isFromPrice: false,
    description: "A trio of soothing, caffeine-free herbal teas: Organic Alpine Berry, Organic Peppermint, and Organic Chamomile.",
    image: "herbal-trio",
    bgGradient: "from-[#FFE0B2] to-[#FFCC80]"
  },
  {
    id: "prod-3",
    name: "Organic Peppermint - 50 Naked Tea Sachets",
    category: "naked-sachets",
    badgeText: "NAKED SACHETS",
    badgeColor: "bg-[#4DB6AC]",
    badgeTextColor: "text-white",
    rating: 5.0,
    reviewCount: 13,
    price: 21.95,
    isFromPrice: false,
    description: "Our organic Peppermint tea is made from robust, high-essential-oil peppermint grown in Washington State, packed naked in a bulk box.",
    image: "peppermint-naked",
    bgGradient: "from-[#E0F2F1] to-[#B2DFDB]"
  },
  {
    id: "prod-4",
    name: "Classic Bamboo Tea Chest",
    category: "gifts-samplers",
    badgeText: "GIFTS & SAMPLERS",
    badgeColor: "bg-[#FFB74D]",
    badgeTextColor: "text-neutral-900",
    rating: 4.85,
    reviewCount: 41,
    price: 42.95,
    isFromPrice: false,
    description: "This 8-slot premium finish bamboo chest offers a curated sampling of eight biodegradable sachets each of our top eight best selling teas.",
    image: "bamboo-chest",
    bgGradient: "from-[#F5F5DC] to-[#EFEBE9]"
  },
  {
    id: "prod-5",
    name: "Nice Matcha Tea Latte Mix",
    category: "latte-mix",
    badgeText: "LATTE MIX",
    badgeColor: "bg-[#C5E1A5]",
    badgeTextColor: "text-neutral-900",
    rating: 4.41,
    reviewCount: 20,
    price: 12.95,
    isFromPrice: true,
    description: "Our Nice Matcha is a lightly sweetened powdered mix of genuine stone-ground Uji Japanese green tea, meant for making barista matcha tea lattes simple.",
    image: "matcha-latte",
    bgGradient: "from-[#E8F5E9] to-[#C8E6C9]"
  },
  {
    id: "prod-6",
    name: "Nice Chai Tea Latte Mix",
    category: "latte-mix",
    badgeText: "LATTE MIX",
    badgeColor: "bg-[#FFCC80]",
    badgeTextColor: "text-neutral-900",
    rating: 4.24,
    reviewCount: 17,
    price: 12.95,
    isFromPrice: true,
    description: "Our Nice Chai is a not too sweet, not too spicy, real black tea and custom spiced powdered latte mix meant for making traditional tea lattes simple.",
    image: "nice-chai",
    bgGradient: "from-[#FFF3E0] to-[#FFE0B2]"
  },
  {
    id: "prod-7",
    name: "Organic Mountain High Chai Tea",
    category: "tea-sachets",
    badgeText: "TEA SACHETS",
    badgeColor: "bg-[#FFAB91]",
    badgeTextColor: "text-neutral-900",
    rating: 4.70,
    reviewCount: 108,
    price: 11.95,
    isFromPrice: true,
    description: "An ode to our Rocky Mountain roots, our signature organic Mountain High Chai takes your tastebuds down a warm, rich, cardamom-and-clove spiced ski slope.",
    image: "mountain-chai",
    bgGradient: "from-[#FBE9E7] to-[#FFCCBC]"
  },
  {
    id: "prod-8",
    name: "Organic Peppermint - 15 Sachet Box",
    category: "tea-sachets",
    badgeText: "TEA SACHETS",
    badgeColor: "bg-[#8BC34A]",
    badgeTextColor: "text-white",
    rating: 4.90,
    reviewCount: 312,
    price: 11.95,
    isFromPrice: false,
    description: "Crisp, pungent, and highly aromatic organic peppermint tea in our classic plant-based compostable pyramidal whole leaf sachets.",
    image: "peppermint-sachets",
    bgGradient: "from-[#E0F2F1] to-[#E8F5E9]"
  },
  {
    id: "prod-9",
    name: "Organic Turmeric Antioxidant - 50 Naked Sachets",
    category: "naked-sachets",
    badgeText: "NAKED SACHETS",
    badgeColor: "bg-[#4DB6AC]",
    badgeTextColor: "text-white",
    rating: 4.88,
    reviewCount: 75,
    price: 21.95,
    isFromPrice: false,
    description: "An earthy, vibrant blend of golden turmeric root, ginger, black pepper, and refreshing citrus peel for the ultimate wellness boost.",
    image: "turmeric-naked",
    bgGradient: "from-[#FFFDE7] to-[#FFF9C4]"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    quote: "The right amount of spice.",
    author: "Angelina R.",
    teaName: "Mountain High Chai",
    teaCategoryBadge: "ORGANIC MOUNTAIN HIGH CHAI",
    teaCategoryColor: "bg-[#FF5722]",
    teaCategoryTextColor: "text-white",
    teaImage: "mountain-chai",
    shopUrl: "#"
  },
  {
    id: "rev-2",
    quote: "This drink is incredibly refreshing, especially when served over ice. It's light, crisp, and instantly cooling, making it perfect for a quick refresh any time of day.",
    author: "Jacob K.",
    teaName: "Organic Matcha",
    teaCategoryBadge: "ORGANIC MATCHA MINT",
    teaCategoryColor: "bg-[#4CAF50]",
    teaCategoryTextColor: "text-white",
    teaImage: "organic-matcha-mint",
    shopUrl: "#"
  },
  {
    id: "rev-3",
    quote: "One sip and you can feel the difference—clean energy, rich flavor, and all the good stuff your body loves. Literally liquid GOLD.",
    author: "Harrison G.",
    teaName: "Golden Latte Mix",
    teaCategoryBadge: "TWO ROOTS GOLDEN LATTE MIX",
    teaCategoryColor: "bg-[#FFC107]",
    teaCategoryTextColor: "text-neutral-900",
    teaImage: "golden-latte",
    shopUrl: "#"
  },
  {
    id: "rev-4",
    quote: "So tasty and energizing.",
    author: "Gracie H.",
    teaName: "Organic Tropical Green",
    teaCategoryBadge: "ORGANIC TROPICAL GREEN TEA",
    teaCategoryColor: "bg-[#8BC34A]",
    teaCategoryTextColor: "text-white",
    teaImage: "tropical-green",
    shopUrl: "#"
  },
  {
    id: "rev-5",
    quote: "The perfect start to my day.",
    author: "Jorge F.",
    teaName: "Jasmine Petal",
    teaCategoryBadge: "JASMINE PETAL GREEN",
    teaCategoryColor: "bg-[#E1BEE7]",
    teaCategoryTextColor: "text-[#4A148C]",
    teaImage: "jasmine-petal",
    shopUrl: "#"
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "journal-1",
    title: "London Fog Earl Grey Latte Recipe",
    category: "RECIPE",
    badgeColor: "bg-blue-100",
    badgeTextColor: "text-blue-800",
    image: "london-fog",
    readTime: "4 min read",
    date: "May 12, 2026"
  },
  {
    id: "journal-2",
    title: "Nice Matcha Drinks to Delight the Senses!",
    category: "CAFFEINE",
    badgeColor: "bg-amber-100",
    badgeTextColor: "text-amber-800",
    image: "matcha-delights",
    readTime: "5 min read",
    date: "Apr 28, 2026"
  },
  {
    id: "journal-3",
    title: "Nice Iced Matcha Latte",
    category: "MATCHA",
    badgeColor: "bg-green-100",
    badgeTextColor: "text-green-800",
    image: "iced-matcha-latte",
    readTime: "3 min read",
    date: "Mar 15, 2026"
  },
  {
    id: "journal-4",
    title: "Matcha Energy Balls: The Perfect Mid-Day Snack",
    category: "MATCHA",
    badgeColor: "bg-green-100",
    badgeTextColor: "text-green-800",
    image: "energy-balls",
    readTime: "6 min read",
    date: "Feb 10, 2026"
  },
  {
    id: "journal-5",
    title: "5 Reasons to Choose Organic Teas Over Natural Flavorings",
    category: "TEA 101",
    badgeColor: "bg-purple-100",
    badgeTextColor: "text-purple-800",
    image: "organic-teas",
    readTime: "7 min read",
    date: "Jan 18, 2026"
  },
  {
    id: "journal-6",
    title: "How to Make a Festive 'Grinch Latte' at Home",
    category: "MATCHA",
    badgeColor: "bg-green-100",
    badgeTextColor: "text-green-800",
    image: "grinch-latte",
    readTime: "4 min read",
    date: "Dec 18, 2025"
  },
  {
    id: "journal-7",
    title: "Pecan Pie Chai: A Warm Autumn Treat",
    category: "CHAI",
    badgeColor: "bg-orange-100",
    badgeTextColor: "text-orange-850",
    image: "pecan-chai",
    readTime: "5 min read",
    date: "Nov 02, 2025"
  }
];

export const VIBES: string[] = [
  "A Sweet Treat",
  "Evening Unwind",
  "Focused & Clear",
  "Caffeine-Free",
  "Ceremony-Worthy",
  "Whole Leaf",
  "Over Ice",
  "Lattes",
  "Black Tea",
  "Green Tea",
  "Herbal Tea",
  "Organic",
  "Barista Favorite",
  "Calm & Cozy",
  "Fruit Forward"
];
