import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

/* LOAD PRODUCTS */
export const loadProducts = createAction('[Product Page] Load Products');
export const loadProductsSuccess = createAction('[Product API] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product API] Load Products Failure', props<{ error: string }>());

/* ADD PRODUCTS */
export const addProduct = createAction('[Product Page] Add Product', props<{ product: Omit<Product, 'id'> }>());
export const addProductSuccess = createAction('[Product API] Add Product Success', props<{ product: Product }>());
export const addProductFailure = createAction('[Product API] Add Product Failure', props<{ error: string }>());

/* UPDATE PRODUCTS */
export const updateProduct = createAction('[Product Page] Update Product', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product API] Update Product Success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Product API] Update Product Failure', props<{ error: string }>());

/* DELETE PRODUCTS */
export const deleteProduct = createAction('[Product Page] Delete Product', props<{ id: number }>());
export const deleteProductSuccess = createAction('[Product API] Delete Product Success', props<{ product: Product }>());
export const deleteProductFailure = createAction('[Product API] Delete Product Failure', props<{ error: string }>());

/* SELECT PRODUCT */
export const selectProduct = createAction('[Product Page] Select Product', props<{ id: number }>());

/* CLEAR SELECTED */
export const clearSelectedProduct = createAction('[Product Page] Clear Selected Product');
