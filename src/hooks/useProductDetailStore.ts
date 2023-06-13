import { container } from 'tsyringe';
import { useStore } from 'usestore-ts';
import ProductDetailStore from '../stores/ProductDetailStore';

export default function useFetchProducts() {
  const store = container.resolve(ProductDetailStore);
  return useStore(store);
}
