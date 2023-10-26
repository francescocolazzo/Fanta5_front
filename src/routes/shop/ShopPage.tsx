import { Product } from "@/model/product";
import { pb } from "@/pocketbase";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { Spinner } from "@material-tailwind/react";

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pending, setPending]= useState<boolean>(false)

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setPending(true)
    return await pb
      .collection("products")
      .getList<Product>()
      .then((res) => {
        setProducts(res.items)
        setPending(false)
      });

  }
 

  function addTocart(product:Partial<Product>){
      console.log(product); 
  }

  return (
    <div>
      <h1 className="title">SHOP</h1>
      {/* {pending &&  <Spinner />} */}
       <Spinner />
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
