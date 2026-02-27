export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  sku?: string;
  isActive: boolean;
  isFeatured: boolean;
  cbdContent?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  affiliateCode?: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  _id: string;
  user?: string;
  guestEmail?: string;
  items: {
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'stripe' | 'payfirmly' | 'etransfer' | 'sinpe';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  affiliateCode?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
