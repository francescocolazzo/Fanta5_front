import { CartItem } from "@/model/cart-item";
import { Product } from "@/model/product";
import { create } from "zustand";

type Behavior = "increase" | "decrease";

export interface CartState {
  list: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
  manageQuantity: (behavior: Behavior, found: CartItem) => void;
}

export const useCart = create<CartState>((set, get) => ({
  list: [],

  // NEW
  addToCart: (product: Product) => {
    const found = get().list.find((item) => item.product.id == product.id);

    if (found) {
      get().increaseQty(product.id);
    } else {
      // add product to cart
      const item: CartItem = { product, qty: 1 };
      set((state) => ({ list: [...state.list, item] }));

      // soluzione con get()
      //set({ list: [...get().list, item]});
    }
  },
  removeFromCart: (productId: string) => {
    set((state) => ({
      list: state.list.filter((item) => item.product.id !== productId),
    }));
  },
  increaseQty: (productId: string) => {
    const found = get().list.find((item) => item.product.id == productId);
    // increase quantity
    if (found) {
      get().manageQuantity("increase", found);
    }

    // soluzione con get()
    // set({
    //   list: get().list.map((item) => {
    //     return item.product.id === found?.product.id ? found : item;
    //   }),
    // });
  },
  decreaseQty: (productId: string) => {
    const found = get().list.find((item) => item.product.id == productId);

    if (found?.qty === 1) {
      get().removeFromCart(productId);
    }

    // decrease quantity
    if (found && found.qty > 0) {
      get().manageQuantity("decrease", found);
    }
  },
  clearCart: () => {
    set({ list: [] });
  },
  manageQuantity: (behavior: Behavior, found: CartItem) => {
    behavior === "increase" ? found.qty++ : found.qty--;

    console.log(found);
    set((state) => ({
      list: state.list.map((item) => {
        return item.product.id === found?.product.id ? found : item;
      }),
    }));
  },
}));
