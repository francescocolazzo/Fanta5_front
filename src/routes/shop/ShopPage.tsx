import { Product } from "@/model/product";
import { pb } from "@/pocketbase";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    return await pb
      .collection("products")
      .getList<Product>()
      .then((res) => setProducts(res.items));
  }

  function addTocart(product:Partial<Product>){
      console.log(product);
  }

  return (
    <div>
      <h1 className="title">SHOP</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        {products.map((p) => {
          return (
            <ProductCard 
            key={p.id} 
            product={p} 
            onAddToCart={addTocart} />
          );
        })}
      </div>
    </div>
  );
}
