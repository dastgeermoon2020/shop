import { IProduct } from "@/types/product";
import { PRODUCTS } from "@/utils/product";
import { createSlice } from "@reduxjs/toolkit";

interface ICartItem {
  product: IProduct;
  quantity: number;
}
interface ICartState {
  items: ICartItem[];
  products: IProduct[];
}

const initialState: ICartState = {
  items: [],
  products: PRODUCTS,
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItemIdex = state.items.findIndex(
        (item) => item.product.id === product.id,
      );
      if (existingItemIdex >= 0) {
        state.items[existingItemIdex].quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },

    removeFromCart: (state, action) => {
      const { productId, quantity = 1 } = action.payload;
      const existingItemIdex = state.items.findIndex(
        (item) => item.product.id === productId,
      );

      if (existingItemIdex === -1) return;

      const existingItem = state.items[existingItemIdex];
      if (existingItem.quantity > quantity) {
        existingItem.quantity -= quantity;
      } else {
        state.items.splice(existingItemIdex, 1);
      }
    },
    filterProducts: (state, action) => {
      const searchTrem = action.payload;
      state.products = PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTrem) ||
          product.category.toLowerCase().includes(searchTrem),
      );
    },
  },
});

export const { addToCart, removeFromCart, filterProducts } = cartSlice.actions;

export default cartSlice.reducer;
