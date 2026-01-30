import { inject, Injectable } from "@angular/core";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "../actions/product.actions";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { ProductService } from "../../service/product-service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from '../actions/product.actions';

@Injectable()
export class ProductEffects {
private actions$ = inject(Actions);
  private productService = inject(ProductService);

  constructor() {
    console.log('✅ ProductEffects ساخته شد');
  }

  // ========== LOAD PRODUCTS EFFECT ==========
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      tap(() => console.log('🚀 Effect: loadProducts شروع شد')),
      switchMap(() =>
        this.productService.getProducts().pipe(
          tap(products => console.log('📦 Effect: دیتا از API برگشت:', products)),
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => {
            console.error('💥 Effect: خطا در loadProducts:', error);
            return of(ProductActions.loadProductsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // ========== ADD PRODUCT EFFECT ==========
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      tap(action => console.log('🚀 Effect: addProduct شروع شد با:', action.product)),
      switchMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          tap(newProduct => console.log('📦 Effect: محصول جدید از API:', newProduct)),
          map(newProduct => ProductActions.addProductSuccess({ product: newProduct })),
          catchError(error => {
            console.error('💥 Effect: خطا در addProduct:', error);
            return of(ProductActions.addProductFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // ========== UPDATE PRODUCT EFFECT ==========
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      tap(action => console.log('🚀 Effect: updateProduct شروع شد با:', action.product)),
      switchMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          tap(updated => console.log('📦 Effect: محصول آپدیت شده:', updated)),
          map(updated => ProductActions.updateProductSuccess({ product: updated })),
          catchError(error => {
            console.error('💥 Effect: خطا در updateProduct:', error);
            return of(ProductActions.updateProductFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // ========== DELETE PRODUCT EFFECT ==========
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      tap(action => console.log('🚀 Effect: deleteProduct شروع شد با ID:', action.id)),
      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          tap(deleted => console.log('📦 Effect: محصول حذف شده:', deleted)),
          map(deleted => ProductActions.deleteProductSuccess({ product: deleted })),
          catchError(error => {
            console.error('💥 Effect: خطا در deleteProduct:', error);
            return of(ProductActions.deleteProductFailure({ error: error.message }));
          })
        )
      )
    )
  );
}