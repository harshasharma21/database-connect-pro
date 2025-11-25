export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  packSize?: string;
  unit?: string;
  stock: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId?: string;
  image?: string;
  productCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
