import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      image: ['', Validators.required],
      talla: []
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        this.error = 'Debes iniciar sesión como administrador.';
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.post('http://localhost:8000/api/products', this.productForm.value, { headers })
        .subscribe({
          next: () => {
            this.error = null;
            this.router.navigate(['/landing']);
          },
          error: (err) => {
            if (err.status === 401) {
              this.error = 'No autorizado. Inicia sesión como administrador.';
            } else if (err.status === 403) {
              this.error = 'Acceso denegado. No tienes permisos suficientes.';
            } else {
              this.error = 'Error al añadir el producto';
            }
          }
        });
    }
  }
}
