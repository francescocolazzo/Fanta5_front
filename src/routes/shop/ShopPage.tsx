import { useEffect } from "react";
import { useCart, useCartPanel } from "@/services/cart";
import { useProductsServices } from "@/services/products";
import { ServerError, Spinner } from "@/shared";
import { ProductCard } from "./components/ProductCard";

export function ShopPage() {
  const { state, actions } = useProductsServices();

  const openCartPanel = useCartPanel((state) => state.openOverlay);
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    actions.getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="title">SHOP</h1>
      {state.pending && <Spinner />}

      {state.error && (
        <div className="flex justify-center">
          <ServerError />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {state.products.map((p) => {
          return (
            <ProductCard
              key={p.id}
              product={p}
              // onAddToCart={addTocart} 
              onAddToCart={() => {
                addToCart(p)
                openCartPanel()
              }}
            />)
        })}
      </div>
    </div>
  );
}
