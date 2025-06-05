// src/app/view-modal/view-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-view-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.modal.html',

})
export class ViewModalComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
