import {createAction, props} from '@ngrx/store';
import {Product} from './product.state';

export const loadProducts = createAction('[Product] loadProducts');

export const loadProductsSuccess = createAction('[Product] load Products Success', props<{ products: Product[] }>());

export const loadProductsFailure = createAction('[Product] load Products Failure', props<{ error: string }>());
