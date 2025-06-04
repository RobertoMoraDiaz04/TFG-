import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
