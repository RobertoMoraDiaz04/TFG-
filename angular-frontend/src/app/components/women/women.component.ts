import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule ],
   templateUrl: './women.component.html',
})

export class WomenComponent {}