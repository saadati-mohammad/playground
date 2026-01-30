import { createReducer, on } from "@ngrx/store";
import { initialProductState } from "../../models/product.model";
import { clearSelectedProduct, loadProducts, loadProductsFailure, loadProductsSuccess, selectProduct } from "../actions/product.actions";
import * as ProductActions from '../actions/product.actions';

export const productReducer = createReducer(
initialProductState,

  // ========== LOAD PRODUCTS ==========
  on(ProductActions.loadProducts, (state) => {
    console.log('🔄 Reducer: loadProducts - شروع لود کردن محصولات');
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(ProductActions.loadProductsSuccess, (state, { products }) => {
    console.log('✅ Reducer: loadProductsSuccess - محصولات با موفقیت لود شدن:', products);
    return {
      ...state,
      products: products,
      loading: false,
      error: null
    };
  }),

  on(ProductActions.loadProductsFailure, (state, { error }) => {
    console.log('❌ Reducer: loadProductsFailure - خطا در لود محصولات:', error);
    return {
      ...state,
      loading: false,
      error: error
    };
  }),

  // ========== ADD PRODUCT ==========
  on(ProductActions.addProduct, (state) => {
    console.log('🔄 Reducer: addProduct - شروع اضافه کردن محصول');
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(ProductActions.addProductSuccess, (state, { product }) => {
    console.log('✅ Reducer: addProductSuccess - محصول اضافه شد:', product);
    return {
      ...state,
      products: [...state.products, product],
      loading: false,
      error: null
    };
  }),

  on(ProductActions.addProductFailure, (state, { error }) => {
    console.log('❌ Reducer: addProductFailure - خطا:', error);
    return {
      ...state,
      loading: false,
      error: error
    };
  }),

  // ========== UPDATE PRODUCT ==========
  on(ProductActions.updateProduct, (state) => {
    console.log('🔄 Reducer: updateProduct - شروع آپدیت محصول');
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(ProductActions.updateProductSuccess, (state, { product }) => {
    console.log('✅ Reducer: updateProductSuccess - محصول آپدیت شد:', product);
    return {
      ...state,
      products: state.products.map(p => p.id === product.id ? product : p),
      loading: false,
      error: null
    };
  }),

  on(ProductActions.updateProductFailure, (state, { error }) => {
    console.log('❌ Reducer: updateProductFailure - خطا:', error);
    return {
      ...state,
      loading: false,
      error: error
    };
  }),

  // ========== DELETE PRODUCT ==========
  on(ProductActions.deleteProduct, (state) => {
    console.log('🔄 Reducer: deleteProduct - شروع حذف محصول');
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(ProductActions.deleteProductSuccess, (state, { product }) => {
    console.log('✅ Reducer: deleteProductSuccess - محصول حذف شد:', product);
    return {
      ...state,
      products: state.products.filter(p => p.id !== product.id),
      loading: false,
      error: null
    };
  }),

  on(ProductActions.deleteProductFailure, (state, { error }) => {
    console.log('❌ Reducer: deleteProductFailure - خطا:', error);
    return {
      ...state,
      loading: false,
      error: error
    };
  }),

  // ========== SELECT/CLEAR PRODUCT ==========
  on(ProductActions.selectProduct, (state, { id }) => {
    console.log('🎯 Reducer: selectProduct - محصول انتخاب شد:', id);
    return {
      ...state,
      selectedProductId: id
    };
  }),

  on(ProductActions.clearSelectedProduct, (state) => {
    console.log('🧹 Reducer: clearSelectedProduct - انتخاب پاک شد');
    return {
      ...state,
      selectedProductId: null
    };
  })
);