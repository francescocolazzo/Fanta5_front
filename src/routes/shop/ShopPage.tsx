import { Product } from "@/model/product";
import { pb } from "@/pocketbase";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { ServerError, Spinner } from "@/shared";
import { useCart, useCartPanel } from "@/services/cart";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pending, setPending]   = useState<boolean>(false);
  const [error, setError]       = useState<boolean>(false);

  const openCartPanel = useCartPanel((state) => state.openOverlay);
  const addToCart     = useCart((state) => state.addToCart);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setPending(true);
    return pb
      .collection("products")
      .getList<Product>()
      .then((res) => {
        setProducts(res.items);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setPending(false));
  }

  // function addTocart(product: Partial<Product>) {
  //   console.log(product);
  //   openCartPanel();
  //   addTocart(product);
  // }

  return (
    <div>
      <h1 className="title">SHOP</h1>
      {pending && <Spinner></Spinner>}

      {error && (
        <div className="flex justify-center">
          <ServerError />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {products.map((p) => {
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
