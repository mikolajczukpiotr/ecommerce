import { Product } from "@/types/payloadTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type CartItem = {
  product: Product;
  quantity: number;
  id: string;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  changeQuantity: (productId: string, quantity: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.product.attributes.size === product.attributes.size &&
              item.product.attributes.color === product.attributes.color
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, id: uuid() }],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      clearCart: () => set({ items: [] }),
      changeQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
    }),
    { name: "cart", storage: createJSONStorage(() => localStorage) }
  )
);
