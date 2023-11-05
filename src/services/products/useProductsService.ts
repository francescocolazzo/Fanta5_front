import { Product } from "@/model/product";
import { useReducer } from "react";
import * as ProductsApi from "./products.api";
import { initialState, productsReducer } from "./products.reducer";

export function useProductsServices() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  async function getProducts() {
    dispatch({ type: "pending", payload: true });
    try {
      const res = await ProductsApi.get();
      dispatch({ type: 'productsGetSuccess', payload: res.items})
    } catch (e) {
      dispatch({ type: 'error', payload: 'Products not loaded' })
    }
  }

  async function deleteProduct(id: string) {
    dispatch({ type: 'pending', payload: true })
    try {
      await ProductsApi.remove(id);
      dispatch({ type: 'productDeleteSuccess', payload: id  })
    } catch(e) {
      dispatch({ type: 'error', payload: 'Products not deleted'  })
    }
  }

  async function addProduct(product: Partial<Product>) {
    dispatch({ type: 'pending', payload: true })
    try {
      const res = await ProductsApi.add(product);
      dispatch({ type: 'productAddSuccess', payload: res  })
    } catch(e) {
      dispatch({ type: 'error', payload: 'Products not added'  })
    }
  }

  async function editProduct(product: Partial<Product>) {
    dispatch({ type: 'pending', payload: true })
    try {
      const res = await ProductsApi.edit(product);
      dispatch({ type: 'productEditSuccess', payload: res  })
    } catch(e) {
      dispatch({ type: 'error', payload: 'Products not edited'  })
    }
  }


  function setActiveItem(product: Product | object) {
    dispatch({ type: 'productSetActive', payload: product  })
  }

  function resetActiveItem() {
    dispatch({ type: 'productSetActive', payload: null })
  }

  return {
    actions: {
      getProducts,
      deleteProduct,
      addProduct,
      editProduct,
      setActiveItem,
      resetActiveItem
    },
    state,
  };
}
