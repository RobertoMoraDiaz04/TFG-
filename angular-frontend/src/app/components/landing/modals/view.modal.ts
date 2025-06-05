import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view.modal.html',
})
export class ViewModalComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();


  editedDisponible: boolean = false;
  editedPrice: number = 0;
  editedTalla: string = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.product) {
      this.editedDisponible = this.product.disponible;
      this.editedPrice = this.product.price;
      this.editedTalla = this.product.talla;
    }
  }

  guardarCambios(): void {
    if (!this.product) return;

    const update = {
      disponible: this.editedDisponible,
      price: this.editedPrice,
      talla: this.editedTalla
    };

    const token = localStorage.getItem('jwt_token');
    if (!token) {
      console.error('Token no encontrado en localStorage');
      return;
    }

    this.http.patch(
      `http://localhost:8000/api/products/${this.product.id}`,
      update,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        this.product!.disponible = this.editedDisponible;
        this.product!.price = this.editedPrice;
        this.product!.talla = this.editedTalla;
        this.close.emit();
      },
      error: err => {
        console.error('Error al guardar los cambios:', err);
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
  eliminarProducto(): void {
  if (!this.product) return;

  const confirmado = confirm('¿Estás seguro de que deseas eliminar este producto?');
  if (!confirmado) return;

  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.error('Token no encontrado');
    return;
  }

  this.http.delete(
    `http://localhost:8000/api/products/${this.product.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ).subscribe({
    next: () => {
      this.deleted.emit(); 
      this.close.emit();   
    },
    error: err => {
      console.error('Error al eliminar el producto:', err);
    }
  });
}

  
}
