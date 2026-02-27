import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),

      total: () => get().subtotal(),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'wcw-cart' }
  )
);
