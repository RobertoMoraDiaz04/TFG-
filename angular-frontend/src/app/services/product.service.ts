import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  talla: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/products';

  private productAddedSource = new Subject<void>();
  productAdded$ = this.productAddedSource.asObservable();

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product).pipe(
      tap(() => this.productAddedSource.next())
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  searchProducts(term: string): Observable<Product[]> {
    const params = new HttpParams().set('search', term);
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
