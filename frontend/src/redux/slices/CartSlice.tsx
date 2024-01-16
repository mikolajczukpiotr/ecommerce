import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AvailableSizes {
  id: number;
  ExtraSmall: number;
  Small: number;
  Medium: number;
  Large: number;
  ExtraLarge: number;
}
export interface AvailableColors {
  id: number;
  red: boolean;
  green: boolean;
  black: boolean;
  blue: boolean;
  yellow: boolean;
}

export interface CartItem {
  color: string;
  qty: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  availableSizes: AvailableSizes;
  availableColors: AvailableColors;
}

export interface CartState {
  loading: boolean;
  cartItems: CartItem[];
  itemsPrice?: string;
}

export const initialState: CartState = {
  loading: true,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem[]>) => {
      const items = action.payload;
      items.forEach((item) => {
        const existItem = state.cartItems.find(
          (x: CartItem) => x.slug === item.slug
        );
        if (existItem) {
          console.log(existItem, "dupaaa");
          existItem.qty += 1;
        } else {
          state.cartItems = [
            ...state.cartItems,
            { ...item, qty: 1, color: "red" },
          ];
        }
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (x: CartItem) => x.id !== action.payload
      );
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;

export default cartSlice.reducer;
