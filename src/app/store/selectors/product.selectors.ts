import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../../models/product.model";

// گرفتن کل state محصولات
export const selectProductState = createFeatureSelector<ProductState>('products');

// گرفتن لیست محصولات
export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => {
    console.log('🔍 Selector: selectAllProducts فراخوانی شد');
    return state.products;
  }
);

// گرفتن وضعیت loading
export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

// گرفتن خطا
export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

// گرفتن ID محصول انتخاب شده
export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

// گرفتن محصول انتخاب شده
export const selectSelectedProduct = createSelector(
  selectAllProducts,
  selectSelectedProductId,
  (products, selectedId) => {
    console.log('🔍 Selector: selectSelectedProduct فراخوانی شد');
    return selectedId ? products.find((p: { id: any; }) => p.id === selectedId) : null;
  }
);

// گرفتن محصولات موجود
export const selectInStockProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((p: { inStock: any; }) => p.inStock)
);