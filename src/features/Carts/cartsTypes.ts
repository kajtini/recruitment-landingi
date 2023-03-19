export interface Product {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
  rating?: number;
  description?: string;
  category?: string;
  brand?: string;
  images?: Array<string>;
  stock?: number;
  thumbnail?: string;
}

export interface Cart {
  id: number;
  products: Array<Product>;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}
