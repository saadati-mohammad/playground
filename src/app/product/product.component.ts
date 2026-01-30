import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs/internal/Observable';
import * as ProductSelectors from '../store/selectors/product.selectors';
import * as ProductActions from '../store/actions/product.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  standalone:true,
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  
  // Observables از Store
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  selectedProductId$: Observable<number | null>;
  selectedProduct$: Observable<Product | null | undefined>;

  constructor(private store: Store) {
    console.log('✅ ProductComponent ساخته شد');
    
    // اتصال به Store
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductSelectors.selectProductsError);
    this.selectedProductId$ = this.store.select(ProductSelectors.selectSelectedProductId);
    this.selectedProduct$ = this.store.select(ProductSelectors.selectSelectedProduct);
  }

  ngOnInit() {
    console.log('🎬 Component initialized - بارگذاری اولیه محصولات');
    this.loadProducts();
  }

  // بارگذاری محصولات
  loadProducts() {
    console.log('👆 کاربر کلیک کرد: loadProducts');
    this.store.dispatch(ProductActions.loadProducts());
  }

  // اضافه کردن محصول جدید
  addNewProduct() {
    console.log('👆 کاربر کلیک کرد: addNewProduct');
    const newProduct = {
      name: 'محصول جدید ' + Date.now(),
      price: Math.floor(Math.random() * 10000000) + 1000000,
      description: 'توضیحات محصول جدید',
      inStock: true
    };
    this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
  }

  // انتخاب محصول
  selectProduct(id: number) {
    console.log('👆 کاربر محصول را انتخاب کرد:', id);
    this.store.dispatch(ProductActions.selectProduct({ id }));
  }

  // پاک کردن انتخاب
  clearSelection() {
    console.log('👆 کاربر انتخاب را پاک کرد');
    this.store.dispatch(ProductActions.clearSelectedProduct());
  }

  // ویرایش محصول
  editProduct(product: Product) {
    console.log('👆 کاربر محصول را ویرایش کرد:', product);
    const updated: Product = {
      ...product,
      price: product.price + 1000000 // یک میلیون تومان اضافه میکنیم
    };
    this.store.dispatch(ProductActions.updateProduct({ product: updated }));
  }

  // حذف محصول
  removeProduct(id: number) {
    console.log('👆 کاربر محصول را حذف کرد:', id);
    if (confirm('آیا مطمئن هستید؟')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
    }
  }
}