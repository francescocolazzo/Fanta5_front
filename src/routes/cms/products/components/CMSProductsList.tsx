import { Product } from '@/model/product';
import clsx from 'clsx';

interface CMSProductsListProps {
    items: Product[];
    activeItem: Partial<Product> | null;
    onEditItem: (product: Partial<Product>) => void;
    onDeleteItem: (id: string) => void;
}
export function CMSProductsList(props: CMSProductsListProps){
    const {items, activeItem, onEditItem, onDeleteItem} = props;
    return (
        <div className="mt-12">
        <table className="table-auto w-full hover">
          <thead>
          <tr>
            <th className="text-left">PRODUCTS</th>
            <th className="text-left">IMAGE</th>
            <th>COST</th>
            <th>DELETE</th>
          </tr>
          </thead>
   
          <tbody>
          {
            items.map(item => {
              return (
                <tr
                  key={item.id}
                  className={clsx(
                    'cursor-pointer',
                    { 'bg-sky-200 text-black pointer-events-none': item.id === activeItem?.id }
                  )}
                  onClick={() => {
                    onEditItem(item)
                  }}
                >
                  <td>{item.name}</td>
                  <td>
                    { item.tmb && <img src={item.tmb} alt={item.name} className="h-16 rounded-xl"/>}
                  </td>
                  <td className="text-center">€ {item.cost}</td>
                  <td className="text-center">
                    <i
                      className="fa fa-trash"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteItem(item.id)
                      }}
                    />
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
}