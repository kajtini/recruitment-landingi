export interface Product {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
}

export interface ProductDetailed extends Product {
  rating: number;
  description: string;
  category: string;
  brand: string;
  images: Array<string>;
  stock: number;
  thumbnail: string;
}

export interface Cart {
  id: number | string;
  products: Array<Product>;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}
