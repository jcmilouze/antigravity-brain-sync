// Product-related types
export interface Color {
  name: string;
  hex: string;
  label: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  priceAddon?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ponçage' | 'aspiration' | 'essentiels';
  image: string;
  model3d?: string;
  colors: Color[];
  materials: Material[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags?: string[];
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  image?: string;
  date: string;
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedMaterial: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

// Checkout types
export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  paymentMethod: 'card' | 'paypal' | 'applepay';
}

// Testimonial type (UGC)
export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle?: string;
  quote: string;
  rating: number;
  image?: string;
}
