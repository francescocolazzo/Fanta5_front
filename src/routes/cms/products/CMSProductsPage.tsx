import { useProductsServices } from '@/services/products';
import { ServerError, Spinner } from '@/shared';
import { useEffect } from 'react';
import { CMSProductForm } from './components/CMSProductForm';
import { CMSProductsList } from './components/CMSProductsList';

export function CMSProductsPage() {
  const { state, actions } = useProductsServices();

  useEffect(() => {
    actions.getProducts()
  }, [])

  return (
    <div>
      <h1 className="title">CMS</h1>

      {state.pending && <Spinner />}
      {state.error && <ServerError message={state.error} />}

      <CMSProductForm
        activeItem={state.activateItem}
        onClose={actions.resetActiveItem}
        onAdd={actions.addProduct}
        onEdit={actions.editProduct}
      />

      <CMSProductsList
        items={state.products}
        activeItem={state.activateItem}
        onEditItem={actions.setActiveItem}
        onDeleteItem={actions.deleteProduct}
      />

      <button
        className="btn primary"
        onClick={() => actions.setActiveItem({})}
      >
        ADD NEW
      </button>

      {/* <pre>{JSON.stringify(state.activateItem, null, 2)}</pre> */}
    </div>
  )
}