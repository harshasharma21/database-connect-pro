import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  // Level 1: Main categories
  { 
    id: "15", 
    slug: "food-cupboard", 
    name: "Food Cupboard",
    productCount: 145,
    image: "category-food-cupboard"
  },
  { 
    id: "16", 
    slug: "beverages", 
    name: "Beverages",
    productCount: 67,
    image: "category-beverages"
  },
  { 
    id: "17", 
    slug: "frozen-foods", 
    name: "Frozen Foods",
    productCount: 89,
    image: "category-frozen-foods"
  },
  { 
    id: "19", 
    slug: "snacks", 
    name: "Snacks",
    productCount: 54,
    image: "category-snacks"
  },

  // Level 2: Subcategories of Food Cupboard
  { 
    id: "114", 
    slug: "sauces-pastes-pasta", 
    name: "Sauces, Pastes & Pasta",
    parentId: "15",
    productCount: 42 
  },
  { 
    id: "115", 
    slug: "canned-goods", 
    name: "Canned Goods",
    parentId: "15",
    productCount: 38 
  },
  { 
    id: "116", 
    slug: "rice-grains", 
    name: "Rice & Grains",
    parentId: "15",
    productCount: 35 
  },

  // Level 3: Sub-subcategories of Sauces, Pastes & Pasta
  { 
    id: "pasta-passata", 
    slug: "pasta-passata-pesto", 
    name: "Pasta, Passata & Pesto",
    parentId: "114",
    productCount: 18 
  },
  { 
    id: "asian-sauces", 
    slug: "asian-sauces", 
    name: "Asian Sauces",
    parentId: "114",
    productCount: 15 
  },
  { 
    id: "cooking-pastes", 
    slug: "cooking-pastes", 
    name: "Cooking Pastes",
    parentId: "114",
    productCount: 9 
  },

  // Level 2: Subcategories of Frozen Foods
  { 
    id: "frozen-meat", 
    slug: "frozen-meat", 
    name: "Frozen Meat",
    parentId: "17",
    productCount: 32 
  },
  { 
    id: "frozen-vegetables", 
    slug: "frozen-vegetables", 
    name: "Frozen Vegetables",
    parentId: "17",
    productCount: 28 
  },

  // Level 3: Sub-subcategories of Frozen Meat
  { 
    id: "frozen-chicken", 
    slug: "frozen-chicken", 
    name: "Frozen Chicken",
    parentId: "frozen-meat",
    productCount: 15 
  },
  { 
    id: "frozen-beef", 
    slug: "frozen-beef", 
    name: "Frozen Beef",
    parentId: "frozen-meat",
    productCount: 17 
  },

  // Level 2: Subcategories of Beverages
  { 
    id: "soft-drinks", 
    slug: "soft-drinks", 
    name: "Soft Drinks",
    parentId: "16",
    productCount: 35 
  },
  { 
    id: "juices", 
    slug: "juices", 
    name: "Juices",
    parentId: "16",
    productCount: 32 
  },

  // Level 3: Sub-subcategories of Soft Drinks
  { 
    id: "cola-drinks", 
    slug: "cola-drinks", 
    name: "Cola Drinks",
    parentId: "soft-drinks",
    productCount: 18 
  },
  { 
    id: "lemonade", 
    slug: "lemonade", 
    name: "Lemonade",
    parentId: "soft-drinks",
    productCount: 17 
  },

  // Level 2: Subcategories of Snacks
  { 
    id: "chips-crisps", 
    slug: "chips-crisps", 
    name: "Chips & Crisps",
    parentId: "19",
    productCount: 28 
  },
  { 
    id: "nuts-seeds", 
    slug: "nuts-seeds", 
    name: "Nuts & Seeds",
    parentId: "19",
    productCount: 26 
  },

  // Level 3: Sub-subcategories of Chips & Crisps
  { 
    id: "potato-chips", 
    slug: "potato-chips", 
    name: "Potato Chips",
    parentId: "chips-crisps",
    productCount: 15 
  },
  { 
    id: "tortilla-chips", 
    slug: "tortilla-chips", 
    name: "Tortilla Chips",
    parentId: "chips-crisps",
    productCount: 13 
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    sku: "PAS-001",
    name: "Organic Tomato Passata",
    description: "Premium Italian organic tomato passata made from sun-ripened tomatoes. Perfect for pasta sauces, pizza bases, and Mediterranean dishes.",
    shortDescription: "Premium Italian organic passata",
    price: 2.45,
    images: ["product-passata"],
    category: "food-cupboard",
    subcategory: "pasta-passata-pesto",
    brand: "Italian Harvest",
    packSize: "500g",
    unit: "jar",
    stock: 250,
    inStock: true,
  },
  {
    id: "2",
    sku: "PAS-002",
    name: "Basil Pesto Sauce",
    description: "Traditional Genovese pesto made with fresh basil, pine nuts, parmesan, and extra virgin olive oil.",
    shortDescription: "Traditional Genovese pesto",
    price: 4.95,
    images: ["product-pesto"],
    category: "food-cupboard",
    subcategory: "pasta-passata-pesto",
    brand: "Italian Harvest",
    packSize: "190g",
    unit: "jar",
    stock: 180,
    inStock: true,
  },
  {
    id: "3",
    sku: "PAS-003",
    name: "Penne Rigate Pasta",
    description: "Classic Italian durum wheat penne pasta with ridged texture perfect for holding sauces.",
    shortDescription: "Classic durum wheat penne",
    price: 1.85,
    images: ["product-pasta"],
    category: "food-cupboard",
    subcategory: "pasta-passata-pesto",
    brand: "Pasta Prima",
    packSize: "500g",
    unit: "pack",
    stock: 420,
    inStock: true,
  },
  {
    id: "4",
    sku: "PAS-004",
    name: "Sun-Dried Tomato Paste",
    description: "Concentrated sun-dried tomato paste with intense Mediterranean flavor. Ideal for enriching pasta dishes and stews.",
    shortDescription: "Concentrated tomato paste",
    price: 3.25,
    images: ["/placeholder.svg"],
    category: "food-cupboard",
    subcategory: "cooking-pastes",
    brand: "Mediterranean Foods",
    packSize: "200g",
    unit: "tube",
    stock: 95,
    inStock: true,
  },
  {
    id: "5",
    sku: "PAS-005",
    name: "Arrabbiata Sauce",
    description: "Spicy tomato sauce with chili peppers, garlic, and herbs. Ready to heat and serve.",
    shortDescription: "Spicy tomato sauce",
    price: 3.75,
    images: ["/placeholder.svg"],
    category: "food-cupboard",
    subcategory: "asian-sauces",
    brand: "Italian Harvest",
    packSize: "350g",
    unit: "jar",
    stock: 160,
    inStock: true,
  },
  {
    id: "6",
    sku: "PAS-006",
    name: "Fusilli Pasta",
    description: "Spiral-shaped pasta that captures sauce in every twist. Made from 100% Italian durum wheat.",
    shortDescription: "Spiral durum wheat pasta",
    price: 1.95,
    images: ["/placeholder.svg"],
    category: "food-cupboard",
    subcategory: "pasta-passata-pesto",
    brand: "Pasta Prima",
    packSize: "500g",
    unit: "pack",
    stock: 310,
    inStock: true,
  },
  {
    id: "7",
    sku: "BEV-001",
    name: "Premium Orange Juice",
    description: "Freshly squeezed orange juice with no added sugar or preservatives.",
    shortDescription: "Fresh orange juice",
    price: 3.45,
    images: ["product-orange-juice"],
    category: "beverages",
    subcategory: "juices",
    brand: "Fresh Grove",
    packSize: "1L",
    unit: "carton",
    stock: 145,
    inStock: true,
  },
  {
    id: "8",
    sku: "BEV-002",
    name: "Sparkling Mineral Water",
    description: "Natural mineral water from Alpine springs with a refreshing sparkle.",
    shortDescription: "Alpine mineral water",
    price: 1.25,
    images: ["product-water"],
    category: "beverages",
    subcategory: "soft-drinks",
    brand: "Alpine Springs",
    packSize: "500ml",
    unit: "bottle",
    stock: 580,
    inStock: true,
  },
  {
    id: "9",
    sku: "COL-001",
    name: "Classic Cola",
    description: "Refreshing cola soft drink with the perfect balance of sweetness.",
    shortDescription: "Classic cola drink",
    price: 1.45,
    images: ["product-cola"],
    category: "beverages",
    subcategory: "cola-drinks",
    brand: "FizzPop",
    packSize: "500ml",
    unit: "bottle",
    stock: 420,
    inStock: true,
  },
  {
    id: "10",
    sku: "SNK-001",
    name: "Sea Salt Potato Chips",
    description: "Crispy potato chips with a hint of sea salt. Perfect snack for any occasion.",
    shortDescription: "Sea salt chips",
    price: 2.25,
    images: ["product-chips"],
    category: "snacks",
    subcategory: "potato-chips",
    brand: "Crispy Bites",
    packSize: "150g",
    unit: "bag",
    stock: 280,
    inStock: true,
  },
];
