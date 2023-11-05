import { useProductsServices } from "@/services/products";

export function CMSProductsPage() {
  const {state, actions} = useProductsServices();

  return (
    <div>
      <h1 className="title">CMS</h1>
      Pagina Prodotti
      <hr className="my-8" />
      {state.pending && <div>Loading</div>}
      {state.error && <div>Error !!!</div>}

      <button className="btn primary" onClick={actions.getProducts}>
        GET products
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
