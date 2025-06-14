import { inject, Injectable, signal } from '@angular/core';

import { Product, ProductApiResponse } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

const URLBASE = 'http://localhost:3002'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http = inject(HttpClient);

  getProducts() {
    return this.http.get<ProductApiResponse>(`${URLBASE}/bp/products`).pipe(
      map((response: ProductApiResponse) => {
        // adapter
        return response.data.map(({ date_release,
          date_revision, ...product }) => {
          return { ...product, dateRelease: date_release, dateReview: date_revision };
        });
      }),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  getProduct(id: string) {
    return this.getProducts().pipe(
      tap(console.log),
      map((response: Product[]) => response.find(product => product.id === id)),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  createProduct(product: {}) {
    return this.http.post<ProductApiResponse>(`${URLBASE}/bp/products`, product).pipe(
      map((response: ProductApiResponse) => response.data),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  updateProduct(id: string, product: {}) {
    return this.http.put<ProductApiResponse>(`${URLBASE}/bp/products/${id}`, product).pipe(
      tap(console.log),
      map((response: ProductApiResponse) => response.data),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<ProductApiResponse>(`${URLBASE}/bp/products/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }


  productIdValidator(id: string): Observable<{ [key: string]: boolean } | null> {
    // return of(false).pipe(
    //   delay(2000),
    //   map((isTaken: boolean) => (isTaken ? { invalidId: true } : null))
    // );
    return this.http.get<ProductApiResponse>(`${URLBASE}/bp/products/verification/${id}`).pipe(
      tap(console.log),
      map((isTaken: boolean) => (isTaken ? { invalidId: true } : null)),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
