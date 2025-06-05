import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { ViewModalComponent } from "./modals/view.modal";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ViewModalComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  products: Product[] = [];
  searchForm!: FormGroup;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      q: ['']
    });

    this.loadProducts();

    this.productService.productAdded$.subscribe(() => {
      this.loadProducts();
    });

    this.searchForm.get('q')?.valueChanges
      .pipe(
        debounceTime(300),          
        distinctUntilChanged()      
      )
      .subscribe((term: string) => {
        const trimmed = term.trim();
        if (trimmed) {
          this.productService.searchProducts(trimmed).subscribe({
            next: (results) => this.products = results,
            error: (err) => console.error(err)
          });
        } else {
          this.loadProducts(); 
        }
      });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    const term = this.searchForm.value.q.trim();
    if (term) {
      this.productService.searchProducts(term).subscribe({
        next: (results) => this.products = results,
        error: (err) => console.error(err)
      });
    } else {
      this.loadProducts();
    }
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }
  onProductDeleted(): void {
  this.loadProducts(); 
  }
  isLoading = false;

}
