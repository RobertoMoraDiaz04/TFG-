import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Product {
  name: string;
  price: number;
  image: string;
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
}
