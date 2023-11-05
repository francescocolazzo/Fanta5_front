import { Product } from "@/model/product";
import { ProductsActions } from "@/services/products/products.actions";

export interface ProductState {
  products: Product[];
  activateItem: Partial<Product> | null;
  pending: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  activateItem: null,
  pending: false,
  error: null,
};

export function productsReducer(state: ProductState, action: ProductsActions) {
  const { type, payload } = action;
  switch (type) {
    case "productsGetSuccess":
      return { ...state, products: payload, pending: false, error: null };
    case "productDeleteSuccess":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== payload),
        pending: false,
        error: null,
        activeItem:
          state.activateItem?.id === payload ? null : state.activateItem,
      };
    case "productAddSuccess":
      return {
        ...state,
        products: [...state.products, payload],
        activeItem: null,
        error: null,
        pending: false,
      };
    case "productEditSuccess":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === payload.id ? payload : item
        ),
        error: null,
        pending: false,
      };
    case "productSetActive":
      return { ...state, activateItem: payload };
    case "pending":
      return { ...state, pending: payload, error: null };
    case "error":
      return { ...state, error: payload, pending: false };
  }
  return state;
}
