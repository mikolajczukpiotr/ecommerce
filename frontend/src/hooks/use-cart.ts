import { Product } from "@/types/payloadTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type CartItem = {
  product: Product;
  quantity: number;
  price: number;
  id: string;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalCost: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  changeQuantity: (productId: string, quantity: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalCost: 0,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.product.attributes.size === product.attributes.size &&
              item.product.attributes.color === product.attributes.color
          );
          if (existingItem) {
            const newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              items: newItems,
              totalItems: newItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              ),
              totalCost: newItems.reduce(
                (acc, item) =>
                  acc + item.quantity * item.product.attributes.price,
                0
              ),
            };
          }
          const newItems = [
            ...state.items,
            {
              product,
              quantity: 1,
              price: product.attributes.price,
              id: uuid(),
            },
          ];
          return {
            items: newItems,
            totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
            totalCost: newItems.reduce(
              (acc, item) =>
                acc + item.quantity * item.product.attributes.price,
              0
            ),
          };
        });
      },
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          return {
            items: newItems,
            totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
            totalCost: newItems.reduce(
              (acc, item) =>
                acc + item.quantity * item.product.attributes.price,
              0
            ),
          };
        });
      },
      clearCart: () => set({ items: [], totalItems: 0, totalCost: 0 }),
      changeQuantity: (productId, quantity) => {
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
            totalCost: newItems.reduce(
              (acc, item) =>
                acc + item.quantity * item.product.attributes.price,
              0
            ),
          };
        });
      },
    }),
    { name: "cart", storage: createJSONStorage(() => localStorage) }
  )
);
