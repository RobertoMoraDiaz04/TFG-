import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
})
export class AddComponent {
  productForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.http.post('http://localhost:8000/api/products', this.productForm.value)
        .subscribe({
          next: () => this.router.navigate(['/landing']),
          error: () => this.error = 'Error al añadir el producto'
        });
    }
  }
}
