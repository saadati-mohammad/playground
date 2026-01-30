import { Injectable } from '@angular/core';
import { of, delay, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  // فیک دیتا برای تست
  private mockProducts: Product[] = [
    { id: 1, name: 'لپتاپ', price: 25000000, description: 'لپتاپ گیمینگ', inStock: true },
    { id: 2, name: 'موبایل', price: 15000000, description: 'گوشی هوشمند', inStock: true },
    { id: 3, name: 'هدفون', price: 2000000, description: 'هدفون بلوتوثی', inStock: false }
  ];

  constructor() {
    console.log('✅ ProductService ساخته شد');
  }

  // گرفتن لیست محصولات
  getProducts(): Observable<Product[]> {
    console.log('📡 API Call: گرفتن لیست محصولات...');
    return of(this.mockProducts).pipe(delay(1000)); // یک ثانیه تاخیر برای شبیه‌سازی API
  }

  // اضافه کردن محصول
  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    console.log('📡 API Call: اضافه کردن محصول...', product);
    const newProduct: Product = {
      ...product,
      id: Math.max(...this.mockProducts.map(p => p.id)) + 1
    };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  // آپدیت محصول
  updateProduct(product: Product): Observable<Product> {
    console.log('📡 API Call: آپدیت محصول...', product);
    const index = this.mockProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.mockProducts[index] = product;
      return of(product).pipe(delay(500));
    }
    return throwError(() => new Error('محصول پیدا نشد'));
  }

  // حذف محصول
  deleteProduct(id: number): Observable<Product> {
    console.log('📡 API Call: حذف محصول با ID:', id);
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index > -1) {
      const deleted = this.mockProducts.splice(index, 1)[0];
      return of(deleted).pipe(delay(500));
    }
    return throwError(() => new Error('محصول پیدا نشد'));
  }
}
