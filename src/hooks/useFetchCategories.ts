import { container } from 'tsyringe';
import { useEffect } from 'react';
import { useStore } from 'usestore-ts';
import CategoriesStore from '../stores/CategoriesStore';

export default function useFetchProducts() {
  const store = container.resolve(CategoriesStore);
  const [{ categories }] = useStore(store);

  useEffect(() => {
    store.fetchCategories();
  }, []);

  return {
    categories,
  };
}
