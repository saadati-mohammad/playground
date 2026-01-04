import {createEntityAdapter, EntityState} from '@ngrx/entity';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: string | null;
}

export const productAdapter = createEntityAdapter<Product>();

export const initialProductState: ProductState = productAdapter.getInitialState({
  loading: false,
  error: null
})
