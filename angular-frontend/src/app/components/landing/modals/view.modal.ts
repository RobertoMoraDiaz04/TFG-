import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './view.modal.html',
})
export class ViewModalComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  guardarCambios(): void {
    console.log('Producto actualizado:', this.product);
    this.close.emit();
  }
}
