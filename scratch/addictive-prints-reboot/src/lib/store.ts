import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState } from './types';
import { PRODUCTS } from './mockData';

// ============================================
// CART STORE
// ============================================

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find(
          i => i.productId === item.productId &&
               i.selectedColor === item.selectedColor &&
               i.selectedMaterial === item.selectedMaterial
        );

        if (existingItem) {
          // Increase quantity if item already in cart
          set({
            items: items.map(i =>
              i === existingItem
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          // Add new item
          set({ items: [...items, item] });
        }
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, qty: number) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: qty }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const product = PRODUCTS.find(p => p.id === item.productId);
          if (!product) return total;
          const material = product.materials.find(m => m.id === item.selectedMaterial);
          const priceWithMaterial = product.price + (material?.priceAddon || 0);
          return total + priceWithMaterial * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'addictive-prints-cart',
      storage: {
        getItem: (name: string) => {
          if (typeof window === 'undefined') return null;
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: any) => {
          if (typeof window === 'undefined') return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);

// ============================================
// UI STATE STORE
// ============================================

export interface UIState {
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  toggleCart: () => void;
  toggleCheckout: () => void;
  closeCart: () => void;
  closeCheckout: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isCheckoutOpen: false,

  toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
  toggleCheckout: () => set(state => ({ isCheckoutOpen: !state.isCheckoutOpen })),
  closeCart: () => set({ isCartOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
  closeAll: () => set({ isCartOpen: false, isCheckoutOpen: false }),
}));

// ============================================
// FILTER STATE STORE
// ============================================

export interface FilterState {
  activeTab: 'ponçage' | 'aspiration' | 'essentiels';
  selectedMaterials: string[];
  selectedColors: string[];
  selectedCompatibility: string[];
  priceRange: [number, number];

  setActiveTab: (tab: 'ponçage' | 'aspiration' | 'essentiels') => void;
  toggleMaterial: (materialId: string) => void;
  toggleColor: (colorHex: string) => void;
  toggleCompatibility: (compat: string) => void;
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeTab: 'ponçage',
  selectedMaterials: [],
  selectedColors: [],
  selectedCompatibility: [],
  priceRange: [0, 150],

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleMaterial: (materialId) =>
    set(state => ({
      selectedMaterials: state.selectedMaterials.includes(materialId)
        ? state.selectedMaterials.filter(m => m !== materialId)
        : [...state.selectedMaterials, materialId],
    })),

  toggleColor: (colorHex) =>
    set(state => ({
      selectedColors: state.selectedColors.includes(colorHex)
        ? state.selectedColors.filter(c => c !== colorHex)
        : [...state.selectedColors, colorHex],
    })),

  toggleCompatibility: (compat) =>
    set(state => ({
      selectedCompatibility: state.selectedCompatibility.includes(compat)
        ? state.selectedCompatibility.filter(c => c !== compat)
        : [...state.selectedCompatibility, compat],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  resetFilters: () =>
    set({
      selectedMaterials: [],
      selectedColors: [],
      selectedCompatibility: [],
      priceRange: [0, 150],
    }),
}));
